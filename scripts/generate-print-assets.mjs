import sharp from "sharp";
import QRCode from "qrcode";
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "print-assets");

const URL_SITE = "https://wallid-portfolio.vercel.app";
const NOM = "Kazem Williame Wallid";
const TAGLINE = "Un profil polyvalent, des solutions concrètes.";
const ROLE = "Entrepreneur multi-services";
const CITY = "Abidjan · Côte d'Ivoire";
const WA_DISPLAY = "+225 07 10 11 11 18";
const WA_URL = "wa.me/2250710111118";

const P = {
  ink900: "#0B0B10",
  ink800: "#12131A",
  ink750: "#15151C",
  ink700: "#1A1B24",
  deep: "#060608",
  amberLight: "#FCD34D",
  amber: "#FBBF24",
  amberPrimary: "#F59E0B",
  amberHover: "#D97706",
  amberDeep: "#B45309",
  waBrand: "#25D366",
  ivoire: "#FBF7F0",
  ivoireDeep: "#3A2F1A",
};

function xml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const POLES_RAW = [
  { index: "01", cat: "Aviculture", short: "Élevage, produits frais & formation" },
  { index: "02", cat: "Transport", short: "Chauffeur privé, courses & longues distances" },
  { index: "03", cat: "Services techniques", short: "Construction, artisanat, sécurité, packaging" },
  { index: "04", cat: "Digital", short: "Sites, applications & présence en ligne" },
  { index: "05", cat: "Gestion de stock", short: "Commerces, restos, entrepôts" },
  { index: "06", cat: "Sourcing Chine", short: "Import Chine clé en main" },
];

const POLES = POLES_RAW.map(p => ({ ...p, cat: xml(p.cat), short: xml(p.short), catRaw: p.cat }));

const F_DISPLAY = "'Space Grotesk','Segoe UI','Helvetica Neue',Arial,sans-serif";
const F_BODY = "'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif";
const F_SERIF = "'Instrument Serif','Playfair Display',Georgia,'Times New Roman',serif";

// Fond charbon + blob ambre + rayures diagonales (défs partagées)
function defsCharbon(id, blobX, blobY, blobR) {
  return `
    <defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${P.ink900}"/>
        <stop offset="0.5" stop-color="${P.ink800}"/>
        <stop offset="1" stop-color="${P.deep}"/>
      </linearGradient>
      <radialGradient id="glow-${id}" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="${P.amberPrimary}" stop-opacity="0.45"/>
        <stop offset="0.6" stop-color="${P.amberDeep}" stop-opacity="0.14"/>
        <stop offset="1" stop-color="${P.amberDeep}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="stripes-${id}" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="18" stroke="#FFFFFF" stroke-opacity="0.025" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg-${id})"/>
    <rect width="100%" height="100%" fill="url(#stripes-${id})"/>
    <circle cx="${blobX}" cy="${blobY}" r="${blobR}" fill="url(#glow-${id})"/>
  `;
}

