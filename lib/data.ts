import {
  Egg,
  Truck,
  Wrench,
  Code2,
  Package,
  MessageCircle,
  Phone,
  Copy,
  Star,
  type LucideIcon,
} from "lucide-react";

import { siteConfig } from "./site-config";

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

export type ServiceDef = {
  id: string;
  index: string;
  category: Category;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  ctaLabel: string;
  extras?: { label: string; content: string };
};

export const services: ServiceDef[] = [
  {
    id: "aviculture",
    index: "01",
    category: "Aviculture",
    title: "Aviculture",
    short: "Élevage, produits frais et formation",
    description:
      "Poulets frais & poussins, œufs frais, poussins pour élevage (1j/1sem/2sem/1mois — chauffés + vaccinés), formation, conseil pour installation.",
    icon: Egg,
    highlights: [
      "Poulets frais & poussins",
      "Œufs frais",
      "Formation en aviculture",
      "Conseil pour installation",
    ],
    ctaLabel: "Demander un devis",
  },
  {
    id: "transport",
    index: "02",
    category: "Transport",
    title: "Transport",
    short: "Chauffeur privé, courses et longues distances",
    description:
      "Chauffeur privé, courses courtes, longues distances, déplacements professionnels, livraisons.",
    icon: Truck,
    highlights: [
      "Chauffeur privé",
      "Courses courtes & longues distances",
      "Déplacements professionnels",
      "Livraisons",
    ],
    ctaLabel: "Réserver un trajet",
    extras: {
      label: "Trajets réguliers",
      content: "Assinie · Grand-Bassam · Yamoussoukro · Bouaké",
    },
  },
  {
    id: "technique",
    index: "03",
    category: "Services techniques",
    title: "Services techniques",
    short: "Construction, artisanat, sécurité et packaging",
    description:
      "Construction & rénovation, menuiserie, ferronnerie, plomberie, vidéosurveillance + alarmes + appareils connectés (domotique), décoration intérieure, confection sacs & packaging sur mesure.",
    icon: Wrench,
    highlights: [
      "Construction & rénovation",
      "Menuiserie, ferronnerie, plomberie",
      "Vidéosurveillance, alarmes & appareils connectés",
      "Décoration intérieure",
      "Confection sacs & packaging sur mesure",
    ],
    ctaLabel: "Demander un devis",
  },
  {
    id: "digital",
    index: "04",
    category: "Digital",
    title: "Digital",
    short: "Sites, applications et présence en ligne",
    description:
      "Sites internet sur mesure, applications No-Code (Bubble, Glide, Softr), marketing & réseaux sociaux, conseil digital.",
    icon: Code2,
    highlights: [
      "Sites internet sur mesure",
      "Applications No-Code (Bubble, Glide, Softr)",
      "Marketing & réseaux sociaux",
      "Conseil digital",
    ],
    ctaLabel: "Parler d'un projet",
  },
  {
    id: "gestion",
    index: "05",
    category: "Gestion de stock",
    title: "Gestion de stock",
    short:
      "Commerces, restos, entrepôts — partout où il y a de la marchandise",
    description:
      "Ma spécialité professionnelle. Inventaires physiques & contrôle, suivi des entrées/sorties, organisation d'espace de stockage, mise en place de procédures.",
    icon: Package,
    highlights: [
      "Inventaires physiques & contrôle",
      "Suivi des entrées et sorties",
      "Organisation d'espace de stockage",
      "Mise en place de procédures",
    ],
    ctaLabel: "Me contacter",
  },
];

// ─── Trajets marquee (right → left visual, sens ambré) ─────────────
export const trajets: string[] = [
  "Assinie",
  "Grand-Bassam",
  "Yamoussoukro",
  "Bouaké",
];

// ─── Skills marquee (12 items, inverse direction) ─────────────────
export const skillsMarquee: string[] = [
  "Élevage de poulets",
  "Chauffeur privé",
  "Construction & rénovation",
  "Vidéosurveillance",
  "Sites internet",
  "Gestion de stock",
  "Applications No-Code",
  "Décoration intérieure",
  "Menuiserie & ferronnerie",
  "Livraisons",
  "Formation aviculture",
  "Packaging sur mesure",
];

// ─── « Comment je travaille » — 3 étapes ─────────────────────────
export type ProcessStep = {
  index: string;
  title: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  { index: "01", title: "Vous m'écrivez", detail: "Réponse sous 4h" },
  { index: "02", title: "Devis clair", detail: "Sous 24h" },
  { index: "03", title: "Livraison", detail: "Engagement tenu" },
];

