import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
await mkdir(publicDir, { recursive: true });

const svg = (size, mask = false) => {
  const pad = mask ? size * 0.12 : 0;
  const inner = size - pad * 2;
  const fontSize = inner * (mask ? 0.72 : 0.82);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F59E0B"/>
      <stop offset="1" stop-color="#D97706"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.75" cy="0.25" r="0.5">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <pattern id="stripes" x="0" y="0" width="${size * 0.05}" height="${size * 0.05}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="${size * 0.05}" stroke="#FFFFFF" stroke-width="${size * 0.003}" stroke-opacity="0.14"/>
    </pattern>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  <rect width="${size}" height="${size}" fill="url(#stripes)"/>
  <rect width="${size}" height="${size}" fill="url(#glow)"/>
  <text x="${size / 2}" y="${size / 2 + fontSize * 0.34}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-weight="400" font-size="${fontSize}" letter-spacing="-${fontSize * 0.05}" fill="#0B0B10" opacity="0.95">W</text>
</svg>`;
};

const tasks = [
  { name: "icon-192.png", size: 192, mask: false },
  { name: "icon-512.png", size: 512, mask: false },
  { name: "icon-maskable-512.png", size: 512, mask: true },
  { name: "apple-icon.png", size: 180, mask: false },
];

for (const t of tasks) {
  const out = join(publicDir, t.name);
  await sharp(Buffer.from(svg(t.size, t.mask))).png().toFile(out);
  console.log(`Wrote ${t.name} (${t.size}×${t.size}${t.mask ? " maskable" : ""})`);
}
console.log("Done.");
