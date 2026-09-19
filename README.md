# Portfolio personnel — Kazem Williame Wallid

Portfolio Next.js + Tailwind pour se présenter et vendre ses services.

**Positionnement** : c'est un CV en ligne, pas un site d'entreprise. Un profil polyvalent avec cinq domaines d'action clairs — aviculture, gestion, services techniques, transport, digital.

## Direction visuelle

- Style **minimal élégant** inspiré d'Apple et Linear.
- Typographie : **Inter** (corps) + **Instrument Serif** (titres, italique éditorial).
- Palette : obsidienne chaude sur off-white, accent **ambre artisanal**.
- Mode **clair / sombre** avec bascule et respect de la préférence système.
- Tous les tokens de design (couleurs, radius, ombres, motion) dans `app/globals.css` — un seul endroit à modifier pour changer toute l'identité.

## Installation

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Pour la production :

```bash
npm run build
npm start
```

## Déploiement recommandé

**Vercel** (gratuit) :

1. Créer un compte sur [vercel.com](https://vercel.com).
2. Pousser ce dossier sur GitHub.
3. Importer le repo dans Vercel — le build est automatique.

## À personnaliser AVANT toute publication

Rien de fabriqué ne doit rester en ligne. Les sections vides se masquent automatiquement.

### 1. Coordonnées personnelles — `lib/site-config.ts`

```ts
{
  name: "Kazem Williame Wallid",
  firstName: "Kazem Williame",
  lastName: "Wallid",
  tagline: "Un profil polyvalent, des solutions concrètes.",
  email: "williame.kazem@gmail.com",
  phone: "+000 00 00 00 00",       // ← à remplir
  whatsapp: "0000000000",           // ← numéro international sans + ni espaces
  location: "Basé à — [ville, pays]",
  social: {
    linkedin: "#",                   // ← liens réels
    instagram: "#",
    facebook: "#",
  },
}
```

### 2. Contenu — `lib/data.ts`

Tous les tableaux sont **vides par défaut**, sauf les services. Vous ajoutez au fur et à mesure ; ce qui reste vide se masque automatiquement.

- **`services`** — les 11 services sont déjà rédigés. Ajustez descriptions et highlights à votre voix.
- **`projects`** — vide. Ajoutez uniquement vos **vrais** projets, avec chiffres et résultats.
- **`testimonials`** — vide. Ajoutez uniquement de **vrais** témoignages clients (avec accord).
- **`certifications`** — vide. Ajoutez uniquement vos **vraies** formations.
- **`skills`** — pourcentages à 0. Ajustez à votre niveau réel.
- **`experiences`** — vide. Renseignez vos vraies étapes.
- **`zones`** — vide. Renseignez vos vraies zones d'intervention.

### 3. CV téléchargeable — `public/cv.pdf`

Le bouton "Télécharger mon CV" du Hero pointe vers `/cv.pdf`.
Placez votre CV à `public/cv.pdf` — il devient téléchargeable automatiquement.

Tant que ce fichier n'existe pas, le bouton renvoie une 404 : soit vous ajoutez le PDF, soit vous retirez temporairement le troisième bouton dans `components/sections/Hero.tsx`.

### 4. Photos — `public/gallery/`

- Créer un dossier `public/gallery/`.
- Ajouter vos images (JPG/WebP, ~1200×1500 px pour l'aspect 4:5).
- Dans `components/sections/Gallery.tsx`, remplacer les placeholders par
  `<Image src="/gallery/photo-1.jpg" alt="..." fill className="object-cover" />`
  (importer `Image` depuis `next/image`).

## Structure

```
app/
├── layout.tsx           # Layout global, fonts, Nav, Footer
├── page.tsx             # Home : Hero → Services → About → Experience → Projets → Galerie → Zones → Témoignages → Contact
├── globals.css          # Tokens de design
├── devis/page.tsx       # Formulaire /devis
└── not-found.tsx        # 404

components/
├── layout/              # Nav, Footer, ThemeToggle, WhatsAppFab
├── sections/            # Hero, About, Services, Experience, Projects, etc.
└── ui/                  # Primitives réutilisables : Button, Card, Badge, Input, Select…

lib/
├── data.ts              # Contenu du site (services, projets, témoignages…)
├── site-config.ts       # Identité et coordonnées
└── utils.ts             # cn() pour Tailwind
```

## Comportement du site

- **Hero** : nom bien visible en typographie serif, tagline, 5 catégories cliquables, CTA vers services + WhatsApp.
- **Services** : catalogue groupé par domaine (Aviculture → Gestion → Services techniques → Transport → Digital). Chaque carte renvoie au formulaire de devis pré-rempli.
- **À propos** : storytelling personnel, 3 piliers de valeur.
- **Parcours** : compétences, expériences, certifications — les blocs vides affichent un état "à renseigner".
- **Réalisations** : liste numérotée style éditorial + état vide clair tant que rien n'est renseigné.
- **Galerie** : grille 4:5 avec placeholders visibles (à remplacer par vos vraies photos).
- **Zones** : masquée automatiquement tant que vide.
- **Témoignages** : masquée automatiquement tant que vide (jamais de faux témoignages).
- **Contact** : 3 canaux (WhatsApp, tél, email) + CTA vers le devis.
- **Formulaire devis** : prépare le message puis l'envoie sur WhatsApp ou par email — vous gardez le contrôle final.
- **Bouton flottant WhatsApp** en bas à droite sur toutes les pages.

## Qualité intégrée

- **Accessibilité** : focus visible, ARIA, skip link, contraste WCAG AA, `prefers-reduced-motion` respecté.
- **Mobile-first** : menu hamburger, targets tactiles ≥ 44px.
- **SEO** : metadata OpenGraph, lang FR, structure sémantique, pas de contenu inventé.
- **Perfs** : polices via `next/font` (pas de FOUT), animations légères.

## Contact

**Kazem Williame Wallid** — williame.kazem@gmail.com
