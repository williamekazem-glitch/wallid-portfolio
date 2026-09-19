# Sécurité du portfolio

Ce document liste ce qui est **déjà en place** dans le code et ce qui reste **côté toi** (plateforme, comptes, procédures).

Un portfolio statique en Next.js a une petite surface d'attaque, mais les mauvaises surprises viennent presque toujours de la même chose : un mot de passe faible, un token oublié dans le repo, une plateforme mal configurée.

---

## 🔴 Critique — À faire avant/pendant la mise en ligne

- [ ] **Activer 2FA sur GitHub** (Settings → Password and authentication → Two-factor).
  Sans ça, un attaquant qui devine ton mot de passe pousse ce qu'il veut sur ton site.
- [ ] **Activer 2FA sur Vercel/Netlify** (ou l'hébergeur choisi).
- [ ] **Repo GitHub privé** tant que le site n'est pas prêt, **puis public** si tu veux montrer le code.
- [ ] **Ne jamais coller de mot de passe / token dans un fichier .env commité**.
  Si ça arrive : révoquer le token immédiatement, puis nettoyer l'historique (`git filter-repo`).
- [ ] **Audit de tes collaborateurs GitHub** : garde uniquement les personnes actives.
- [ ] **Reset des sessions** si tu partages ton PC avec quelqu'un (Chrome, GitHub, Vercel).

---

## 🟠 Important — Configuration plateforme

### GitHub
- [ ] **Branch protection** sur `main` : demander une PR ou un review avant merge.
- [ ] **Deploy keys** : si tu en as créées et ne t'en sers plus, supprime-les.
- [ ] **Signed commits** (optionnel mais bien) : signe tes commits avec une clé GPG ou SSH.

### Vercel / Netlify (selon ton hébergeur)
- [ ] **Deploy hooks inutilisés** → supprimer.
- [ ] **Environment variables** : si tu ajoutes un jour un endpoint côté serveur (ex : formulaire → Resend/Sendgrid), mets la clé API **uniquement en scope Production**, jamais en Preview.
- [ ] **SSO GitHub** pour te connecter à la plateforme (un mot de passe fort en moins à protéger).
- [ ] **Domaine custom + HTTPS forcé** — Vercel/Netlify le font par défaut, vérifie que c'est actif.

### Domaine
- [ ] **Registrar avec 2FA** (Namecheap, Cloudflare, OVH…).
- [ ] **Verrouiller le domaine** (registrar lock) pour empêcher un transfert non autorisé.

---

## 🟢 Déjà en place dans le code

### En-têtes HTTP de sécurité
Configurés dans `next.config.js` (et redoublés dans `vercel.json`) :

| En-tête | Valeur | Rôle |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Force HTTPS pendant 2 ans |
| `X-Content-Type-Options` | `nosniff` | Empêche le navigateur de deviner un type MIME |
| `X-Frame-Options` | `DENY` | Personne ne peut mettre ton site dans une `<iframe>` (protection contre clickjacking) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Ton URL n'est pas fuitée aux autres sites |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()…` | Aucune API sensible n'est utilisable, même par un script injecté |
| `Content-Security-Policy` | voir `next.config.js` | Restreint les sources de scripts, images, fonts, etc. |
| `X-Powered-By` | (retiré) | Ne pas révéler qu'on utilise Next.js |

### Code
- ✅ **Aucun secret en dur** dans le code (`git grep` couvrant les patterns AWS, GitHub, Slack, Stripe, OAuth, private keys — 0 hit).
- ✅ **Un seul `dangerouslySetInnerHTML`** (script inline pour le thème dans `components/layout/ThemeInit.tsx`), le contenu est **hardcodé sans interpolation** — pas de vecteur XSS.
- ✅ **Formulaire de devis** n'envoie **rien à un serveur** — il prépare un message que l'utilisateur envoie lui-même via WhatsApp ou email. Zéro backend = zéro fuite serveur.
- ✅ **Aucun `eval()` / `new Function()`** dans le code source.
- ✅ **Liens externes** avec `rel="noopener noreferrer"` (aucun `window.opener` exploitable).
- ✅ **Images distantes** limitées à un allowlist (`images.unsplash.com`, `res.cloudinary.com`) dans `next.config.js`.

### Fichiers protégés du dépôt
`.gitignore` couvre :
- `.env`, `.env.*`, `.env*.local`
- `*.pem`, `*.key`, `*.p12`, `*.pfx`
- `credentials.json`, `service-account*.json`
- `id_rsa*`
- `*.sql`, `*.dump`

Si tu ajoutes un jour un service qui a besoin de secrets, mets les valeurs dans `.env.local` (déjà ignoré) et non dans le code.

---

## Signaler une faille

Si quelqu'un trouve une faille de sécurité sur ce site, il peut me contacter directement :
- Email : williame.kazem@gmail.com
- WhatsApp : (à compléter avec le vrai numéro)

Je réponds sous 48h.

---

## Check-list rapide avant chaque déploiement

- [ ] `npm run build` passe sans erreur
- [ ] Aucun `.env` ou fichier de credential dans `git status`
- [ ] Le domaine résout bien en HTTPS
- [ ] Les headers sécurité sont actifs (test : https://securityheaders.com)
- [ ] Le CSP ne casse rien en production (ouvre la console navigateur, cherche `Refused to…`)
