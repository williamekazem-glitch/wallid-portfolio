import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { categoryOrder } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container-wide pt-16 pb-12 lg:pt-20 lg:pb-14">
        {/* Top grid: 4 cols */}
        <div className="grid grid-cols-1 gap-10 pb-14 border-b border-border md:grid-cols-12 md:gap-8">
          {/* Identity + tagline (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                {siteConfig.name}
              </h2>
              <p className="mt-2 font-serif text-xl italic leading-snug text-muted">
                «&nbsp;{siteConfig.tagline}&nbsp;»
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          {/* Navigation (2 cols) */}
          <nav className="md:col-span-2" aria-label="Navigation du site">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.14em] text-subtle">
              Navigation
            </span>
            <ul className="space-y-2.5 text-sm">
              <FooterLink href="/">Accueil</FooterLink>
              <FooterLink href="#services">Services</FooterLink>
              <FooterLink href="#a-propos">À propos</FooterLink>
              <FooterLink href="#projets">Réalisations</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </nav>

          {/* Domaines (3 cols) */}
          <div className="md:col-span-3">
            <span className="mb-4 block text-xs font-medium uppercase tracking-[0.14em] text-subtle">
              Domaines d'activité
            </span>
            <ul className="space-y-2.5 text-sm">
              {categoryOrder.map((c) => (
                <li key={c} className="flex items-center gap-2 text-muted">
                  <span
                    className="h-1 w-1 shrink-0 rounded-full bg-border-strong"
                    aria-hidden="true"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct + Réseaux (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <span className="mb-4 block text-xs font-medium uppercase tracking-[0.14em] text-subtle">
                Direct
              </span>
              <ul className="space-y-2.5 text-sm">
                <FooterLinkExternal
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  label="WhatsApp"
                />
                <FooterLinkExternal
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  label="Téléphone"
                />
                <FooterLinkExternal
                  href={`mailto:${siteConfig.email}`}
                  label="Email"
                />
              </ul>
            </div>
            <div>
              <span className="mb-3 block text-xs font-medium uppercase tracking-[0.14em] text-subtle">
                Réseaux
              </span>
              <ul className="space-y-2 text-sm">
                <FooterLinkExternal href={siteConfig.social.linkedin} label="LinkedIn" hideArrow />
                <FooterLinkExternal href={siteConfig.social.facebook} label="Facebook" hideArrow />
                <FooterLinkExternal href={siteConfig.social.tiktok} label="TikTok" hideArrow />
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col gap-3 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. Tous droits réservés.</p>
          <p className="tabular-nums tracking-widest uppercase text-accent">
            <span aria-hidden="true">●</span>&nbsp;{year}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="inline-flex min-h-[24px] items-center py-1 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterLinkExternal({
  href,
  label,
  hideArrow,
}: {
  href: string;
  label: string;
  hideArrow?: boolean;
}) {
  const isHttp = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
        className="inline-flex min-h-[24px] w-full items-center justify-between gap-2 py-1 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
      >
        <span>{label}</span>
        {!hideArrow && (
          <ArrowUpRight className="h-3.5 w-3.5 text-subtle" aria-hidden="true" />
        )}
      </a>
    </li>
  );
}
