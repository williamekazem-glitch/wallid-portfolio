// Minimal OKLCH → sRGB conversion (no deps).
// Based on: https://bottosson.github.io/posts/oklab/

function oklabToLinearRgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function linearToSrgb(v) {
  const abs = Math.abs(v);
  const sign = v < 0 ? -1 : 1;
  if (abs <= 0.0031308) return 12.92 * v;
  return sign * (1.055 * abs ** (1 / 2.4) - 0.055);
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

export function oklchToRgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const [lr, lg, lb] = oklabToLinearRgb(L, a, b);
  return [linearToSrgb(lr), linearToSrgb(lg), linearToSrgb(lb)].map(clamp01);
}

export function rgbToHex([r, g, b]) {
  const to255 = (v) => Math.round(v * 255).toString(16).padStart(2, "0");
  return "#" + to255(r) + to255(g) + to255(b);
}

// Parse "oklch(L C H)" — accepts spaces or commas
export function parseOklch(str) {
  const m = str.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i);
  if (!m) throw new Error(`Invalid oklch string: ${str}`);
  return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
}

export function oklchStringToHex(str) {
  const [L, C, h] = parseOklch(str);
  return rgbToHex(oklchToRgb(L, C, h));
}

// WCAG relative luminance from sRGB [0-1] channels
export function relativeLuminance([r, g, b]) {
  const toLin = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const [R, G, B] = [r, g, b].map(toLin);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function contrastRatio(rgb1, rgb2) {
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const [hi, lo] = [Math.max(l1, l2), Math.min(l1, l2)];
  return (hi + 0.05) / (lo + 0.05);
}
