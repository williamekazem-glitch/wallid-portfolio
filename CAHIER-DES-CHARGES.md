# Cahier des charges — Portfolio Kazem Williame Wallid

**Version** : v2.0 — 2026-09-19
**Auteur** : Kazem Williame Wallid
**Objectif** : Portfolio personnel en ligne pour se présenter et vendre ses services multi-domaines à Abidjan.
**Statut** : Prototype HTML V19 validé (Charbon obsidien + Ambre + Linear-inspired). Portage Next.js à venir.

---

## 1. Qui je suis

- **Nom complet** : Kazem Williame Wallid
- **Identité affichée** : « Entrepreneur multi-services · Abidjan »
- **Localisation** : Abidjan, Côte d'Ivoire
- **Positionnement** : Entrepreneur personnel multi-services (pas société anonyme)
- **Tagline** : « Un profil polyvalent, des solutions concrètes. »

## 2. Coordonnées

| Canal | Valeur |
|---|---|
| Email | williame.kazem@gmail.com |
| Téléphone | **+225 07 10 11 11 18** |
| WhatsApp | Même numéro (format international : `2250710111118`) |
| LinkedIn | https://www.linkedin.com/in/williame-wallid-kazem-02a724122/ |
| Facebook | https://www.facebook.com/williamewallid.kazem.1 |
| TikTok | https://www.tiktok.com/@wallidkazem |

## 3. Mes cinq domaines (ordre imposé)

L'ordre est calibré pour un visiteur qui découvre depuis un QR code de carte de visite : services vendables directement d'abord, spécialité pro à la fin.

### 01 — Aviculture
- Poulets frais & poussins
- Œufs frais
- Poulets vivants pour élevage
- Poussins pour élevage : 1 jour / 1 semaine / 2 semaines / 1 mois (chauffés + vaccinés)
- Formation en aviculture
- Conseil pour installation
- **Marque en tête** : « Poulet d'CI »
- **CTA** : Demander un devis

### 02 — Transport
- Chauffeur privé
- Courses courtes & longues distances
- Déplacements professionnels
- Livraisons
- **Trajets réguliers** : Assinie · Grand-Bassam · Yamoussoukro · Bouaké
- **CTA** : Réserver un trajet

### 03 — Services techniques
- Construction & rénovation
- Menuiserie, ferronnerie, plomberie
- Vidéosurveillance, alarmes & appareils connectés (domotique)
- Décoration intérieure
- Confection sacs & packaging sur mesure
- **CTA** : Demander un devis

### 04 — Digital
- Sites internet sur mesure
- Applications No-Code (Bubble, Glide, Softr)
- Marketing & réseaux sociaux
- Conseil digital
- **CTA** : Parler d'un projet

### 05 — Gestion de stock (spécialité professionnelle)
- Gestion de stock (commerces, restaurants, entrepôts — partout où il y a de la marchandise)
- Inventaires physiques & contrôle
- Suivi des entrées et sorties de marchandise
- Organisation d'espace de stockage
- Mise en place de procédures de suivi
- **CTA** : Me contacter

> **Note importante** : la gestion de stock est ma **spécialité pro** — plus qu'un simple service. Elle vient en dernier volontairement (elle rassure sur la crédibilité mais ne se vend pas comme un poulet).

## 4. Règles éditoriales non négociables

- **Aucune fausse statistique** (pas de "10 ans, 120 projets, 90 clients" inventés)
- **Aucun faux témoignage** (la section Avis est vide, avec CTA WhatsApp pour laisser un avis)
- **Aucun faux projet** — pas de section Réalisations avec des placeholders
- **Sections vides doivent se masquer automatiquement** (pas de "coming soon" visible)
- **Contenu français uniquement** pour l'instant (bilingue possible plus tard)
- **WhatsApp est le canal principal de conversion** — omniprésent, avec messages pré-remplis par service

## 5. Structure du site (single page + /devis)

### Page d'accueil — 14 sections dans l'ordre exact

