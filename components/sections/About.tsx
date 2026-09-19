import { Section } from "@/components/ui/Section";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const pillars = [
  {
    title: "Polyvalence utile",
    body: "Cinq domaines complémentaires. Pas de dispersion — des compétences que je mobilise selon vos besoins.",
  },
  {
    title: "Travail concret",
    body: "Je livre ce que je m'engage à faire. Devis clair, calendrier tenu, exécution soignée.",
  },
  {
    title: "Interlocuteur unique",
    body: "Un seul contact pour l'ensemble : vous ne coordonnez plus, je m'occupe du reste.",
  },
];

export function About() {
  return (
    <Section
      id="a-propos"
      eyebrow="À propos"
      title={
        <>
          Qui je suis,<br />
          <span className="text-muted italic">et comment je travaille.</span>
        </>
      }
      description={`${siteConfig.tagline} Cinq domaines, une exigence commune : livrer ce qui compte, sans détour.`}
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-start">
        <div className="prose-elegant space-y-6 text-lg">
          <p>
            Je m'appelle <span className="text-foreground font-medium">{siteConfig.name}</span>.
            Mon parcours m'a mené de l'aviculture au transport, en passant par les services
            techniques (bâtiment, artisanat, sécurité), le digital et la gestion.
          </p>
          <p>
            Chaque domaine m'a appris quelque chose de différent — la patience de l'élevage, la
            précision du geste artisan, le sens du service, la rigueur de l'inventaire. Ces
            compétences ne s'annulent pas : elles se complètent.
          </p>
          <p>
            Aujourd'hui je propose un catalogue clair, à activer selon vos besoins.
            <span className="text-foreground font-medium">
              {" "}Un seul contact, plusieurs solutions concrètes.
            </span>
          </p>
        </div>

        <ul className="space-y-6 border-l border-border pl-8 lg:pl-10">
          {pillars.map((p) => (
            <li key={p.title} className="relative">
              <span
                className="absolute -left-[42px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background"
                aria-hidden="true"
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              <h3 className="font-serif text-xl text-foreground">{p.title}</h3>
              <p className="mt-1.5 text-muted leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
