import {
  Egg,
  Package,
  Building2,
  Hammer,
  Cog,
  Wrench,
  Camera,
  Truck,
  Code2,
  Megaphone,
  Briefcase,
  Award,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

// Ordre pensé pour un client qui découvre depuis une carte de visite :
// services vendables d'abord, compétence professionnelle à la fin.
export type Category =
  | "Aviculture"
  | "Transport"
  | "Services techniques"
  | "Digital"
  | "Gestion de stock";

export const categoryOrder: Category[] = [
  "Aviculture",
  "Transport",
  "Services techniques",
  "Digital",
  "Gestion de stock",
];

// Meta par catégorie — palette warm-side, chromas plus profondes qu'un pastel.
// Toute la carte baigne dans la teinte, y compris chips et extras (pas de paper qui perce).
export const categoryMeta: Record<
  Category,
  { icon: LucideIcon; short: string; tint: string; icon_bg: string; icon_fg: string }
> = {
  Aviculture: {
    icon: Egg,
    short: "Élevage",
    tint:    "oklch(0.90 0.08 150)",   // sage franc — nature, calme
    icon_bg: "oklch(0.80 0.13 150)",
    icon_fg: "oklch(0.35 0.11 150)",
  },
  Transport: {
    icon: Truck,
    short: "Déplacement",
    tint:    "oklch(0.90 0.07 240)",   // dusty blue franc — route, mouvement
    icon_bg: "oklch(0.80 0.11 240)",
    icon_fg: "oklch(0.38 0.11 240)",
  },
  "Services techniques": {
    icon: Wrench,
    short: "Travaux",
    tint:    "oklch(0.89 0.08 30)",    // terracotta franc — briques, bâtiment
    icon_bg: "oklch(0.78 0.13 30)",
    icon_fg: "oklch(0.38 0.13 30)",
  },
  Digital: {
    icon: Code2,
    short: "Digital",
    tint:    "oklch(0.90 0.07 320)",   // plum warm franc — tech soignée
    icon_bg: "oklch(0.80 0.11 320)",
    icon_fg: "oklch(0.35 0.11 320)",
  },
  "Gestion de stock": {
    icon: Package,
    short: "Inventaire",
    tint:    "oklch(0.90 0.10 90)",    // mustard/olive franc — pratique, terre
    icon_bg: "oklch(0.80 0.15 90)",
    icon_fg: "oklch(0.38 0.13 90)",
  },
};

// Contenu éditorial de chaque catégorie — bullets, CTA verbe-adapté,
// et bloc "extra" optionnel (ex: destinations régulières pour Transport).
export type CategoryContent = {
  tagline: string; // 1 ligne sous le titre — accroche courte
  items: string[];
  ctaLabel: string;
  ctaHref: string;
  extra?: { label: string; content: string };
};

export const categoryContent: Record<Category, CategoryContent> = {
  Aviculture: {
    tagline: "Élevage professionnel, œufs frais, formation.",
    items: [
      "Élevage de poulets",
      "Poulets frais",
      "Poussins",
      "Œufs frais",
      "Formation en aviculture",
      "Conseil pour installation",
    ],
    ctaLabel: "Demander un devis",
    ctaHref: "/devis?service=aviculture",
  },
  Transport: {
    tagline: "Chauffeur privé, livraisons, trajets réguliers.",
    items: [
      "Chauffeur privé",
      "Courses courtes",
      "Longues distances",
      "Déplacements professionnels",
      "Livraisons",
    ],
    ctaLabel: "Réserver un trajet",
    ctaHref: "/devis?service=transport-chauffeur",
    extra: {
      label: "Trajets réguliers",
      content: "Assinie · Grand-Bassam · Yamoussoukro · Bouaké",
    },
  },
  "Services techniques": {
    tagline: "Bâtiment, artisanat et sécurité — de A à Z.",
    items: [
      "Construction & rénovation",
      "Menuiserie",
      "Ferronnerie",
      "Plomberie",
      "Vidéosurveillance",
      "Décoration intérieure",
    ],
    ctaLabel: "Demander un devis",
    ctaHref: "/devis?service=construction-renovation",
  },
  Digital: {
    tagline: "Sites, apps No-Code, marketing en ligne.",
    items: [
      "Sites internet",
      "Applications No-Code",
      "Solutions digitales sur mesure",
      "Marketing & réseaux sociaux",
      "Conseil digital",
    ],
    ctaLabel: "Parler d'un projet",
    ctaHref: "/devis?service=developpement-web",
  },
  "Gestion de stock": {
    tagline: "Inventaire, suivi, organisation d'entrepôt.",
    items: [
      "Gestion de stock",
      "Inventaire",
      "Suivi des entrées et sorties",
      "Organisation d'entrepôt",
    ],
    ctaLabel: "Me contacter",
    ctaHref: "/devis?service=gestion-de-stock",
  },
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  category: Category;
  highlights: string[];
};

export const services: Service[] = [
  // 1. Aviculture
  {
    slug: "aviculture",
    title: "Aviculture",
    short: "Élevage de volailles, œufs, conseil.",
    description:
      "Production avicole : élevage de poulets de chair, pondeuses, fourniture d'œufs frais. Conseil pour la mise en place de votre propre installation.",
    icon: Egg,
    category: "Aviculture",
    highlights: ["Œufs frais", "Poulets fermiers", "Conseil élevage"],
  },

  // 2. Gestion
  {
    slug: "gestion-de-stock",
    title: "Gestion de stock",
    short: "Inventaire, logistique, organisation.",
    description:
      "Mise en place de systèmes d'inventaire, suivi des flux entrants/sortants, optimisation d'entrepôt. Pour boutiques, PME et projets logistiques.",
    icon: Package,
    category: "Gestion de stock",
    highlights: ["Inventaire", "Suivi digital", "Optimisation"],
  },

  // 3. Services techniques
  {
    slug: "construction-renovation",
    title: "Construction & rénovation",
    short: "Gros œuvre, second œuvre, finitions.",
    description:
      "De la fondation aux finitions : maçonnerie, rénovation complète, aménagement intérieur. Chantiers menés avec rigueur, dans les délais et le budget convenus.",
    icon: Building2,
    category: "Services techniques",
    highlights: ["Gros œuvre", "Rénovation", "Finitions"],
  },
  {
    slug: "menuiserie",
    title: "Menuiserie",
    short: "Bois sur mesure, mobilier, agencement.",
    description:
      "Portes, fenêtres, dressings, cuisines, mobilier sur mesure. Travail du bois précis, finitions soignées, essences adaptées.",
    icon: Hammer,
    category: "Services techniques",
    highlights: ["Sur mesure", "Bois massif", "Pose incluse"],
  },
  {
    slug: "ferronnerie",
    title: "Ferronnerie",
    short: "Fer forgé, portails, garde-corps, grilles.",
    description:
      "Ouvrages métalliques sur mesure : portails, grilles, escaliers, garde-corps, structures. Soudure, mise en forme, traitement anti-corrosion.",
    icon: Cog,
    category: "Services techniques",
    highlights: ["Portails & grilles", "Sécurité", "Design"],
  },
  {
    slug: "plomberie",
    title: "Plomberie",
    short: "Installation, dépannage, sanitaires.",
    description:
      "Installation neuve, rénovation salle de bain, dépannage fuites, réseau eau et évacuation. Intervention rapide.",
    icon: Wrench,
    category: "Services techniques",
    highlights: ["Dépannage", "Salle de bain", "Réseau eau"],
  },
  {
    slug: "videosurveillance",
    title: "Vidéosurveillance",
    short: "Caméras, alarmes, contrôle d'accès.",
    description:
      "Étude, installation et maintenance de systèmes de sécurité : caméras IP, enregistreurs, applications mobiles, alarmes.",
    icon: Camera,
    category: "Services techniques",
    highlights: ["Caméras HD/IP", "Accès mobile", "Maintenance"],
  },

  // 4. Transport
  {
    slug: "transport-chauffeur",
    title: "Transport & chauffeur",
    short: "VTC, livraison, transport de marchandises.",
    description:
      "Chauffeur privé pour vos déplacements, livraisons de colis, transport de marchandises. Ponctuel, discret, véhicule entretenu.",
    icon: Truck,
    category: "Transport",
    highlights: ["Ponctualité", "Courts & longs trajets", "Devis clair"],
  },

  // 5. Digital
  {
    slug: "developpement-web",
    title: "Développement web & apps",
    short: "Sites, e-commerce, applications sur mesure.",
    description:
      "Sites vitrines, boutiques en ligne, applications mobiles et outils métier. Développement moderne, rapide, orienté conversion.",
    icon: Code2,
    category: "Digital",
    highlights: ["Sites & apps", "E-commerce", "Sur mesure"],
  },
  {
    slug: "marketing-social-media",
    title: "Marketing & social media",
    short: "Publicité, contenu, présence en ligne.",
    description:
      "Gestion de vos réseaux sociaux, campagnes publicitaires ciblées, création de contenu. Objectif : visibilité et clients qualifiés.",
    icon: Megaphone,
    category: "Digital",
    highlights: ["Réseaux sociaux", "Publicité", "Contenu"],
  },
  {
    slug: "consulting",
    title: "Consulting & services divers",
    short: "Conseil business, formation, missions spéciales.",
    description:
      "Accompagnement d'entrepreneurs, formations pratiques, missions ponctuelles selon vos besoins.",
    icon: Briefcase,
    category: "Digital",
    highlights: ["Accompagnement", "Formation", "Sur devis"],
  },
];

// —— PROJETS : vide par défaut. À remplir avec tes vraies réalisations.
export type Project = {
  title: string;
  service: string;
  year: string;
  location: string;
  description: string;
  outcome: string;
};

export const projects: Project[] = [
  // Exemple de structure — à décommenter et remplir avec tes vrais projets :
  // {
  //   title: "Titre du projet",
  //   service: "Service concerné",
  //   year: "2024",
  //   location: "Ville",
  //   description: "Ce qui a été fait, en 1 ou 2 phrases.",
  //   outcome: "Résultat concret et mesurable.",
  // },
];

// —— TÉMOIGNAGES : vide par défaut. Ajoute-les au fur et à mesure.
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  // Exemple :
  // {
  //   quote: "Ce que le client a dit, sans le retoucher.",
  //   author: "Prénom N.",
  //   role: "Fonction ou métier",
  // },
];

