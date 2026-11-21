import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { ServicePageContent } from "@/components/sections/ServicePageContent";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// Next.js 15 : params est une Promise.
type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return { title: "Service introuvable" };
  return {
    title: `${svc.title} — ${siteConfig.name}`,
    description: svc.description,
    openGraph: {
      images: [siteConfig.ogImage],
      title: `${svc.title} — ${siteConfig.name}`,
      description: svc.description,
      type: "website",
      locale: "fr_FR",
    },
  };
}

export default async function ServiceRoute({ params }: { params: Params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const related = services.filter((s) => s.slug !== slug);
  return <ServicePageContent service={service} related={related} />;
}
