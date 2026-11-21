import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name + " — Portfolio",
    short_name: "Wallid",
    description:
      "Entrepreneur multi-services à Abidjan, avec son équipe. Six domaines, un seul contact. Aviculture, transport, services techniques, digital, gestion de stock, sourcing Chine.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0B0B10",
    theme_color: "#0B0B10",
    lang: "fr-CI",
    categories: ["business", "productivity", "portfolio"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcuts: [
      {
        name: "Contact",
        short_name: "Contact",
        description: "Toutes les façons de me joindre",
        url: "/contact",
      },
      {
        name: "Services",
        short_name: "Services",
        description: "Les 6 pôles de services",
        url: "/#services",
      },
    ],
  };
}