1. **Intro loader** — overlay Bruno Simon style, compteur 00→100%, W monogramme, nom complet (1.6s puis fade)
2. **Nav sticky** grid 5-col : brand · liens · badge "En ligne · répond en 15 min" · toggle light/dark · CTA "Demander un devis"
3. **Hero** : badge "Disponible" · **eyebrow ambre "Entrepreneur multi-services · Abidjan"** · h1 avec text-scramble + "polyvalent" en Instrument Serif italique dégradé · lede · 2 CTAs (WhatsApp direct + Voir services) · photo à droite avec cursor lens + 3D tilt + overlay ambre
4. **Marquee Trajets** (fond nuit, texte ambre, sens →) : Assinie · Grand-Bassam · Yamoussoukro · Bouaké
5. **Marquee Skills** (fond nuit gradient, sens ← inverse) : 12 compétences défilantes
6. **Services** : 5 cards click-to-expand (grid 5-col wide, 3-col medium, 2-col tablet, 1-col mobile). Chaque card = illustration SVG + icône ambre + titre + description + toggle "+" morph → hover puis × à l'ouverture + conic gradient border animé. Détails révélés = liste + CTA WhatsApp pré-rempli listant tous les sous-titres du service
7. **About** (section claire ivoire) : text à gauche (mention explicite spécialité gestion de stock élargie commerces/restos/entrepôts) + carte de visite portrait avec flip auto recto/verso toutes les 4s
8. **Pourquoi moi** : 4 arguments (Un seul contact · Multi-services · Ancré à Abidjan · Devis rapide)
9. **Comment je travaille** : 3 étapes numérotées 01/02/03 avec timeline connectrice pointillée ambre. Vous m'écrivez (Réponse 4h) → Devis clair (24h) → Livraison (Engagement tenu)
10. **FAQ dépliable** (`<details>` HTML natif) : 6 questions honnêtes (coût devis, zones livraison, premier contact, confiance multi-domaines, paiement, projets à montrer)
11. **Avis clients** (section claire ivoire) : 5 étoiles ambre + CTA WhatsApp "Laisser un avis" pré-rempli + hint "Les premiers témoignages arrivent bientôt". Zéro faux témoignage.
12. **Contact** (section claire ivoire) : gros bloc gradient WhatsApp vert dominant + 2 liens inline (téléphone / email avec copie clic desktop)
13. **CTA final** (section nuit) : "Un besoin ? Parlons-en aujourd'hui" + WhatsApp + Appeler
14. **Footer** : brand + rôle ambre "Entrepreneur multi-services · Abidjan, Côte d'Ivoire" + tagline serif italique + 3 icônes réseaux + copyright

### Éléments flottants / globaux
- **Scroll progress bar** ambre en haut
- **Sticky mini-brand** "● Wallid Kazem ↑" bas-gauche quand hors du hero
- **WhatsApp FAB** vert pulsant bas-droite
- **Sticky bottom bar mobile** (≤720px) : WhatsApp · Appeler · Copier email (avec toast "Email copié ✓")
- **Curseur ambre custom desktop** (halo + dot + label contextuel SCAN/ÉCRIRE/VOIR/LIRE/REGARD/APPELER)
- **Grain texture** SVG fractal noise en overlay fixé (opacity 2.8%)

### Page /devis (v2)
Formulaire structuré, sans backend, envoie vers WhatsApp OU email au choix :
- Service concerné (préremplissable via URL)
- Nom, téléphone/WhatsApp, email
- Budget approximatif (optionnel)
- Description du projet

## 6. Direction visuelle — VALIDÉE

### Palette : Charbon obsidien × Soleil ambre × WhatsApp vert

**Charbon obsidien** (fond principal, feel premium sans clichés) :
- `--ink-950: #060608` (deepest — CTA final, ombres)
- `--ink-900: #0B0B10` (page hero — signature)
- `--ink-800: #15151C` (cards raised)
- `--ink-700: #22222E` (borders / hover)
- Micro-teinte indigo à peine perceptible pour éviter le "flat black"

