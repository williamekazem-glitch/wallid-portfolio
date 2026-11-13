import { PortfolioV19 } from "@/components/sections/PortfolioV19";
import { services } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

const SITE_URL = "https://wallid-portfolio.vercel.app";

// Données structurées (schema.org) : aident Google à afficher une fiche
// « professionnel local » avec le téléphone, la zone et les services.
// Uniquement des faits vérifiables : pas de note ni d'avis inventés.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": SITE_URL + "/#business",
  name: siteConfig.name,
  description: siteConfig.tagline,
  url: SITE_URL,
  image: SITE_URL + "/wallid.jpg",
  telephone: "+" + siteConfig.whatsapp,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  areaServed: { "@type": "City", name: "Abidjan" },
  sameAs: Object.values(siteConfig.social),
  founder: {
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Entrepreneur multi-services",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((svc) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: svc.title,
        description: svc.short,
        url: SITE_URL + "/services/" + svc.slug,
      },
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Contenu entièrement statique, construit ci-dessus : pas d'entrée utilisateur.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PortfolioV19 />
    </>
  );
}
