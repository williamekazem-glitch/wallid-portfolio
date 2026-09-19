import { loadTokens, resolveValue, getToken } from "./resolve.mjs";
import { parseOklch, oklchToRgb, contrastRatio, rgbToHex } from "./oklch.mjs";

const tree = await loadTokens();

// Resolve a semantic role to its final OKLCH string and RGB
function resolveColor(mode, path) {
  const leaf = getToken(tree.semantic[mode], path);
  if (!leaf) return null;
  const oklch = resolveValue(tree, leaf.$value);
  const [L, C, h] = parseOklch(oklch);
  const rgb = oklchToRgb(L, C, h);
  return { oklch, rgb, hex: rgbToHex(rgb) };
}

// Required pairs — [fg role, bg role, min ratio, label]
// WCAG 2.2 AA: 4.5:1 body text, 3:1 large text / UI components essential for state.
// Decorative borders (border.default, border.strong) NOT included — they don't carry state.
// Focus-ring MUST meet 3:1 (WCAG 2.4.7 + 1.4.11).
const REQUIRED = [
  ["text.primary",    "surface.page",   4.5, "Body text on page"],
  ["text.secondary",  "surface.page",   4.5, "Secondary text on page"],
  ["text.subtle",     "surface.page",   4.5, "Labels/eyebrow on page"],
  ["text.primary",    "surface.elev",   4.5, "Body text on elevated"],
  ["text.secondary",  "surface.elev",   4.5, "Secondary on elevated"],
  ["accent.default",  "surface.page",   4.5, "Accent as body text"],
  ["accent.fg",       "accent.default", 4.5, "Text on accent button"],
  ["action.primary-fg","action.primary",4.5, "Text on primary button"],
  ["feedback.success","surface.page",   3.0, "Success indicator (UI)"],
  ["feedback.danger", "surface.page",   4.5, "Danger text"],
  ["focus-ring",      "surface.page",   3.0, "Focus ring visibility"],
];

let allPass = true;
const results = [];

for (const mode of ["light", "dark"]) {
  console.log(`\n═══ ${mode.toUpperCase()} theme ═══`);
  console.log("Role pair                                    Ratio    Min    ✓/✗");
  console.log("─".repeat(78));
  for (const [fgPath, bgPath, min, label] of REQUIRED) {
    const fg = resolveColor(mode, fgPath);
    const bg = resolveColor(mode, bgPath);
    if (!fg || !bg) {
      console.log(`  ⚠ MISSING: ${fgPath} on ${bgPath}`);
      allPass = false;
      continue;
    }
    const ratio = contrastRatio(fg.rgb, bg.rgb);
    const pass = ratio >= min;
    if (!pass) allPass = false;
    const label2 = `${fgPath} on ${bgPath}`.padEnd(44);
    console.log(
      `${label2} ${ratio.toFixed(2).padStart(6)}   ${min.toFixed(1).padStart(4)}    ${pass ? "✓" : "✗"}`
    );
    results.push({ mode, fgPath, bgPath, ratio: +ratio.toFixed(2), min, pass, fg: fg.hex, bg: bg.hex });
  }
}

console.log("\n" + (allPass ? "✓ All contrast checks pass WCAG AA" : "✗ Some contrast checks FAIL"));
if (!allPass) {
  console.log("\nFAILURES:");
  for (const r of results.filter((r) => !r.pass)) {
    console.log(`  [${r.mode}] ${r.fgPath}(${r.fg}) on ${r.bgPath}(${r.bg}) = ${r.ratio} (needs ${r.min})`);
  }
  process.exit(1);
}
