import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/sections/PageShell";
import { siteConfig } from "@/lib/site-config";
import { faq, buildQuickWhatsAppHref } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ — " + siteConfig.name,
  description:
    "Questions fréquentes : coût du devis, zones de livraison, premier contact, paiement, projets. Réponses honnêtes de Kazem Williame Wallid.",
  openGraph: {
    title: "FAQ — " + siteConfig.name,
    description: "Les réponses aux vraies questions.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function FaqPage() {
  const waHref = buildQuickWhatsAppHref(
    "Bonjour Wallid, j'ai une question qui n'est pas dans votre FAQ :"
  );

  return (
    <PageShell cta="Poser une question">
      <section className="hero" style={{ paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="hero-bg" aria-hidden="true" />
        <div className="blob blob-1" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-eyebrow" style={{ marginBottom: 20 }}>Questions fréquentes</div>
          <h1 style={{
            fontFamily: "var(--font-display-pv)", fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05,
            letterSpacing: "-0.03em", marginBottom: 24, maxWidth: "20ch",
          }}>
            Les réponses aux <span style={{
              fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
              fontWeight: 400, color: "var(--sun-400)",
            }}>vraies</span> questions.
          </h1>
          <p style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "rgba(248,250,252,0.72)", maxWidth: "60ch",
            marginBottom: 40, lineHeight: 1.5,
          }}>
            Coût du devis, zones desservies, mode de paiement, confiance multi-domaines — les réponses aux {faq.length} questions les plus posées avant de me contacter.
          </p>
        </div>
      </section>

      <section className="faq" style={{ paddingBlock: "var(--section)" }}>
        <div className="wrap">
          <div className="faq-grid" style={{ marginTop: 0 }}>
            {faq.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <div className="faq-answer">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-900)" }}>
        <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            Autre question ?
          </div>
          <h2 style={{
            fontFamily: "var(--font-display-pv)", fontWeight: 700,
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", letterSpacing: "-0.02em",
            lineHeight: 1.1, color: "#fff", marginBottom: 20,
          }}>
            Votre question n&apos;est pas ici ? <span style={{
              fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
              fontWeight: 400, color: "var(--sun-400)",
            }}>Écrivez-moi</span>.
          </h2>
          <p style={{
            color: "rgba(248,250,252,0.7)", maxWidth: 540,
            margin: "0 auto 32px", lineHeight: 1.5,
          }}>
            Un message WhatsApp, une réponse dans la journée. Aucune question idiote — si vous vous la posez, quelqu&apos;un d&apos;autre se la pose aussi.
          </p>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa magnetic"
            style={{ minHeight: 56, fontSize: 16 }}>
            Poser ma question sur WhatsApp
          </a>
        </div>
      </section>

      <section className="final" aria-labelledby="final-title">
        <div className="wrap">
          <h2 id="final-title">Prêt à <span className="serif">démarrer</span> ?</h2>
          <p>Devis gratuit, réponse sous 4h, engagement tenu.</p>
          <div className="final-ctas">
            <Link href="/devis" className="btn btn-wa magnetic">Demander un devis</Link>
            <Link href="/" className="btn btn-ghost">Retour au portfolio</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
