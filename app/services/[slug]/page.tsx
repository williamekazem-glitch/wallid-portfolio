import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { ServicePageContent } from "@/components/sections/ServicePageContent";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) return { title: "Service introuvable" };
  return {
    title: `${svc.title} — ${siteConfig.name}`,
    description: svc.description,
    openGraph: {
      title: `${svc.title} — ${siteConfig.name}`,
      description: svc.description,
      type: "website",
      locale: "fr_FR",
    },
  };
}

export default function ServiceRoute({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();
  const related = services.filter((s) => s.slug !== params.slug);
  return <ServicePageContent service={service} related={related} />;
}
