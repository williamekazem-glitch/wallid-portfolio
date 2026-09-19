import { Section } from "@/components/ui/Section";
import { testimonials } from "@/lib/data";
import { Quote, MessageSquareQuote } from "lucide-react";

export function Testimonials() {
  const isEmpty = testimonials.length === 0;

  // Section masquée tant qu'il n'y a pas de vrais témoignages.
  if (isEmpty) return null;

  return (
    <Section
      id="temoignages"
      eyebrow="Témoignages"
      title={
        <>
          Ce que disent<br />
          <span className="text-muted italic">mes clients.</span>
        </>
      }
      description="Le meilleur baromètre reste la parole de ceux qui m'ont fait confiance."
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <li
            key={i}
            className="relative rounded-2xl border border-border bg-background-elev p-8"
          >
            <Quote
              className="absolute right-6 top-6 h-8 w-8 text-accent opacity-30"
              aria-hidden="true"
            />
            <blockquote className="relative">
              <p className="font-serif text-xl leading-snug text-foreground text-balance">
                “{t.quote}”
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface font-serif text-lg text-foreground"
                  aria-hidden="true"
                >
                  {t.author.charAt(0)}
                </span>
                <div>
                  <cite className="not-italic text-sm font-medium text-foreground">
                    {t.author}
                  </cite>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </Section>
  );
}

// Bonus : composant pour signaler visuellement que la section reviendra.
// Non utilisé par défaut, mais dispo si tu veux la garder visible.
export function TestimonialsPlaceholder() {
  return (
    <Section id="temoignages" eyebrow="Témoignages" title="À venir.">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-border bg-background-elev px-6 py-16 text-center">
        <span
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-surface text-muted"
          aria-hidden="true"
        >
          <MessageSquareQuote className="h-6 w-6" />
        </span>
        <p className="max-w-md text-muted leading-relaxed">
          Je publierai ici les retours de mes clients au fur et à mesure — uniquement des vrais témoignages.
        </p>
      </div>
    </Section>
  );
}
