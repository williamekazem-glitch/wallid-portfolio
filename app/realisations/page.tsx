import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/sections/PageShell";
import { siteConfig } from "@/lib/site-config";
import { categoryOrder, buildQuickWhatsAppHref } from "@/lib/data";

export const metadata: Metadata = {
  title: "Réalisations — " + siteConfig.name,
  description:
    "Projets et réalisations de Kazem Williame Wallid : aviculture, transport, chantiers techniques, digital, gestion de stock. Portefolio en construction — zéro faux projet.",
  openGraph: {
    title: "Réalisations — " + siteConfig.name,
    description: "Portefolio de projets réels en construction. Zéro fake, que du vrai.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RealisationsPage() {
  const waHref = buildQuickWhatsAppHref(
    "Bonjour Wallid, je souhaite avoir des exemples de vos réalisations. Merci !"
  );

  return (
    <PageShell cta="Voir des exemples">
      <section className="hero" style={{ paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="hero-bg" aria-hidden="true" />
        <div className="blob blob-1" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-eyebrow" style={{ marginBottom: 20 }}>Réalisations</div>
          <h1 style={{
            fontFamily: "var(--font-display-pv)", fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05,
            letterSpacing: "-0.03em", marginBottom: 24, maxWidth: "20ch",
          }}>
            Les projets <span style={{
              fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
              fontWeight: 400, color: "var(--sun-400)",
            }}>parlent</span> mieux que moi.
          </h1>
          <p style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "rgba(248,250,252,0.72)", maxWidth: "60ch",
            marginBottom: 40, lineHeight: 1.5,
          }}>
            Photos de chantiers, livrables digitaux, installations réalisées — la vitrine se construit en même temps que les projets. Aucun faux, aucun montage : je publie uniquement des réalisations réelles, avec l&apos;accord des clients concernés.
          </p>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa magnetic"
            style={{ minHeight: 56, fontSize: 16 }}>
            Demander des exemples sur WhatsApp
          </a>
        </div>
      </section>

      <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-950)" }}>
        <div className="wrap">
          <div style={{
            padding: "56px 40px", borderRadius: "var(--radius)",
            border: "1px dashed rgba(251,191,36,0.3)",
            background: "linear-gradient(180deg, rgba(251,191,36,0.04), rgba(251,191,36,0.01))",
            textAlign: "center", maxWidth: 720, margin: "0 auto",
          }}>
            <h2 style={{
              fontFamily: "var(--font-display-pv)", fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.02em",
              lineHeight: 1.15, color: "#fff", marginBottom: 16,
            }}>
              Vitrine en <span style={{
                fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
                fontWeight: 400, color: "var(--sun-400)",
              }}>construction</span>.
            </h2>
            <p style={{
              color: "rgba(248,250,252,0.7)", maxWidth: 540,
              margin: "0 auto 24px", lineHeight: 1.6,
            }}>
              Je préfère afficher zéro exemple plutôt que d&apos;inventer des projets ou d&apos;utiliser des photos qui ne sont pas de moi. Les premières vraies réalisations arrivent bientôt, documentées avec l&apos;accord des clients concernés.
            </p>
            <p style={{
              fontFamily: "var(--font-display-pv)", fontSize: 12,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--sun-400)", fontWeight: 600,
            }}>
              · engagement éditorial ·
            </p>
            <p style={{
              marginTop: 28, fontSize: 15, color: "rgba(248,250,252,0.7)",
            }}>
              En attendant, écrivez-moi sur WhatsApp — je peux vous envoyer directement des exemples de mes réalisations correspondant à votre besoin.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-900)" }}>
        <div className="wrap">
          <div className="section-eyebrow">Types de projets réalisables</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            Ce que je peux <span className="serif">livrer</span>.
          </h2>
          <div style={{
            display: "grid", gap: 14,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}>
            {categoryOrder.map((c, i) => {
              const slug = c === "Services techniques" ? "technique" : c === "Gestion de stock" ? "gestion" : c.toLowerCase();
              return (
                <Link key={c} href={"/services/" + slug} style={{
                  padding: "22px", borderRadius: "var(--radius)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                  border: "1px solid var(--ink-border)",
                  display: "flex", flexDirection: "column", gap: 8,
                }}>
                  <div style={{
                    fontFamily: "var(--font-display-pv)", fontSize: 11,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(248,250,252,0.55)",
                  }}>{String(i + 1).padStart(2, "0")} · Pôle</div>
                  <div style={{
                    fontFamily: "var(--font-display-pv)", fontWeight: 700,
                    fontSize: "1.15rem", color: "#fff",
                  }}>{c}</div>
                  <div style={{
                    marginTop: 8, color: "var(--sun-400)",
                    fontSize: 13, fontWeight: 600,
                  }}>Voir les prestations →</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final" aria-labelledby="final-title">
        <div className="wrap">
          <h2 id="final-title">Un projet à <span className="serif">construire</span> ?</h2>
          <p>Chaque nouveau projet enrichit cette vitrine. Racontez-moi ce que vous voulez réaliser.</p>
          <div className="final-ctas">
            <Link href="/devis" className="btn btn-wa magnetic">Demander un devis</Link>
            <Link href="/" className="btn btn-ghost">Retour au portfolio</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
