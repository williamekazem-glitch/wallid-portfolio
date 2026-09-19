import { loadTokens, walkLeaves, getToken } from "./resolve.mjs";

const tree = await loadTokens();
const errors = [];

for (const [path, leaf] of walkLeaves(tree)) {
  const value = leaf.$value;
  if (typeof value !== "string") continue;
  const refMatch = value.match(/^\{([^}]+)\}$/);
  if (!refMatch) continue;
  const target = getToken(tree, refMatch[1]);
  if (!target || !("$value" in target)) {
    errors.push(`${path} → {${refMatch[1]}} — target not found`);
  }
}

if (errors.length) {
  console.log("✗ Unresolved token references:");
  for (const e of errors) console.log("  " + e);
  process.exit(1);
} else {
  console.log("✓ All token references resolve");
}
