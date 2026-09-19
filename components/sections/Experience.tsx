import { Section } from "@/components/ui/Section";
import { skills, experiences, certifications } from "@/lib/data";
import { Award, GraduationCap, Briefcase } from "lucide-react";

export function Experience() {
  const hasSkills = skills.some((s) => s.level > 0);
  const hasExperiences = experiences.length > 0;
  const hasCertifications = certifications.length > 0;

  // Si absolument rien n'est renseigné, on masque la section entière.
  if (!hasSkills && !hasExperiences && !hasCertifications) return null;

  return (
    <Section
      id="experience"
      eyebrow="Parcours & compétences"
      title={
        <>
          Ce que je sais faire,<br />
          <span className="text-muted italic">et où je l'ai appris.</span>
        </>
      }
      description="Compétences, expériences et certifications — l'essentiel de mon CV."
    >
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
        {/* Skills */}
        {hasSkills ? (
          <div>
            <h3 className="font-serif text-xl text-foreground mb-6">Compétences clés</h3>
            <ul className="space-y-4">
              {skills.map((s) => (
                <li key={s.name}>
                  <div className="flex items-baseline justify-between gap-4 mb-1.5">
                    <span className="text-sm font-medium text-foreground">{s.name}</span>
                    <span className="text-xs text-muted tabular-nums">{s.level}%</span>
                  </div>
                  <div
                    className="h-1 w-full overflow-hidden rounded-full bg-surface"
                    role="progressbar"
                    aria-valuenow={s.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Niveau en ${s.name}`}
                  >
                    <div
                      className="h-full rounded-full bg-foreground transition-all duration-slow ease-out-expo"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyBlock
            icon={<Briefcase className="h-6 w-6" aria-hidden="true" />}
            title="Compétences à renseigner"
            body="Ajoutez vos vrais niveaux dans lib/data.ts (tableau skills, pourcentages honnêtes)."
          />
        )}

        {/* Experiences timeline */}
        {hasExperiences ? (
          <div>
            <h3 className="font-serif text-xl text-foreground mb-6">Expériences</h3>
            <ol className="relative space-y-8 border-l border-border pl-6">
              {experiences.map((e: any) => (
                <li key={e.title} className="relative">
                  <span
                    className="absolute -left-[27px] top-2 h-2 w-2 rounded-full bg-foreground ring-4 ring-background"
                    aria-hidden="true"
                  />
                  <p className="text-xs uppercase tracking-[0.14em] text-subtle">{e.year}</p>
                  <h4 className="mt-1 font-serif text-lg text-foreground">{e.title}</h4>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    {e.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <EmptyBlock
            icon={<GraduationCap className="h-6 w-6" aria-hidden="true" />}
            title="Parcours à renseigner"
            body="Ajoutez vos étapes marquantes dans lib/data.ts (tableau experiences)."
          />
        )}
      </div>

      {/* Certifications */}
      {hasCertifications && (
        <div className="mt-20 border-t border-border pt-16">
          <h3 className="font-serif text-xl text-foreground mb-6">Certifications & formations</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <li
                key={c.title}
                className="flex items-start gap-3 rounded-xl border border-border bg-background-elev p-4"
              >
                <span
                  className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"
                  aria-hidden="true"
                >
                  <Award className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight">{c.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {c.issuer} · {c.year}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}

function EmptyBlock({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border bg-background-elev p-6">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-muted">
        {icon}
      </span>
      <h3 className="font-serif text-lg text-foreground">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{body}</p>
    </div>
  );
}
