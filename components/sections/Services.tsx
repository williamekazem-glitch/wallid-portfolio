import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { categoryOrder, categoryMeta, categoryContent, type Category } from "@/lib/data";

export function Services() {
  return (
    <section
      id="services"
      className="relative py-16 sm:py-20 lg:py-28 scroll-mt-24"
      aria-labelledby="services-title"
    >
      <div className="container-wide">
        {/* Header */}
        <header className="mb-12 sm:mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Services
              </span>
            </div>
            <h2
              id="services-title"
              className="font-serif text-display-lg text-balance text-foreground leading-[1.08]"
            >
              Ce que je propose<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-xs text-lg text-muted leading-relaxed md:text-right">
            Cinq domaines, un contact.
          </p>
        </header>

        {/* Grid — 5 cards style Image 2 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {categoryOrder.map((cat, i) => (
            <ServiceCard key={cat} category={cat} index={i} />
          ))}
        </div>

        {/* Closing CTA — passerelle vers le contact */}
        <div className="mt-14 pt-10 border-t border-border">
          <Link
            href="#contact"
            className="group/close flex w-full items-center justify-between gap-4 rounded-2xl bg-foreground px-6 py-5 text-background shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.12),0_1px_2px_0_rgb(0_0_0_/_0.08)] transition-all duration-base ease-out-expo hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99]"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-xs uppercase tracking-[0.18em] text-background/60">
                Un besoin précis&nbsp;?
              </span>
              <span className="font-serif text-2xl leading-tight">
                Discuter de vos besoins
              </span>
            </div>
            <ArrowRight
              className="h-5 w-5 shrink-0 text-accent transition-transform duration-base group-hover/close:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ category, index }: { category: Category; index: number }) {
  const meta = categoryMeta[category];
  const content = categoryContent[category];
  const Icon = meta.icon;
  const anchorId = `cat-${category.toLowerCase().replace(/\s+/g, "-")}`;
  const visibleItems = content.items.slice(0, 4);
  const extraCount = content.items.length - visibleItems.length;

  return (
    <Link
      id={anchorId}
      href={content.ctaHref}
      style={{ backgroundColor: meta.tint }}
      className="group/card relative flex flex-col rounded-2xl border border-foreground/8 p-6 transition-all duration-base ease-out-expo hover:border-foreground/15 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background scroll-mt-24"
    >
      {/* Header: icon + index */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <span
          style={{ backgroundColor: meta.icon_bg, color: meta.icon_fg }}
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <span
          className="font-mono text-xs tracking-wider tabular-nums text-foreground/40"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Title + tagline */}
      <h3 className="font-serif text-2xl leading-tight text-foreground">
        {category}
      </h3>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/60">
        {meta.short}
      </p>
      <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
        {content.tagline}
      </p>

      {/* Items — chips restent DANS la teinte (fond translucide, pas paper) */}
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {visibleItems.map((item) => (
          <li
            key={item}
            className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/[0.04] px-2.5 py-0.5 text-xs text-foreground/80"
          >
            {item}
          </li>
        ))}
        {extraCount > 0 && (
          <li className="inline-flex items-center rounded-full bg-foreground/[0.08] px-2.5 py-0.5 text-xs text-foreground/60">
            +{extraCount}
          </li>
        )}
      </ul>

      {/* Extra info box — même teinte, juste un peu plus foncée */}
      {content.extra && (
        <div className="mt-4 rounded-xl border border-foreground/10 bg-foreground/[0.05] px-3 py-2">
          <span className="block text-[10px] uppercase tracking-[0.16em] text-foreground/55 mb-0.5">
            {content.extra.label}
          </span>
          <p className="font-serif italic text-sm text-foreground leading-snug">
            {content.extra.content}
          </p>
        </div>
      )}

      {/* Footer: CTA + arrow */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-foreground/10">
        <span className="text-sm font-medium text-foreground">
          {content.ctaLabel}
        </span>
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground/[0.08] text-foreground transition-all duration-base group-hover/card:bg-foreground group-hover/card:text-background"
          aria-hidden="true"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
