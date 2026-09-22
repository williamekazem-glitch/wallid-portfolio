import type { MetadataRoute } from "next";

const BASE = "https://wallid-portfolio.vercel.app";

const pages: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/a-propos", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/aviculture", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/transport", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/technique", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/digital", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/gestion", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/sourcing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/realisations", priority: 0.7, changeFrequency: "weekly" },
  { path: "/avis", priority: 0.7, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/devis", priority: 0.7, changeFrequency: "monthly" },
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