// ─── Pourquoi moi — 4 arguments ───────────────────────────────────
export type WhyMeArg = {
  title: string;
  body: string;
};

export const whyMe: WhyMeArg[] = [
  {
    title: "Un seul contact",
    body: "Pour cinq domaines. Un interlocuteur unique qui coordonne tout — moins de friction, plus de résultat.",
  },
  {
    title: "Multi-services",
    body: "Aviculture, transport, technique, digital, gestion de stock. Une seule main pour vos besoins variés.",
  },
  {
    title: "Ancré à Abidjan",
    body: "Je connais le terrain, les prestataires, les zones. Je livre à Abidjan et sur les grands axes.",
  },
  {
    title: "Devis rapide",
    body: "Une réponse sous 4h, un devis clair sous 24h. Pas de délai flou, pas de surprise.",
  },
];

// ─── FAQ — 6 questions honnêtes ────────────────────────────────────
export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "Combien coûte un devis ?",
    answer:
      "Le devis est toujours gratuit. Vous m'écrivez sur WhatsApp avec votre besoin, je vous réponds sous 4h, et je vous envoie un devis clair sous 24h. Pas d'engagement.",
  },
  {
    question: "Vous livrez où en Côte d'Ivoire ?",
    answer:
      "Basé à Abidjan, j'interviens toute la ville et les grands axes. Trajets réguliers Assinie · Grand-Bassam · Yamoussoukro · Bouaké. Pour d'autres zones, on discute.",
  },
  {
    question: "Comment se passe le premier contact ?",
    answer:
      "Vous m'écrivez directement sur WhatsApp (le bouton flottant vert). Précisez votre besoin en quelques mots — je vous rappelle ou vous réponds selon ce qui vous arrange.",
  },
  {
    question: "Est-ce que je peux vous faire confiance sur plusieurs domaines à la fois ?",
    answer:
      "Oui — c'est justement mon métier depuis des années. Ma spécialité pro reste la gestion de stock. Sur les autres domaines, je coordonne avec les bons artisans/prestataires quand c'est nécessaire, en gardant la main sur la qualité et le délai.",
  },
  {
    question: "Comment se déroule le paiement ?",
    answer:
      "Selon le service : acompte à la commande + solde à la livraison pour les gros chantiers. Paiement à la course pour le transport. On cadre au moment du devis, sans surprise.",
  },
  {
    question: "Vous avez des projets à me montrer ?",
    answer:
      "Les photos et références arrivent bientôt sur cette page. Pour l'instant, écrivez-moi sur WhatsApp — je peux vous envoyer directement des exemples de mes réalisations correspondant à votre besoin.",
  },
];

// ─── Contact links ─────────────────────────────────────────────────
export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  action?: "copy" | "link";
};

export const contactLinks: ContactLink[] = [
  {
    id: "wa",
    label: "WhatsApp — le plus rapide",
    value: siteConfig.phone,
    href: `https://wa.me/${siteConfig.whatsapp}`,
    icon: MessageCircle,
  },
  {
    id: "phone",
    label: "Appeler",
    value: siteConfig.phone,
    href: `tel:+${siteConfig.whatsapp}`,
    icon: Phone,
  },
  {
    id: "email",
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Copy,
    action: "copy",
  },
];

// ─── WhatsApp message pré-rempli par service ──────────────────────
// Chaque CTA de service envoie sur WhatsApp un message listant les sous-titres
// concernés — pattern demandé et validé par le user.
export function buildServiceWhatsAppHref(service: ServiceDef): string {
  const bullets = service.highlights.map((h) => `• ${h}`).join("\n");
  const message = `Bonjour Wallid, je souhaite plus d'infos sur votre pôle ${service.title}.\n\nVoici ce qui m'intéresse :\n${bullets}\n\nPouvez-vous me donner plus de détails ?`;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildReviewWhatsAppHref(): string {
  const message = `Bonjour Wallid, je souhaite laisser un avis sur votre travail :\n\n« »\n\n(nom / prestation / date)`;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildQuickWhatsAppHref(text?: string): string {
  const message =
    text ??
    `Bonjour Wallid, je souhaite échanger sur un projet. Merci !`;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

// ─── Reviews stars (empty until real testimonials arrive) ────────
export const starIcon = Star;
export const reviewsHint = "Les premiers témoignages arrivent bientôt.";
