# Tokens — Wallid Portfolio Design System

Source de vérité unique pour toute l'identité visuelle. Format **DTCG** (Design Token Community Group) — importable dans Figma, Style Dictionary, ou tout outil de design system.

## Structure — 3 tiers DTCG

```
tokens/
│
├── ─── Tier 1 : Primitives (valeurs brutes) ─────────────
├── color.primitives.json   # Rampes OKLCH 11-nuances × 4 familles (neutral, amber, sage, danger)
├── typography.json         # Font families + sizes (Major Third) + tracking + leading + weight
├── spacing.json            # Échelle 4px (0 → 128px)
├── radius.json             # 7 tiers (xs → 2xl + full)
├── elevation.json          # 6 shadows warm-ambient
├── motion.json             # Durations + easings
├── borders.json            # Widths + styles
├── breakpoints.json        # sm/md/lg/xl/2xl + container widths
├── opacity.json            # Échelle 0-100
├── blur.json               # Filtres de flou
├── sizing.json             # Icons, controls, touch targets
│
├── ─── Tier 2 : Semantic (rôles applicatifs) ────────────
├── color.semantic.json     # surface / text / border / accent / action / feedback (light + dark)
├── gradients.json          # Halos, overlays, fades
├── states.json             # Les 8 états (default, hover, focus, active, disabled, loading, error, selected)
├── theming.json            # Métadonnées thèmes (light / dark)
│
├── ─── Tier 3 : Component (mapping composants) ──────────
├── component.json          # button / card / badge / input / nav / section / eyebrow / fab
│
├── README.md               # Ce fichier
└── palette.reference.md    # ★ Tableau OKLCH + hex prêt pour designer
```

## Utilisation

### Dans le code du site
Les valeurs runtime vivent dans `app/globals.css` (HSL pour Tailwind alpha). Les tokens JSON sont la **source formelle** consommée par la doc et les outils design.

### Dans Figma
Importer `color.primitives.json` et `color.semantic.json` via le plugin **Tokens Studio** ou **Figma Tokens**. Toutes les couleurs deviennent des Variables Figma nommées identiquement à ton code.

### Pour un designer externe (carte de visite, flyer, LinkedIn banner)
Donne-lui `palette.reference.md` — il a un tableau OKLCH + hex de toute la marque.

## Commandes

```bash
npm run tokens:build     # Régénère app/theme.css + palette.reference.md
npm run tokens:verify    # Vérifie refs + contrastes (WCAG 2.2 AA)
npm run tokens           # Les deux
```

## Vérification

Le validateur teste automatiquement en modes **clair** ET **sombre** :

| Couple | Min AA | Light | Dark |
|---|---|---|---|
| Body text sur page | 4.5:1 | 18.05 | 19.42 |
| Secondary text | 4.5:1 | 10.69 | 13.43 |
| Labels / eyebrow | 4.5:1 | 7.04 | 8.28 |
| Accent utilisé comme texte | 4.5:1 | 4.61 | 8.62 |
| Texte sur bouton accent | 4.5:1 | 4.61 | 8.62 |
| Texte sur bouton primaire | 4.5:1 | 18.05 | 19.42 |
| Success indicator (UI) | 3.0:1 | 5.87 | 8.05 |
| Danger text | 4.5:1 | 6.15 | 6.68 |
| Focus ring visibility | 3.0:1 | 4.61 | 8.62 |

## Modification d'un token

1. Changer une valeur dans `tokens/*.json`
2. `npm run tokens` → régénère + vérifie
3. Si contraste échoue, le validator te dit lequel et de combien
4. Corriger, relancer

Rien d'autre à toucher — les fichiers JSON sont la source, `app/theme.css` en est la représentation CSS.

## Coexistence avec globals.css

Pour l'instant, deux systèmes coexistent volontairement :
- **`app/globals.css`** — runtime actif (HSL pour permettre `bg-accent/50` de Tailwind)
- **`app/theme.css`** (généré) — représentation OKLCH native pour doc/Figma

Si un jour tu migres vers Tailwind v4 (qui est OKLCH-first), tu peux supprimer `globals.css` et n'utiliser que `theme.css`. Tout est déjà aligné.
