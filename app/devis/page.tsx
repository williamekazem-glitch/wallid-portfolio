import type { Metadata } from "next";
import { PageShell } from "@/components/sections/PageShell";
import { DevisForm } from "@/components/sections/DevisForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Demander un devis — " + siteConfig.name,
  description:
    "Décrivez votre besoin en 1 minute : la demande s'ouvre dans WhatsApp, déjà rédigée. Devis gratuit, réponse dans la journée.",
  openGraph: {
    images: [siteConfig.ogImage],
    title: "Demander un devis — " + siteConfig.name,
    description: "Votre demande rédigée pour vous, envoyée sur WhatsApp. Devis gratuit sous 24 h.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function DevisPage() {
  return (
    <PageShell cta="WhatsApp direct">
      <section className="devis">
        <div className="wrap devis-wrap">
          <div className="section-eyebrow">Demander un devis</div>
          <h1 className="devis-title">
            Votre demande en <span className="serif">1 minute</span>.
          </h1>
          <p className="devis-lede">
            Répondez à quelques questions : votre demande s&apos;ouvre dans WhatsApp, déjà rédigée. Réponse dans la journée, devis clair sous 24 h.
          </p>
          <DevisForm />
          <p className="devis-alt">
            Vous préférez appeler ? <a href={"tel:+" + siteConfig.whatsapp}>{siteConfig.phone}</a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
