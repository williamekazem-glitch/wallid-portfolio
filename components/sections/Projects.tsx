import { Section } from "@/components/ui/Section";
import { projects } from "@/lib/data";
import { CheckCircle2, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/lib/site-config";

export function Projects() {
  const isEmpty = projects.length === 0;

  return (
    <Section
      id="projets"
      eyebrow="Réalisations"
      title={
        isEmpty ? (
          <>
            Portfolio<br />
            <span className="text-muted italic">en construction.</span>
          </>
        ) : (
          <>
            Mes projets.<br />
            <span className="text-muted italic">Concrets et vérifiables.</span>
          </>
        )
      }
      description={
        isEmpty
          ? undefined
          : "Un aperçu des projets menés. Chaque livraison parle d'elle-même."
      }
    >
      {isEmpty ? (
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-border bg-background-elev px-6 py-16 text-center">
          <span
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent"
            aria-hidden="true"
          >
            <Sparkles className="h-6 w-6" />
          </span>
          <div className="max-w-md">
            <h3 className="font-serif text-2xl text-foreground">
              Mes réalisations arrivent bientôt.
            </h3>
            <p className="mt-2 text-muted leading-relaxed">
              Cette section sera prochainement enrichie avec mes projets et interventions.
              En attendant, discutons de ce que je peux faire pour vous.
            </p>
          </div>
          <ButtonLink
            href={`https://wa.me/${siteConfig.whatsapp}?text=Bonjour%20Williame`}
            variant="primary"
            size="md"
          >
            Parler d'un projet
          </ButtonLink>
        </div>
      ) : (
        <ol className="space-y-4">
          {projects.map((p, i) => (
            <li
              key={p.title}
              className="group grid grid-cols-1 gap-4 rounded-2xl border border-border bg-background-elev p-6 transition-all duration-base ease-out-expo hover:border-border-strong hover:shadow-md md:grid-cols-[80px_1fr_auto] md:items-start md:gap-8 md:p-8"
            >
              <div className="text-sm font-serif text-3xl text-muted md:pt-1">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-subtle">
                  <span>{p.service}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-muted leading-relaxed">{p.description}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-success">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {p.outcome}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
