import { Section } from "@/components/ui/Section";
import { stats } from "@/lib/data";

export function Stats() {
  // Section masquée automatiquement tant qu'aucun chiffre réel n'est ajouté.
  if (stats.length === 0) return null;

  return (
    <Section
      id="chiffres"
      eyebrow="En chiffres"
      title={
        <>
          Le concret,<br />
          <span className="text-muted italic">vérifiable.</span>
        </>
      }
      description="Quelques repères pour situer mon expérience."
    >
      <div
        className={
          stats.length <= 2
            ? "grid gap-4 sm:grid-cols-2 max-w-3xl"
            : stats.length === 3
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        }
      >
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <article
              key={i}
              className="group flex flex-col gap-5 rounded-2xl border border-border bg-background-elev p-6 transition-all duration-base ease-out-expo hover:border-border-strong hover:shadow-md hover:-translate-y-0.5"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent"
                aria-hidden="true"
              >
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>

              <div className="flex flex-col gap-1">
                <span
                  className="font-serif text-5xl leading-none text-foreground tabular-nums tracking-tight"
                  aria-hidden="true"
                >
                  {s.value}
                </span>
                <span className="sr-only">
                  {s.value} {s.label}
                </span>
                <span className="text-sm font-medium text-foreground mt-2">
                  {s.label}
                </span>
                {s.hint && (
                  <span className="text-xs text-subtle leading-relaxed">
                    {s.hint}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
