import { ArrowDown, ArrowRight, Download, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/lib/site-config";
import { categoryOrder, categoryMeta } from "@/lib/data";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-44 pb-16 lg:pb-24"
      aria-labelledby="hero-title"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-50" style={{ background: "radial-gradient(circle, hsl(var(--accent-soft)) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 items-start">
          {/* — Left: main content — */}
          <div className="max-w-3xl">
            {/* Eyebrow row: portfolio · location · availability */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 animate-fade-in">
              <span className="eyebrow">Portfolio personnel</span>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-border-strong" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {siteConfig.location}
              </span>
              {siteConfig.isAvailable && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  Disponible
                </span>
              )}
            </div>

            <h1
              id="hero-title"
              className="mt-6 font-serif text-display-2xl leading-[0.95] text-foreground animate-fade-up"
            >
              {siteConfig.firstName}
              <br />
              <span className="italic text-muted">{siteConfig.lastName}</span>
            </h1>

            <p
              className="mt-8 max-w-2xl font-serif italic text-2xl sm:text-3xl leading-snug tracking-tight text-foreground animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              «&nbsp;{siteConfig.tagline}&nbsp;»
            </p>
            <p
              className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-muted text-pretty animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              Cinq domaines, un seul interlocuteur — moi, du premier appel à la livraison.
            </p>

            {/* Domaines cliquables */}
            <div
              className="mt-10 animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              <p className="eyebrow mb-3">Domaines d'intervention</p>
              <ul className="flex flex-wrap gap-2" aria-label="Domaines d'activité">
                {categoryOrder.map((c) => {
                  const Icon = categoryMeta[c].icon;
                  return (
                    <li key={c}>
                      <a
                        href="#services"
                        className="group inline-flex items-center gap-2 rounded-full border border-border bg-background-elev px-3.5 py-1.5 text-sm text-foreground transition-colors duration-fast hover:border-border-strong hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Icon
                          className="h-4 w-4 text-accent transition-transform duration-base group-hover:scale-110"
                          aria-hidden="true"
                        />
                        {c}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* CTAs principaux */}
            <div
              className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up"
              style={{ animationDelay: "250ms" }}
            >
              <ButtonLink href="#services" size="lg" variant="primary">
                Voir mes services
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#contact" size="lg" variant="outline">
                Me contacter
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              {siteConfig.hasCv && (
                <ButtonLink href="/cv.pdf" size="lg" variant="ghost" external>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Télécharger mon CV
                </ButtonLink>
              )}
            </div>
          </div>

          {/* — Right: INDEX side panel (desktop only) — */}
          <IndexPanel />
        </div>
      </div>
    </section>
  );
}

function IndexPanel() {
  const year = new Date().getFullYear();
  return (
    <aside
      className="hidden lg:block sticky top-32 rounded-2xl border border-border bg-background-elev/70 backdrop-blur-sm p-6 animate-fade-up"
      style={{ animationDelay: "200ms" }}
      aria-label="Index des domaines"
    >
      <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
        <div
          className="font-serif text-2xl italic text-foreground/30 leading-none"
          aria-hidden="true"
        >
          KWW
        </div>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-subtle">
          <span>Index</span>
          <span className="text-accent">●</span>
          <span className="tabular-nums">{year}</span>
        </div>
      </div>

      <ol className="space-y-0">
        {categoryOrder.map((c, i) => (
          <li
            key={c}
            className="flex items-center justify-between gap-3 border-b border-border/60 py-2 last:border-b-0 text-sm"
          >
            <span className="font-mono text-[11px] text-subtle tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 font-medium text-foreground">{c}</span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-subtle whitespace-nowrap">
              {categoryMeta[c].short}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-center">
        <span className="text-[10px] uppercase tracking-[0.24em] text-subtle">
          Côte d'Ivoire
        </span>
      </div>
    </aside>
  );
}
