import { Section } from "@/components/ui/Section";
import { zones } from "@/lib/data";
import { MapPin } from "lucide-react";

export function Zones() {
  // Si les zones ne sont pas renseignées, on n'affiche pas la section.
  if (zones.length === 0) return null;

  return (
    <Section
      id="zones"
      eyebrow="Zone d'intervention"
      title="Où j'interviens."
      description="Hors zone ? Contactez-moi directement — on trouve toujours une solution."
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {zones.map((z) => (
          <li
            key={z}
            className="flex items-center gap-3 rounded-xl border border-border bg-background-elev px-5 py-4"
          >
            <MapPin className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <span className="text-foreground">{z}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
