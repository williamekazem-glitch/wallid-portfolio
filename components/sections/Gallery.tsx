import { Section } from "@/components/ui/Section";
import { gallery } from "@/lib/data";
import { ImageIcon } from "lucide-react";

export function Gallery() {
  return (
    <Section
      id="galerie"
      eyebrow="Galerie"
      title={
        <>
          Le travail parle.<br />
          <span className="text-muted italic">Voici quelques images.</span>
        </>
      }
      description="Emplacements prêts pour vos vraies photos — remplacez chaque case par une image de chantier ou de livraison."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
        {gallery.map((g, i) => (
          <figure
            key={i}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface"
          >
            {/* Placeholder — replace with <Image> once you have real photos */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted transition-transform duration-slow ease-out-expo group-hover:scale-105"
              aria-hidden="true"
            >
              <ImageIcon className="h-8 w-8 opacity-40" />
              <span className="text-xs uppercase tracking-[0.14em] text-subtle">
                À remplacer
              </span>
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-white">
              <span className="text-sm font-medium leading-tight">{g.alt}</span>
              <span className="rounded-full border border-white/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] backdrop-blur-sm">
                {g.category}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
