// Build script — emits app/theme.css from the DTCG tokens.
// Also emits a hex reference table (tokens/palette.reference.md) for designer handoff.

import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTokens, walkLeaves, resolveValue, getToken } from "./resolve.mjs";
import { parseOklch, oklchToRgb, rgbToHex } from "./oklch.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_CSS = join(__dirname, "..", "..", "app", "theme.css");
const OUT_REF = join(__dirname, "..", "..", "tokens", "palette.reference.md");

const tree = await loadTokens();

// ─── theme.css ────────────────────────────────────────────────────────────
const lines = [];
lines.push("/* AUTO-GENERATED from tokens/*.json — DO NOT EDIT DIRECTLY. */");
lines.push("/* Regenerate with: npm run tokens:build */");
lines.push("/* Consumed by Figma / designer handoff / documentation. */");
lines.push("/* Runtime CSS lives in app/globals.css (HSL for Tailwind alpha). */");
lines.push("");

lines.push(":root {");
lines.push("  /* Primitive scales — OKLCH ramps */");
for (const [path, leaf] of walkLeaves(tree.color ?? {})) {
  const varName = "--color-" + path.replace(/\./g, "-");
  lines.push(`  ${varName}: ${leaf.$value};`);
}
lines.push("}");
lines.push("");

lines.push(":root, :root[data-theme=\"light\"] {");
lines.push("  /* Semantic — light */");
emitSemantic("light");
lines.push("");
lines.push("  /* Scales */");
emitScales();
lines.push("}");
lines.push("");

lines.push(":root[data-theme=\"dark\"] {");
lines.push("  /* Semantic — dark (designed, not inverted) */");
emitSemantic("dark");
lines.push("}");
lines.push("");

lines.push("@media (prefers-color-scheme: dark) {");
lines.push("  :root:not([data-theme=\"light\"]) {");
emitSemantic("dark", "    ");
lines.push("  }");
lines.push("}");

function emitSemantic(mode, indent = "  ") {
  const semantic = tree.semantic?.[mode];
  if (!semantic) return;
  for (const [path, leaf] of walkLeaves(semantic)) {
    const varName = "--" + path.replace(/\./g, "-");
    const resolved = resolveValue(tree, leaf.$value);
    lines.push(`${indent}${varName}: ${resolved};`);
  }
}

function emitScales(indent = "  ") {
  for (const [key, leaf] of Object.entries(tree.font?.family ?? {})) {
    if (leaf?.$value) lines.push(`${indent}--font-${key}: ${leaf.$value};`);
  }
  for (const [key, leaf] of Object.entries(tree.font?.size ?? {})) {
    if (leaf?.$value) lines.push(`${indent}--text-${key}: ${leaf.$value};`);
  }
  for (const [key, leaf] of Object.entries(tree.font?.tracking ?? {})) {
    if (leaf?.$value) lines.push(`${indent}--tracking-${key}: ${leaf.$value};`);
  }
  for (const [key, leaf] of Object.entries(tree.font?.leading ?? {})) {
    if (leaf?.$value) lines.push(`${indent}--leading-${key}: ${leaf.$value};`);
  }
  for (const [key, leaf] of Object.entries(tree.space ?? {})) {
    if (leaf?.$value) lines.push(`${indent}--space-${key}: ${leaf.$value};`);
  }
  for (const [key, leaf] of Object.entries(tree.radius ?? {})) {
    if (leaf?.$value) lines.push(`${indent}--radius-${key}: ${leaf.$value};`);
  }
  for (const [key, leaf] of Object.entries(tree.shadow ?? {})) {
    if (leaf?.$value) lines.push(`${indent}--shadow-${key}: ${leaf.$value};`);
  }
  for (const [key, leaf] of Object.entries(tree.duration ?? {})) {
    if (leaf?.$value) lines.push(`${indent}--duration-${key}: ${leaf.$value};`);
  }
  for (const [key, leaf] of Object.entries(tree.easing ?? {})) {
    if (leaf?.$value) lines.push(`${indent}--ease-${key}: ${leaf.$value};`);
  }
}

await writeFile(OUT_CSS, lines.join("\n") + "\n");
console.log(`✓ Wrote ${OUT_CSS}`);

// ─── palette.reference.md — designer handoff ──────────────────────────────
const ref = [];
ref.push("# Palette — Reference for designer handoff\n");
ref.push("Auto-generated. Give this to any designer working on cards, flyers, LinkedIn banners, etc.\n");
ref.push("Colors are OKLCH-defined but converted to hex for tools that don't support OKLCH yet.\n");

for (const family of ["neutral", "amber", "sage", "danger"]) {
  ref.push(`\n## ${family.charAt(0).toUpperCase() + family.slice(1)}\n`);
  ref.push("| Token | OKLCH | Hex |");
  ref.push("|---|---|---|");
  for (const [path, leaf] of walkLeaves(tree.color?.[family] ?? {})) {
    const oklch = leaf.$value;
    let hex = "—";
    try {
      const [L, C, h] = parseOklch(oklch);
      hex = rgbToHex(oklchToRgb(L, C, h)).toUpperCase();
    } catch {}
    ref.push(`| \`color.${family}.${path}\` | \`${oklch}\` | \`${hex}\` |`);
  }
}

ref.push("\n## Semantic roles (light theme)\n");
ref.push("| Role | Points to | Hex |");
ref.push("|---|---|---|");
for (const [path, leaf] of walkLeaves(tree.semantic?.light ?? {})) {
  const ref_ = leaf.$value;
  const resolved = resolveValue(tree, ref_);
  let hex = "—";
  try {
    const [L, C, h] = parseOklch(resolved);
    hex = rgbToHex(oklchToRgb(L, C, h)).toUpperCase();
  } catch {}
  ref.push(`| \`${path}\` | \`${ref_}\` | \`${hex}\` |`);
}

ref.push("\n## Semantic roles (dark theme)\n");
ref.push("| Role | Points to | Hex |");
ref.push("|---|---|---|");
for (const [path, leaf] of walkLeaves(tree.semantic?.dark ?? {})) {
  const ref_ = leaf.$value;
  const resolved = resolveValue(tree, ref_);
  let hex = "—";
  try {
    const [L, C, h] = parseOklch(resolved);
    hex = rgbToHex(oklchToRgb(L, C, h)).toUpperCase();
  } catch {}
  ref.push(`| \`${path}\` | \`${ref_}\` | \`${hex}\` |`);
}

await writeFile(OUT_REF, ref.join("\n") + "\n");
console.log(`✓ Wrote ${OUT_REF}`);