// —— CERTIFICATIONS : garde uniquement celles que tu as vraiment.
export type Certification = {
  title: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  // À remplir avec tes vraies formations. Exemple :
  // { title: "Nom de la formation", issuer: "Organisme", year: "2020" },
];

// —— COMPÉTENCES : ajuste selon ton niveau réel.
export type Skill = { name: string; level: number };

export const skills: Skill[] = [
  { name: "Aviculture & élevage", level: 0 },
  { name: "Gestion & inventaire", level: 0 },
  { name: "Chantier & second œuvre", level: 0 },
  { name: "Menuiserie & ferronnerie", level: 0 },
  { name: "Plomberie & sanitaires", level: 0 },
  { name: "Vidéosurveillance", level: 0 },
  { name: "Développement web", level: 0 },
  { name: "Marketing digital", level: 0 },
];

// —— EXPÉRIENCES : ton parcours réel.
export const experiences = [
  // {
  //   year: "2020 → aujourd'hui",
  //   title: "Titre du poste / activité",
  //   description: "Ce que tu y as fait de significatif.",
  // },
];

// —— ZONES : à remplir avec tes vraies zones d'intervention.
export const zones: string[] = [
  // "Ville / quartier / région où tu interviens",
];

// —— STATS : chiffres clés en 4 cartes éditoriales.
// La section se masque automatiquement tant que ce tableau est vide.
// Ajoute uniquement des chiffres VRAIS et vérifiables.
export type Stat = {
  value: string;    // "15+", "5", "3+", "10 000" — la valeur affichée
  label: string;    // "Projets livrés", "Années d'expérience"
  hint?: string;    // optionnel — contexte court sous le label
  icon: LucideIcon; // icône lucide (Briefcase, Calendar, Award, MapPin, Users, CheckCircle2...)
};

export const stats: Stat[] = [
  // À REMPLIR — décommente les lignes ci-dessous après avoir vérifié les chiffres.
  // Icônes disponibles : Calendar, Briefcase, MapPin, Award, Users, CheckCircle2
  // La section se masque automatiquement tant que ce tableau est vide.
  //
  // { value: "10+", label: "Années d'entrepreneuriat", icon: Calendar },
  // { value: "50+", label: "Projets menés", hint: "Chantiers, sites, missions", icon: Briefcase },
  // { value: "5",   label: "Zones desservies", icon: MapPin },
  // { value: "3",   label: "Certifications", icon: Award },
];

// —— GALERIE : catégories des photos que tu ajouteras dans public/gallery/
export const gallery = [
  { alt: "Poulailler professionnel", category: "Aviculture" },
  { alt: "Gestion d'inventaire", category: "Gestion de stock" },
  { alt: "Chantier de rénovation", category: "Technique" },
  { alt: "Portail en fer forgé", category: "Technique" },
  { alt: "Installation caméra", category: "Technique" },
  { alt: "Réalisation digitale", category: "Digital" },
];
