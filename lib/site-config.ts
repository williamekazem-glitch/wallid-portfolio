export const siteConfig = {
  // Identité personnelle — tu es la marque
  name: "Kazem Williame Wallid",
  firstName: "Kazem Williame",
  lastName: "Wallid",
  tagline: "Un profil polyvalent, des solutions concrètes.",
  role: "Profil polyvalent — aviculture, gestion, technique, transport, digital",

  // Coordonnées
  email: "williame.kazem@gmail.com",
  phone: "+225 07 10 11 11 18",
  whatsapp: "2250710111118", // format international sans + ni espaces
  location: "Abidjan, Côte d'Ivoire",

  // Réseaux
  social: {
    linkedin: "https://www.linkedin.com/in/williame-wallid-kazem-02a724122/",
    facebook: "https://www.facebook.com/williamewallid.kazem.1",
    tiktok: "https://www.tiktok.com/@wallidkazem",
  },

  // Image d'aperçu (WhatsApp, Facebook, LinkedIn) — 1200 × 630, dans public/
  ogImage: {
    url: "/og.jpg",
    width: 1200,
    height: 630,
    alt: "Kazem Williame Wallid — Un profil polyvalent, des solutions concrètes.",
  },

  // Feature flags — active quand le contenu réel est prêt
  hasCv: false,          // ← passe à true dès que public/cv.pdf est en place
  isAvailable: true,     // ← petit badge vert "Disponible" dans le Hero
} as const;