**Soleil ambre** (accent unique, non éparpillé) :
- `--sun-300: #FCD34D` (light)
- `--sun-400: #FBBF24` (default)
- `--sun-500: #F59E0B` (primary CTA)
- `--sun-600: #D97706` (hover deep)
- `--sun-700: #B45309` (deepest)

**WhatsApp** : `#25D366` (canal principal, jamais mélangé avec l'ambre)
**Ivoire chaud** (sections claires About/Reviews/Contact) : `#FBF7F0` / `#F5EDE0` / `#E8DEC9`
**Deep brown** (texte sur ivoire) : `#1A1408` / `#3A2F1A`

### Tokens semantic (Library Contract Linear-inspired)

| Token | Valeur | Contraste sur ink-900 |
|---|---|---|
| `--text-primary` | `#F7F8F8` | 18:1 ✓ AAA |
| `--text-secondary` | `#D1D5DB` | 13:1 ✓ AAA |
| `--text-muted` | `#8A8F98` | 4.9:1 ✓ AA |
| `--text-faint` | `#6B7079` | AA large text |
| `--ink-border` | `rgba(255,255,255,0.06)` | subtle |
| `--ink-border-strong` | `rgba(255,255,255,0.10)` | cards, nav |
| `--focus-ring` | `2px sun-400 + 8px halo 28%` | Linear double-ring |
| `--status-online` | `#25D366` | pastille "En ligne" |

### Elevation (ombres Linear-style, sec + précis)

| Token | Usage |
|---|---|
| `--elevation-card` | inset highlight 1px 4% + soft outer shadow — cards services/process/faq |
| `--elevation-btn` | inset highlight 1px 14% + shadow resserré — buttons primary/wa/ghost |

### Radius (split volontaire)

| Token | Valeur | Usage |
|---|---|---|
| `--radius-md` | `18px` | utilité — cards services, process, faq, why |
| `--radius-lg` | `22px` | invitation — hero-photo, reviews-panel, contact-hero |

### Typographie

- **Display** : Space Grotesk 500/700 (titres, brand, CTAs) — OpenType stylistic sets ss01/ss02, tabular-nums, small-caps sur eyebrows
- **Body** : Inter 400/500/600 (lede, paragraphes, listes) — ligatures, kern, calt
- **Serif italique** : Instrument Serif italic — accent unique sur "polyvalent" hero + guillemets citations
- **Système** : `system-ui, sans-serif` en fallback

### Motion (Linear choreography)

- **Duration** : 150ms micro · 240ms component · 380ms page
- **Easing** : `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo Linear)
- **Hover** : `translateY(-1px à -2px)` + border brighten en 120ms (pas de scale, jamais)
- **Focus** : ring 2px accent + halo 8px 28% en 100ms
- **Marquees** : 28s trajets + 34s skills (linear infinite, jamais > 100s)
- **Cursor lens & magnetic** : delay 0ms — la latence tue le premium

### 25+ signatures 2026 implémentées

Text scramble h1, magnetic buttons, kinetic titles (word-split slide-in), conic gradient border services, counter 00→05 animé, cursor lens photo, intro loader Bruno Simon, cursor context labels, marquees cursor-reactive speed, 3D tilt hero photo (perspective 1200px), custom scrollbar ambre, nav morph pill au scroll passé le hero, OpenType premium, chromatic aberration blob (hue-rotate cycle), timeline connector pointillée process, illustrations SVG par service, sticky bottom bar mobile, indicateur "En ligne · répond en 15 min" nav, FAQ `<details>` HTML natif, section eyebrows avec tiret ambre, card chevron morph, scroll progress bar top, sticky mini-brand, business card flip 3D, curseur ambre inertie desktop.

### Toggle light/dark

Bouton 🌙/☀ dans le nav (grid col 4). Basculement `[data-theme="light"]` sur `<html>`. Choix mémorisé dans `localStorage.wallid-theme`. Light mode override : ink-* → ivoire chaud, texte devient deep-brown.

### Contraintes visuelles

- **Mode clair ET sombre** obligatoire
- **Lisible sur mobile 4G** (Côte d'Ivoire — réseau moins rapide, images optimisées)
- **WCAG 2.2 AA obligatoire** (contrastes, focus rings, target size ≥ 24px)
- **Photo hero** intégrée (fichier `20240926_200724.jpg` — polo rayé bleu/blanc, regard direct)

### Directions écartées (à ne PAS re-proposer)

- Boutique/panier e-commerce pour l'aviculture — abandonné explicitement
- Éditorial paper + Instrument Serif + ambre unique — "trop pâle"
- Cards obsidien copié tel quel du site Nexora — direction incohérente à l'époque
- Cards colorées franches (rejeté)
- Cards pastel sage/blue/terracotta/plum/mustard (trop timide)
- Fausses stats, faux témoignages, faux projets (règle non négociable)

## 7. Stack technique

- **Framework** : Next.js 14 App Router + TypeScript strict
- **Styling** : Tailwind CSS v4 (@theme) + tokens CSS variables DTCG
- **Icons** : lucide-react (jamais d'emoji comme icône UI)
- **Fonts** : via `next/font/google` (Space Grotesk + Inter + Instrument Serif)
- **Formulaire devis** : sans backend — génère message + envoie via `wa.me` ou `mailto:`
- **Hébergement** : Vercel (déploiement gratuit via GitHub)
- **Tokens build** : Style Dictionary — `tokens/*.json` → `app/theme.css` + Tailwind config

## 8. Sécurité (déjà en place)

- Headers HTTP dans `next.config.js` (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- `SECURITY.md` avec check-list critique / important / déjà en place
- `.gitignore` couvre `.env`, `*.pem`, `*.key`, credentials, dumps
- Aucun secret dans le code
- Un seul `dangerouslySetInnerHTML` (script inline pour le thème, hardcodé sans interpolation)

## 9. Accessibilité (obligatoire)

- WCAG 2.2 AA sur tous les couples texte/UI (AAA sur le primaire)
- Skip link « Aller au contenu principal »
- Focus rings visibles sur tous les interactifs (double halo Linear-style)
- ARIA labels sur boutons icônes-only (WhatsApp FAB, thème toggle, hamburger)
- `lang="fr"` sur `<html>`
- Target size ≥ 24px (2.5.8) et 44px recommandé (2.5.5)
- `prefers-reduced-motion` respecté — toutes les anims tombent à 0.01ms

## 10. Feature flags (à préserver dans `lib/site-config.ts`)

- `hasCv: boolean` — active le bouton "Télécharger mon CV" quand `public/cv.pdf` existe
- `isAvailable: boolean` — active le badge vert "Disponible" dans le hero
- `hasReviews: boolean` — active la section Avis avec vrais témoignages
- `hasProjects: boolean` — active la section Réalisations avec vrais projets

## 11. Livrables attendus

- Site Next.js complet dans `Wallid Multiservices/`
- Déployé sur Vercel avec URL publique
- Prototype HTML V19 comme référence visuelle finale
- Fichiers documents à jour : `README.md`, `SECURITY.md`, `CAHIER-DES-CHARGES.md`
- Tokens DTCG à jour dans `tokens/*.json` (charbon obsidien, semantic Linear, radius 18/22, elevation)
- Tokens exportables (Figma Variables) pour décliner sur carte de visite, bannière LinkedIn, flyer
- **Zero fake data** au moment de la publication

## 12. Roadmap portage Next.js

Une fois le prototype figé à 100% :

### Phase 1 — Fondations tokens
1. Mettre à jour `tokens/color.primitives.json` — ramp `ink` en charbon obsidien
2. Créer/mettre à jour `tokens/color.semantic.json` — ajouter `text-primary/secondary/muted/faint`, `focus-ring`, `status-online`, `elevation-card/btn`
3. Mettre à jour `tokens/radius.json` — ajouter `md: 18px`, `lg: 22px`
4. Lancer `npm run tokens` → regénère `app/theme.css` + config Tailwind
5. Valider contrast avec `scripts/contrast.py`

### Phase 2 — Data layer
1. Enrichir `lib/data.ts` : 6 questions FAQ, 3 étapes Process, messages WhatsApp pré-remplis par service (listes de sous-titres)
2. Mettre à jour `lib/site-config.ts` : numéro téléphone à jour (`+225 07 10 11 11 18`)

### Phase 3 — Composants Next.js à créer
- `<Nav>` avec toggle light/dark + status live + morph sur scroll
- `<HeroSection>` avec photo, text-scramble, blob, 3D tilt, cursor lens, eyebrow entrepreneur
- `<Marquee>` réutilisable (trajets + skills)
- `<ServiceCard>` avec click-to-expand + conic border
- `<BusinessCard>` avec flip auto recto/verso
- `<ProcessStep>` avec timeline connector
- `<FAQItem>` avec `<details>`
- `<ReviewsPanel>`
- `<ContactHero>` + `<ContactAlt>`
- `<Footer>` avec rôle ambre
- `<MobileBar>` sticky
- `<CursorCustom>` desktop
- `<IntroLoader>`
- `<ThemeToggle>` avec localStorage
- `<ScrollProgress>` + `<StickyMiniBrand>` + `<GrainOverlay>` + `<WhatsAppFab>`

### Phase 4 — Nettoyage
Supprimer les composants obsolètes : `Stats.tsx`, `Experience.tsx`, `Projects.tsx`, `Gallery.tsx`, `Testimonials.tsx`, `Zones.tsx`.

### Phase 5 — Déploiement
1. `npm run build` → vérifier zéro erreur TS
2. Deploy Vercel via GitHub
3. Configurer domaine (à définir)

## 13. Roadmap post-lancement

1. Fournir les vraies photos de réalisations (min. 6)
2. Ajouter les vrais témoignages (avec accord des clients)
3. Ajouter les vraies certifications
4. Ajouter les vraies statistiques dès qu'elles sont vérifiables
5. Décliner la carte de visite avec QR pointant vers l'URL Vercel
6. Décliner une bannière LinkedIn dans le même style
7. Décliner un flyer imprimable
8. Considérer version bilingue FR/EN

---

## Annexe A — Fichiers de référence

- **Prototype HTML source de vérité** : Artifact V19 — https://claude.ai/artifact/VgJe52h8Z2YW3oPaWiFn6n
- **Fichier local prototype** : `scratchpad/prototype.html` (dans le tmp de la session Claude Code)
- **Photo hero retenue** : `20240926_200724.jpg` (racine projet)
- **Photo écartée** : `20240904_123624.jpg` (lunettes + téléphone masquent les yeux)
- **Dossier tokens** : `tokens/*.json` (18 fichiers DTCG)
- **Dossier données** : `lib/data.ts`, `lib/site-config.ts`
- **Mémoire projet** : `~/.claude/projects/.../memory/wallid-project-state.md`
- **Mémoire user** : `~/.claude/projects/.../memory/user-kazem.md`

## Annexe B — Historique des versions du prototype

| Version | Date | Ce qui a été fait |
|---|---|---|
| V15 | 2026-09-18 | Prototype validé — charbon obsidien + ambre, photo intégrée, 25+ signatures, toggle light/dark |
| V16 | 2026-09-19 | Library Contract Linear appliqué : semantic tokens text-*, focus ring double halo, nav backdrop plus opaque, greys stabilisés |
| V17 | 2026-09-19 | Linear-signature poussé : nav quasi-solide + ring inset, cards à bordures nettes + elevation shadow, buttons inset highlight, nav-links pills |
| V18 | 2026-09-19 | Radius split volontaire : 18px utilité (cards services/process/faq/why), 22px invitation (hero-photo/reviews-panel/contact-hero) |
| V19 | 2026-09-19 | Identité entrepreneur posée : eyebrow ambre "Entrepreneur multi-services · Abidjan" dans hero + rôle ambre dans footer |

---

**Statut au 2026-09-19** : Prototype V19 en cours de validation. Portage Next.js démarre après validation finale.
