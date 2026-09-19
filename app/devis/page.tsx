import { QuoteForm } from "@/components/sections/QuoteForm";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Clock, MessageCircle } from "lucide-react";
import { services } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/ButtonLink";

// Strip icons before crossing the Server → Client boundary
const quoteFormServices = services.map((s) => ({ slug: s.slug, title: s.title }));

export const metadata = {
  title: "Demander un devis",
  description:
    "Formulaire de demande de devis — décrivez votre besoin, recevez une réponse chiffrée sous 24h.",
};

export default function DevisPage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  const preSelected = searchParams?.service;

  return (
    <div className="pt-32 sm:pt-40 pb-20 lg:pb-32">
      <div className="container-tight">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour à l'accueil
        </Link>

        <div className="mt-8">
          <span className="eyebrow">Demande de devis</span>
          <h1 className="mt-6 font-serif text-display-xl text-balance text-foreground">
            Décrivez votre projet.<br />
            <span className="italic text-muted">Je reviens vers vous sous 24h.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
            Prenez 2 minutes. Plus vous êtes précis, plus mon devis sera juste.
            Devis gratuit, sans engagement.
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-6 text-sm">
          <li className="inline-flex items-center gap-2 text-muted">
            <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
            Devis gratuit
          </li>
          <li className="inline-flex items-center gap-2 text-muted">
            <Clock className="h-4 w-4 text-success" aria-hidden="true" />
            Réponse sous 24h
          </li>
          <li className="inline-flex items-center gap-2 text-muted">
            <MessageCircle className="h-4 w-4 text-success" aria-hidden="true" />
            Sans engagement
          </li>
        </ul>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <QuoteForm services={quoteFormServices} preSelected={preSelected} />

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-background-elev p-6">
              <h2 className="font-serif text-xl text-foreground">Vous préférez parler ?</h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Certains projets méritent une conversation directe. Je suis joignable :
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Bonjour%20Wallid%2C%20je%20souhaite%20un%20devis`}
                  variant="primary"
                  size="md"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp direct
                </ButtonLink>
                <ButtonLink href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} variant="outline" size="md">
                  Appeler {siteConfig.phone}
                </ButtonLink>
              </div>
              <p className="mt-6 text-xs text-subtle leading-relaxed">
                En envoyant le formulaire, vous acceptez d'être recontacté par téléphone,
                email ou WhatsApp au sujet de votre demande.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