// -- BANNIÈRE LINKEDIN 1584×396 -----------------------------------------
function bannerLinkedIn() {
  const W = 1584, H = 396;
  const polesLine = POLES.map(p => p.cat).join("  ·  ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${defsCharbon("bn", 1290, 200, 420)}
    <!-- W monogramme droite -->
    <text x="1260" y="330" font-family="${F_SERIF}" font-style="italic" font-weight="400"
          font-size="380" fill="${P.amberPrimary}" opacity="0.22"
          text-anchor="middle" letter-spacing="-8">W</text>
    <!-- Contenu gauche -->
    <g transform="translate(88 0)">
      <text x="0" y="130" font-family="${F_DISPLAY}" font-weight="700"
            font-size="62" fill="#FFFFFF" letter-spacing="-1.5">${NOM}</text>
      <rect x="0" y="150" width="72" height="4" fill="${P.amberPrimary}" rx="2"/>
      <text x="0" y="196" font-family="${F_DISPLAY}" font-weight="500"
            font-size="24" fill="${P.amber}" letter-spacing="0.3">${ROLE} · ${CITY}</text>
      <text x="0" y="248" font-family="${F_BODY}" font-weight="400"
            font-size="18" fill="#FFFFFF" fill-opacity="0.70" letter-spacing="0.5">${polesLine}</text>
      <text x="0" y="316" font-family="${F_DISPLAY}" font-weight="700"
            font-size="22" fill="${P.amber}" letter-spacing="0.5">${URL_SITE.replace("https://","")}</text>
      <text x="0" y="346" font-family="${F_BODY}" font-weight="400"
            font-size="16" fill="#FFFFFF" fill-opacity="0.55" letter-spacing="0.4">WhatsApp ${WA_DISPLAY}</text>
    </g>
    <!-- Bordure ambre subtile bas -->
    <rect x="0" y="${H-3}" width="${W}" height="3" fill="${P.amberPrimary}"/>
  </svg>`;
}

// -- FLYER A5 154×216mm (avec bleeds 3mm) @ 300 DPI = 1819×2551 -----------
async function flyerA5() {
  // 1 mm = 11.811 px @ 300 DPI
  const MM = 11.811;
  const W = Math.round(154 * MM); // 1819
  const H = Math.round(216 * MM); // 2551
  const BLEED = Math.round(3 * MM); // 35
  // Format fini interne = W-2*BLEED × H-2*BLEED = 1749×2481

  const heroH = 800;
  const fyStart = H - 780;
  const qrSize = 340;
  const qrX = W/2 - qrSize/2;
  const qrY = fyStart + 200;
  const qrFragment = await makeQRSvgFragment(URL_SITE, qrX, qrY, qrSize);

  // Grille des 6 pôles
  const gridStartY = 900;
  const cellW = (W - BLEED*2 - 120) / 2;
  const cellH = 220;
  const gap = 30;
  const poleCells = POLES.map((p, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = BLEED + 60 + col * (cellW + gap);
    const y = gridStartY + row * (cellH + gap);
    return `
      <g transform="translate(${x} ${y})">
        <rect width="${cellW}" height="${cellH}" rx="14" fill="${P.ivoire}" stroke="${P.amberPrimary}" stroke-opacity="0.35" stroke-width="1.5"/>
        <text x="34" y="72" font-family="${F_DISPLAY}" font-weight="700"
              font-size="44" fill="${P.amberPrimary}" letter-spacing="0.5">${p.index}</text>
        <line x1="34" y1="88" x2="88" y2="88" stroke="${P.amberPrimary}" stroke-width="3"/>
        <text x="34" y="128" font-family="${F_DISPLAY}" font-weight="700"
              font-size="34" fill="${P.ink900}" letter-spacing="-0.5">${p.cat}</text>
        <text x="34" y="172" font-family="${F_BODY}" font-weight="400"
              font-size="21" fill="${P.ink800}" fill-opacity="0.75">${p.short}</text>
      </g>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <!-- FOND IVOIRE global -->
    <rect width="${W}" height="${H}" fill="${P.ivoire}"/>

    <!-- HERO haut (charbon) -->
    <defs>
      <linearGradient id="fly-hero" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${P.ink900}"/>
        <stop offset="1" stop-color="${P.deep}"/>
      </linearGradient>
      <radialGradient id="fly-glow" cx="0.85" cy="0.35" r="0.6">
        <stop offset="0" stop-color="${P.amberPrimary}" stop-opacity="0.55"/>
        <stop offset="1" stop-color="${P.amberDeep}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="fly-stripes" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="24" stroke="#FFFFFF" stroke-opacity="0.035" stroke-width="1.2"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="${W}" height="${heroH}" fill="url(#fly-hero)"/>
    <rect x="0" y="0" width="${W}" height="${heroH}" fill="url(#fly-stripes)"/>
    <ellipse cx="${W*0.85}" cy="${heroH*0.35}" rx="700" ry="500" fill="url(#fly-glow)"/>
    <text x="${W/2}" y="440" font-family="${F_SERIF}" font-style="italic" font-weight="400"
          font-size="440" fill="${P.amberPrimary}" opacity="0.95"
          text-anchor="middle" letter-spacing="-14">W</text>
    <text x="${W/2}" y="570" font-family="${F_DISPLAY}" font-weight="700"
          font-size="64" fill="#FFFFFF" letter-spacing="-1.5" text-anchor="middle">${NOM}</text>
    <text x="${W/2}" y="640" font-family="${F_DISPLAY}" font-weight="500"
          font-size="34" fill="${P.amber}" letter-spacing="0.5" text-anchor="middle">${ROLE}</text>
    <text x="${W/2}" y="690" font-family="${F_BODY}" font-weight="400"
          font-size="26" fill="#FFFFFF" fill-opacity="0.65" letter-spacing="0.4" text-anchor="middle">${CITY}</text>
    <rect x="${W/2-60}" y="740" width="120" height="4" fill="${P.amberPrimary}" rx="2"/>

    <!-- TITRE Six domaines -->
    <text x="${W/2}" y="850" font-family="${F_DISPLAY}" font-weight="700"
          font-size="42" fill="${P.ink900}" letter-spacing="-0.5" text-anchor="middle">Six domaines, un seul interlocuteur</text>

    <!-- GRILLE 6 pôles -->
    ${poleCells}

    <!-- FOOTER charbon avec QR -->
    <rect x="0" y="${fyStart}" width="${W}" height="${H - fyStart}" fill="${P.ink900}"/>
    <rect x="0" y="${fyStart}" width="${W}" height="6" fill="${P.amberPrimary}"/>
    <text x="${W/2}" y="${fyStart + 90}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="38" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.5">Un seul contact pour tous vos projets</text>
    <text x="${W/2}" y="${fyStart + 140}" font-family="${F_BODY}" font-weight="400"
          font-size="24" fill="${P.amber}" fill-opacity="0.85" text-anchor="middle">Scannez le QR ou visitez le portfolio</text>

    <!-- QR blanc -->
    <rect x="${qrX - 20}" y="${qrY - 20}" width="${qrSize + 40}" height="${qrSize + 40}" rx="20" fill="#FFFFFF"/>
    ${qrFragment}

    <text x="${W/2}" y="${qrY + qrSize + 90}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="32" fill="${P.amber}" text-anchor="middle" letter-spacing="0.5">${URL_SITE.replace("https://","")}</text>
    <text x="${W/2}" y="${qrY + qrSize + 140}" font-family="${F_BODY}" font-weight="600"
          font-size="28" fill="${P.waBrand}" text-anchor="middle">WhatsApp ${WA_DISPLAY}</text>
  </svg>`;
}

// -- INSTA POST 1080×1080 : VITRINE 6 pôles -----------------------------
function postShowcase() {
  const W = 1080, H = 1080;
  const gridY = 400;
  const cellW = 460, cellH = 190, gap = 24;
  const cells = POLES.map((p, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 60 + col * (cellW + gap);
    const y = gridY + row * (cellH + gap);
    return `
      <g transform="translate(${x} ${y})">
        <rect width="${cellW}" height="${cellH}" rx="14" fill="#FFFFFF" fill-opacity="0.04" stroke="${P.amberPrimary}" stroke-opacity="0.35" stroke-width="1.5"/>
        <text x="26" y="60" font-family="${F_DISPLAY}" font-weight="700"
              font-size="34" fill="${P.amberPrimary}">${p.index}</text>
        <line x1="26" y1="76" x2="76" y2="76" stroke="${P.amberPrimary}" stroke-width="2.5"/>
        <text x="26" y="118" font-family="${F_DISPLAY}" font-weight="700"
              font-size="28" fill="#FFFFFF" letter-spacing="-0.3">${p.cat}</text>
        <text x="26" y="154" font-family="${F_BODY}" font-weight="400"
              font-size="17" fill="#FFFFFF" fill-opacity="0.65">${p.short}</text>
      </g>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${defsCharbon("psh", W-160, 200, 380)}
    <!-- Header -->
    <text x="60" y="140" font-family="${F_DISPLAY}" font-weight="700"
          font-size="46" fill="#FFFFFF" letter-spacing="-1">${NOM}</text>
    <rect x="60" y="158" width="72" height="4" fill="${P.amberPrimary}" rx="2"/>
    <text x="60" y="210" font-family="${F_DISPLAY}" font-weight="500"
          font-size="24" fill="${P.amber}">${ROLE} · ${CITY}</text>
    <text x="60" y="310" font-family="${F_DISPLAY}" font-weight="700"
          font-size="60" fill="#FFFFFF" letter-spacing="-1.5">Six domaines,</text>
    <text x="60" y="370" font-family="${F_DISPLAY}" font-weight="700"
          font-size="60" fill="${P.amber}" letter-spacing="-1.5">un seul contact.</text>
    ${cells}
    <!-- Footer -->
    <text x="${W/2}" y="${H-60}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="26" fill="${P.amber}" text-anchor="middle" letter-spacing="0.5">${URL_SITE.replace("https://","")}</text>
    <rect x="0" y="${H-4}" width="${W}" height="4" fill="${P.amberPrimary}"/>
  </svg>`;
}

// -- INSTA POST 1080×1080 : CITATION -------------------------------------
function postQuote() {
  const W = 1080, H = 1080;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="pq-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${P.amberPrimary}"/>
        <stop offset="0.6" stop-color="${P.amberHover}"/>
        <stop offset="1" stop-color="${P.ink900}"/>
      </linearGradient>
      <pattern id="pq-stripes" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="20" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#pq-bg)"/>
    <rect width="${W}" height="${H}" fill="url(#pq-stripes)"/>
    <!-- Grand W italic en watermark -->
    <text x="${W/2}" y="${H-40}" font-family="${F_SERIF}" font-style="italic"
          font-size="480" fill="${P.ink900}" fill-opacity="0.15"
          text-anchor="middle" letter-spacing="-16">W</text>
    <!-- Guillemet ouvrant -->
    <text x="100" y="290" font-family="${F_SERIF}" font-style="italic"
          font-size="180" fill="${P.ink900}" fill-opacity="0.85">"</text>
    <!-- Citation -->
    <text x="${W/2}" y="530" font-family="${F_SERIF}" font-style="italic"
          font-size="76" fill="${P.ink900}" text-anchor="middle" letter-spacing="-1">Un profil polyvalent,</text>
    <text x="${W/2}" y="620" font-family="${F_SERIF}" font-style="italic"
          font-size="76" fill="${P.ink900}" text-anchor="middle" letter-spacing="-1">des solutions concrètes.</text>
    <!-- Séparateur -->
    <rect x="${W/2-40}" y="700" width="80" height="4" fill="${P.ink900}" rx="2"/>
    <!-- Signature -->
    <text x="${W/2}" y="780" font-family="${F_DISPLAY}" font-weight="700"
          font-size="34" fill="${P.ink900}" text-anchor="middle" letter-spacing="-0.5">${NOM}</text>
    <text x="${W/2}" y="820" font-family="${F_DISPLAY}" font-weight="500"
          font-size="22" fill="${P.ink900}" fill-opacity="0.75" text-anchor="middle">${ROLE} · ${CITY}</text>
    <!-- Footer -->
    <text x="${W/2}" y="${H-60}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="24" fill="${P.ink900}" text-anchor="middle" letter-spacing="0.5">${URL_SITE.replace("https://","")}</text>
  </svg>`;
}

// -- INSTA POST 1080×1080 : FOCUS PÔLE -----------------------------------
function postFocus(pole) {
  const W = 1080, H = 1080;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${defsCharbon("pf-"+pole.index, W-160, 200, 400)}
    <!-- Numéro géant -->
    <text x="${W/2}" y="480" font-family="${F_DISPLAY}" font-weight="700"
          font-size="360" fill="${P.amberPrimary}" fill-opacity="0.16"
          text-anchor="middle" letter-spacing="-8">${pole.index}</text>
    <!-- Header ligne -->
    <text x="60" y="120" font-family="${F_DISPLAY}" font-weight="500"
          font-size="22" fill="${P.amber}" letter-spacing="2">PÔLE ${pole.index} / 06</text>
    <rect x="60" y="140" width="60" height="3" fill="${P.amberPrimary}"/>
    <!-- Titre -->
    <text x="60" y="580" font-family="${F_DISPLAY}" font-weight="700"
          font-size="90" fill="#FFFFFF" letter-spacing="-2.5">${pole.cat}</text>
    <!-- Description -->
    <text x="60" y="670" font-family="${F_BODY}" font-weight="400"
          font-size="34" fill="#FFFFFF" fill-opacity="0.75" letter-spacing="0.2">${pole.short}</text>
    <!-- Séparateur -->
    <rect x="60" y="740" width="80" height="4" fill="${P.amberPrimary}" rx="2"/>
    <!-- Bloc info bas -->
    <text x="60" y="820" font-family="${F_DISPLAY}" font-weight="700"
          font-size="30" fill="#FFFFFF" letter-spacing="-0.5">${NOM}</text>
    <text x="60" y="860" font-family="${F_DISPLAY}" font-weight="500"
          font-size="22" fill="${P.amber}">${ROLE} · ${CITY}</text>
    <text x="60" y="920" font-family="${F_BODY}" font-weight="600"
          font-size="22" fill="${P.waBrand}">WhatsApp ${WA_DISPLAY}</text>
    <!-- Footer URL -->
    <text x="${W/2}" y="${H-60}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="26" fill="${P.amber}" text-anchor="middle" letter-spacing="0.5">${URL_SITE.replace("https://","")}</text>
    <rect x="0" y="${H-4}" width="${W}" height="4" fill="${P.amberPrimary}"/>
  </svg>`;
}

// -- STORY 1080×1920 : VITRINE 6 pôles ----------------------------------
function storyShowcase() {
  const W = 1080, H = 1920;
  const listY = 780;
  const rowH = 150;
  const rows = POLES.map((p, i) => `
    <g transform="translate(80 ${listY + i * rowH})">
      <text x="0" y="60" font-family="${F_DISPLAY}" font-weight="700"
            font-size="52" fill="${P.amberPrimary}" letter-spacing="0.3">${p.index}</text>
      <line x1="90" y1="46" x2="140" y2="46" stroke="${P.amberPrimary}" stroke-width="3"/>
      <text x="170" y="42" font-family="${F_DISPLAY}" font-weight="700"
            font-size="42" fill="#FFFFFF" letter-spacing="-0.5">${p.cat}</text>
      <text x="170" y="82" font-family="${F_BODY}" font-weight="400"
            font-size="24" fill="#FFFFFF" fill-opacity="0.65">${p.short}</text>
    </g>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${defsCharbon("ssh", W-150, 380, 500)}
    <!-- W watermark -->
    <text x="${W-50}" y="450" font-family="${F_SERIF}" font-style="italic"
          font-size="500" fill="${P.amberPrimary}" fill-opacity="0.15"
          text-anchor="end" letter-spacing="-14">W</text>
    <!-- Header -->
    <text x="80" y="220" font-family="${F_DISPLAY}" font-weight="500"
          font-size="26" fill="${P.amber}" letter-spacing="2.5">${CITY.toUpperCase()}</text>
    <rect x="80" y="240" width="60" height="4" fill="${P.amberPrimary}"/>
    <text x="80" y="360" font-family="${F_DISPLAY}" font-weight="700"
          font-size="88" fill="#FFFFFF" letter-spacing="-2">${NOM}</text>
    <text x="80" y="440" font-family="${F_DISPLAY}" font-weight="500"
          font-size="38" fill="${P.amber}">${ROLE}</text>
    <text x="80" y="600" font-family="${F_DISPLAY}" font-weight="700"
          font-size="72" fill="#FFFFFF" letter-spacing="-1.5">Six domaines,</text>
    <text x="80" y="680" font-family="${F_DISPLAY}" font-weight="700"
          font-size="72" fill="${P.amber}" letter-spacing="-1.5">un seul contact.</text>
    ${rows}
    <!-- CTA bas -->
    <text x="${W/2}" y="${H-180}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="42" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.5">Un seul WhatsApp</text>
    <text x="${W/2}" y="${H-120}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="34" fill="${P.waBrand}" text-anchor="middle">${WA_DISPLAY}</text>
    <text x="${W/2}" y="${H-60}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="30" fill="${P.amber}" text-anchor="middle" letter-spacing="0.5">${URL_SITE.replace("https://","")}</text>
    <rect x="0" y="${H-6}" width="${W}" height="6" fill="${P.amberPrimary}"/>
  </svg>`;
}

// -- STORY 1080×1920 : CITATION -----------------------------------------
function storyQuote() {
  const W = 1080, H = 1920;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="sq-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${P.ink900}"/>
        <stop offset="0.5" stop-color="${P.ink800}"/>
        <stop offset="1" stop-color="${P.amberDeep}"/>
      </linearGradient>
      <radialGradient id="sq-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="${P.amberPrimary}" stop-opacity="0.35"/>
        <stop offset="1" stop-color="${P.amberDeep}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#sq-bg)"/>
    <ellipse cx="${W/2}" cy="${H/2}" rx="600" ry="500" fill="url(#sq-glow)"/>
    <!-- W italic watermark -->
    <text x="${W/2}" y="${H/2+180}" font-family="${F_SERIF}" font-style="italic"
          font-size="700" fill="${P.amberPrimary}" fill-opacity="0.12"
          text-anchor="middle" letter-spacing="-20">W</text>
    <!-- Guillemet ouvrant -->
    <text x="${W/2}" y="700" font-family="${F_SERIF}" font-style="italic"
          font-size="240" fill="${P.amber}" fill-opacity="0.75"
          text-anchor="middle">"</text>
    <!-- Citation -->
    <text x="${W/2}" y="900" font-family="${F_SERIF}" font-style="italic"
          font-size="82" fill="#FFFFFF" text-anchor="middle" letter-spacing="-1">Un profil polyvalent,</text>
    <text x="${W/2}" y="1000" font-family="${F_SERIF}" font-style="italic"
          font-size="82" fill="${P.amber}" text-anchor="middle" letter-spacing="-1">des solutions concrètes.</text>
    <!-- Séparateur -->
    <rect x="${W/2-50}" y="1080" width="100" height="4" fill="${P.amberPrimary}" rx="2"/>
    <!-- Signature -->
    <text x="${W/2}" y="1180" font-family="${F_DISPLAY}" font-weight="700"
          font-size="40" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.5">${NOM}</text>
    <text x="${W/2}" y="1230" font-family="${F_DISPLAY}" font-weight="500"
          font-size="26" fill="${P.amber}" text-anchor="middle">${ROLE} · ${CITY}</text>
    <!-- Bas -->
    <text x="${W/2}" y="${H-140}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="30" fill="${P.amber}" text-anchor="middle" letter-spacing="0.5">${URL_SITE.replace("https://","")}</text>
    <text x="${W/2}" y="${H-80}" font-family="${F_DISPLAY}" font-weight="600"
          font-size="26" fill="${P.waBrand}" text-anchor="middle">WhatsApp ${WA_DISPLAY}</text>
    <rect x="0" y="${H-6}" width="${W}" height="6" fill="${P.amberPrimary}"/>
  </svg>`;
}

// -- STORY 1080×1920 : FOCUS PÔLE ---------------------------------------
function storyFocus(pole) {
  const W = 1080, H = 1920;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    ${defsCharbon("sf-"+pole.index, W-100, 400, 500)}
    <!-- Numéro géant transparent -->
    <text x="${W/2}" y="1080" font-family="${F_DISPLAY}" font-weight="700"
          font-size="620" fill="${P.amberPrimary}" fill-opacity="0.14"
          text-anchor="middle" letter-spacing="-16">${pole.index}</text>
    <!-- Header -->
    <text x="80" y="220" font-family="${F_DISPLAY}" font-weight="500"
          font-size="28" fill="${P.amber}" letter-spacing="2.5">PÔLE ${pole.index} / 06</text>
    <rect x="80" y="240" width="70" height="4" fill="${P.amberPrimary}"/>
    <!-- Titre -->
    <text x="80" y="900" font-family="${F_DISPLAY}" font-weight="700"
          font-size="120" fill="#FFFFFF" letter-spacing="-3">${pole.cat}</text>
    <!-- Description -->
    <text x="80" y="1000" font-family="${F_BODY}" font-weight="400"
          font-size="38" fill="#FFFFFF" fill-opacity="0.75" letter-spacing="0.2">${pole.short}</text>
    <!-- Séparateur -->
    <rect x="80" y="1080" width="90" height="4" fill="${P.amberPrimary}" rx="2"/>
    <!-- Info bloc -->
    <text x="80" y="1200" font-family="${F_DISPLAY}" font-weight="700"
          font-size="42" fill="#FFFFFF" letter-spacing="-0.5">${NOM}</text>
    <text x="80" y="1250" font-family="${F_DISPLAY}" font-weight="500"
          font-size="26" fill="${P.amber}">${ROLE} · ${CITY}</text>
    <text x="80" y="1320" font-family="${F_BODY}" font-weight="600"
          font-size="26" fill="${P.waBrand}">WhatsApp ${WA_DISPLAY}</text>
    <!-- CTA bas -->
    <text x="${W/2}" y="${H-140}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="38" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.5">Un seul contact pour tout</text>
    <text x="${W/2}" y="${H-80}" font-family="${F_DISPLAY}" font-weight="700"
          font-size="30" fill="${P.amber}" text-anchor="middle" letter-spacing="0.5">${URL_SITE.replace("https://","")}</text>
    <rect x="0" y="${H-6}" width="${W}" height="6" fill="${P.amberPrimary}"/>
  </svg>`;
}

// -- QR code SVG fragment -----------------------------------------------
async function makeQRSvgFragment(text, x, y, size) {
  const svgFull = await QRCode.toString(text, {
    type: "svg",
    margin: 0,
    color: { dark: "#000000", light: "#FFFFFF00" },
    errorCorrectionLevel: "H",
  });
  const vbMatch = svgFull.match(/viewBox="([^"]+)"/);
  if (!vbMatch) return "";
  const [, , w] = vbMatch[1].split(/\s+/).map(Number);
  const inner = svgFull.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>[\s\S]*$/, "");
  const scale = size / w;
  return `<g transform="translate(${x} ${y}) scale(${scale})">${inner}</g>`;
}

// -- Main --------------------------------------------------------------
async function renderOne(name, svg, targetWidth) {
  const svgPath = resolve(OUT, name + ".svg");
  const pngPath = resolve(OUT, name + ".png");
  await writeFile(svgPath, svg, "utf8");
  const buf = Buffer.from(svg);
  // Density : plus élevé = meilleur rendu texte, puis resize à la taille cible
  await sharp(buf, { density: 300 })
    .resize({ width: targetWidth })
    .png({ compressionLevel: 8 })
    .toFile(pngPath);
  const stat = await sharp(pngPath).metadata();
  console.log(`  ✓ ${name}.png ${stat.width}×${stat.height}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log(`→ Output: ${OUT}\n`);

  console.log("• Bannière LinkedIn 1584×396");
  await renderOne("01-linkedin-banner-1584x396", bannerLinkedIn(), 1584);

  console.log("• Flyer A5 148×210mm @ 300 DPI (avec bleeds 3mm)");
  await renderOne("02-flyer-a5", await flyerA5(), 1819); // 154mm × 300/25.4 mais on garde la taille exacte du SVG

  console.log("• Insta post 1080×1080 — vitrine 6 pôles");
  await renderOne("03-insta-post-vitrine", postShowcase(), 1080);

  console.log("• Insta post 1080×1080 — citation");
  await renderOne("04-insta-post-citation", postQuote(), 1080);

  console.log("• Story/TikTok 1080×1920 — vitrine 6 pôles");
  await renderOne("05-story-tiktok-vitrine", storyShowcase(), 1080);

  console.log("• Story/TikTok 1080×1920 — citation");
  await renderOne("06-story-tiktok-citation", storyQuote(), 1080);

  console.log("• Insta posts 1080×1080 — focus par pôle (×6)");
  for (const p of POLES) {
    await renderOne(`07-insta-post-focus-${p.index}-${slugify(p.catRaw)}`, postFocus(p), 1080);
  }

  console.log("• Stories/TikTok 1080×1920 — focus par pôle (×6)");
  for (const p of POLES) {
    await renderOne(`08-story-tiktok-focus-${p.index}-${slugify(p.catRaw)}`, storyFocus(p), 1080);
  }

  console.log("\n✓ Tous les assets générés dans print-assets/");
}

function slugify(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

main().catch(err => { console.error(err); process.exit(1); });
