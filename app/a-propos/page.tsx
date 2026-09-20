import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/sections/PageShell";
import { siteConfig } from "@/lib/site-config";
import { categoryOrder } from "@/lib/data";

export const metadata: Metadata = {
  title: "À propos — " + siteConfig.name,
  description:
    "Kazem Williame Wallid, entrepreneur multi-services basé à Abidjan. Cinq domaines couverts : aviculture, transport, services techniques, digital, gestion de stock (spécialité pro).",
  openGraph: {
    title: "À propos — " + siteConfig.name,
    description: "Un profil polyvalent, des solutions concrètes.",
    type: "website",
    locale: "fr_FR",
  },
};

const VALUES = [
  { title: "Honnêteté", body: "Zéro fausse promesse, zéro exagération. Si je ne peux pas tenir, je le dis en amont." },
  { title: "Engagement", body: "Ce que j'annonce, je le livre — délai, prix, périmètre. Suivi WhatsApp jusqu'à la fin." },
  { title: "Proximité", body: "Un seul contact direct : moi. Pas de standard, pas d'intermédiaire, pas de bureaucratie." },
  { title: "Adaptabilité", body: "Cinq domaines couverts. Une seule main pour vos besoins variés." },
];

export default function AProposPage() {
  return (
    <PageShell>
      <section className="hero" style={{ paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="hero-bg" aria-hidden="true" />
        <div className="blob blob-1" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-main">
            <div className="hero-content">
              <div className="section-eyebrow" style={{ marginBottom: 20 }}>À propos</div>
              <h1 style={{
                fontFamily: "var(--font-display-pv)", fontWeight: 700,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.02,
                letterSpacing: "-0.03em", marginBottom: 24, maxWidth: "16ch",
              }}>
                Kazem Williame <span style={{
                  fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
                  fontWeight: 400, color: "var(--sun-400)",
                }}>Wallid</span>
              </h1>
              <p className="hero-lede" style={{ marginBottom: 24 }}>
                Entrepreneur personnel multi-services basé à Abidjan, Côte d&apos;Ivoire. Ma promesse : un seul contact direct pour cinq domaines de compétence, un engagement tenu sur les délais et le budget, une réponse WhatsApp dans la journée.
              </p>
              <p className="hero-lede">
                Ma spécialité professionnelle est la <strong style={{ color: "var(--sun-400)" }}>gestion de stock</strong> — pour commerces, restaurants, entrepôts, partout où il y a de la marchandise à suivre. À côté, j&apos;exploite quatre autres domaines que je maîtrise : aviculture, transport, services techniques et digital.
              </p>
            </div>
            <figure className="hero-photo" style={{ maxWidth: 380 }}>
              <Image src="/wallid.jpg" alt="Portrait de Kazem Williame Wallid" width={380} height={475} priority className="hero-photo-img" sizes="(max-width: 900px) 100vw, 380px" />
              <div className="hero-photo-caption">
                <div className="hero-photo-caption-name">Kazem Williame Wallid</div>
                <div className="hero-photo-caption-sub">Abidjan · Côte d&apos;Ivoire</div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-950)" }}>
        <div className="wrap">
          <div className="section-eyebrow">Ma méthode</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            Quatre principes <span className="serif">non négociables</span>.
          </h2>
          <div style={{
            display: "grid", gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}>
            {VALUES.map((v, i) => (
              <article key={v.title} style={{
                padding: "28px 24px", borderRadius: "var(--radius)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                border: "1px solid var(--ink-border)",
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{
                  fontFamily: "var(--font-display-pv)", fontWeight: 700,
                  fontSize: 32, lineHeight: 1, color: "transparent",
                  WebkitTextStroke: "1.5px var(--sun-500)",
                }} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display-pv)", fontWeight: 700,
                  fontSize: "1.25rem", letterSpacing: "-0.02em", color: "#fff",
                }}>{v.title}</h3>
                <p style={{ color: "rgba(248,250,252,0.7)", fontSize: 15, lineHeight: 1.5 }}>
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-900)" }}>
        <div className="wrap">
          <div className="section-eyebrow">Cinq domaines</div>
          <h2 className="section-title" style={{ marginBottom: 40 }}>
            Ce que je <span className="serif">couvre</span>.
          </h2>
          <div style={{
            display: "grid", gap: 14,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}>
            {categoryOrder.map((c, i) => {
              const slug = c === "Services techniques" ? "technique" : c === "Gestion de stock" ? "gestion" : c.toLowerCase();
              return (
                <Link key={c} href={"/services/" + slug} style={{
                  padding: "20px 22px", borderRadius: "var(--radius)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                  border: "1px solid var(--ink-border)",
                  display: "flex", flexDirection: "column", gap: 8,
                }}>
                  <div style={{
                    fontFamily: "var(--font-display-pv)", fontSize: 11,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(248,250,252,0.55)",
                  }}>{String(i + 1).padStart(2, "0")} · {c}</div>
                  <div style={{
                    fontFamily: "var(--font-display-pv)", fontWeight: 700,
                    fontSize: 15, color: "var(--sun-400)", marginTop: 8,
                  }}>Voir la page →</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final" aria-labelledby="final-title">
        <div className="wrap">
          <h2 id="final-title">Un projet ? <span className="serif">Parlons-en</span>.</h2>
          <p>Message WhatsApp, appel, email — le canal qui vous arrange. Réponse dans la journée.</p>
          <div className="final-ctas">
            <Link href="/contact" className="btn btn-wa magnetic">Me contacter</Link>
            <Link href="/" className="btn btn-ghost">Retour au portfolio</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
