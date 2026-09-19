import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Gallery } from "@/components/sections/Gallery";
import { Zones } from "@/components/sections/Zones";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      {/* qui tu es (rapide) */}
      <Hero />

      {/* chiffres clés — masqué automatiquement si stats vide */}
      <Stats />

      {/* ce que tu proposes — le catalogue en tête */}
      <Services />

      {/* qui tu es (approfondi) */}
      <About />

      {/* ce que tu sais faire — CV */}
      <Experience />

      {/* preuves visuelles (masquées automatiquement si vides) */}
      <Projects />
      <Gallery />
      <Zones />
      <Testimonials />

      {/* comment te contacter */}
      <Contact />
    </>
  );
}
