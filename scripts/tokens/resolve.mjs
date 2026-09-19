import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_DIR = join(__dirname, "..", "..", "tokens");

// Load and merge all token files into a single tree
export async function loadTokens() {
  const files = [
    "color.primitives.json",
    "color.semantic.json",
    "typography.json",
    "spacing.json",
    "radius.json",
    "elevation.json",
    "motion.json",
    "borders.json",
    "breakpoints.json",
    "opacity.json",
    "blur.json",
    "sizing.json",
    "gradients.json",
    "states.json",
    "theming.json",
    "component.json",
  ];
  const tree = {};
  for (const f of files) {
    const data = JSON.parse(await readFile(join(TOKENS_DIR, f), "utf8"));
    deepMerge(tree, data);
  }
  return tree;
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (key.startsWith("$")) continue; // skip DTCG metadata
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      !("$value" in source[key])
    ) {
      target[key] ??= {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

// Get a token by dot path — returns the { $value, $type } leaf
export function getToken(tree, path) {
  const parts = path.split(".");
  let node = tree;
  for (const p of parts) {
    if (!node || typeof node !== "object") return undefined;
    node = node[p];
  }
  return node;
}

// Resolve a $value that may reference another token via {path.to.token}
export function resolveValue(tree, value, seen = new Set()) {
  if (typeof value !== "string") return value;
  const match = value.match(/^\{([^}]+)\}$/);
  if (!match) return value;
  const refPath = match[1];
  if (seen.has(refPath)) throw new Error(`Circular reference: ${refPath}`);
  seen.add(refPath);
  const target = getToken(tree, refPath);
  if (!target || !("$value" in target)) {
    throw new Error(`Unresolved token: ${refPath}`);
  }
  return resolveValue(tree, target.$value, seen);
}

// Walk the tree and yield [path, leaf]
export function* walkLeaves(tree, prefix = []) {
  for (const key of Object.keys(tree)) {
    if (key.startsWith("$")) continue;
    const node = tree[key];
    if (node && typeof node === "object" && "$value" in node) {
      yield [[...prefix, key].join("."), node];
    } else if (node && typeof node === "object") {
      yield* walkLeaves(node, [...prefix, key]);
    }
  }
}
