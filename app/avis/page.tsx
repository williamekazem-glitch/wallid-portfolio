import Link from "next/link";
import type { Metadata } from "next";
import { reviews, buildReviewWhatsAppHref } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Avis clients — " + siteConfig.name,
  description:
    "Retours honnetes de clients qui m'ont fait confiance sur leurs projets d'aviculture, transport, services techniques, digital ou gestion de stock. Zero faux temoignage.",
  openGraph: {
    title: "Avis clients — " + siteConfig.name,
    description: "Vos retours honnetes m'aident a progresser et rassurent les prochains clients.",
    type: "website",
    locale: "fr_FR",
  },
};

const WA = siteConfig.whatsapp;

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const StarRow = () => (
  <div
    style={{
      display: "inline-flex", gap: 4, color: "var(--sun-500)",
      filter: "drop-shadow(0 2px 6px rgba(251,191,36,0.3))", marginBottom: 12,
    }}
    aria-label="Cinq etoiles"
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export default function AvisPage() {
  const waHref = buildReviewWhatsAppHref();
  const waSimple = "https://wa.me/" + WA + "?text=" + encodeURIComponent(
    "Bonjour Wallid, je souhaite laisser un avis suite a notre collaboration."
  );

  return (
    <div className="pv19">
      <header style={{
        padding: "18px var(--gutter)", borderBottom: "1px solid var(--ink-border)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(11, 11, 16, 0.85)", backdropFilter: "blur(14px)",
      }}>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          color: "var(--sun-400)", fontSize: 14,
          fontFamily: "var(--font-display-pv)", fontWeight: 500,
        }}>
          ← Retour au portfolio
        </Link>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa"
          style={{ minHeight: 40, padding: "10px 18px", fontSize: 14, borderRadius: 999 }}>
          <WhatsAppIcon size={16} />
          Laisser un avis
        </a>
      </header>

      <main id="main">
        <section className="hero" style={{ paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
          <div className="hero-bg" aria-hidden="true" />
          <div className="blob blob-1" aria-hidden="true" />
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            <div className="section-eyebrow" style={{ marginBottom: 20 }}>Avis clients</div>
            <h1 style={{
              fontFamily: "var(--font-display-pv)", fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05,
              letterSpacing: "-0.03em", marginBottom: 24, maxWidth: "20ch",
            }}>
              Ce que <span style={{
                fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
                fontWeight: 400, color: "var(--sun-400)",
              }}>disent</span> mes clients.
            </h1>
            <p style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
              color: "rgba(248,250,252,0.72)", maxWidth: "60ch",
              marginBottom: 40, lineHeight: 1.5,
            }}>
              Retours honnêtes de particuliers et d&apos;entreprises qui m&apos;ont fait confiance sur un projet — aviculture, transport, chantier, digital ou gestion de stock. Aucun faux témoignage, aucune exagération. Que du vrai.
            </p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa magnetic"
              style={{ minHeight: 56, fontSize: 16 }}>
              <WhatsAppIcon size={20} />
              Laisser un avis sur WhatsApp
            </a>
          </div>
        </section>

        <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-950)" }}>
          <div className="wrap">
            {reviews.length === 0 ? (
              <div style={{
                padding: "56px 40px", borderRadius: "var(--radius)",
                border: "1px dashed rgba(251,191,36,0.3)",
                background: "linear-gradient(180deg, rgba(251,191,36,0.04), rgba(251,191,36,0.01))",
                textAlign: "center", maxWidth: 720, margin: "0 auto",
              }}>
                <StarRow />
                <h2 style={{
                  fontFamily: "var(--font-display-pv)", fontWeight: 700,
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.02em",
                  lineHeight: 1.15, color: "#fff", marginBottom: 16,
                }}>
                  Les premiers témoignages <span style={{
                    fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
                    fontWeight: 400, color: "var(--sun-400)",
                  }}>arrivent bientôt.</span>
                </h2>
                <p style={{
                  color: "rgba(248,250,252,0.7)", maxWidth: 540,
                  margin: "0 auto 24px", lineHeight: 1.6,
                }}>
                  Je préfère afficher zéro avis plutôt que d&apos;inventer des faux témoignages ou de sur-vendre. Les premiers vrais retours seront publiés ici, avec l&apos;accord des clients concernés.
                </p>
                <p style={{
                  fontFamily: "var(--font-display-pv)", fontSize: 12,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--sun-400)", fontWeight: 600,
                }}>
                  · engagement éditorial ·
                </p>
              </div>
            ) : (
              <>
                <div className="section-eyebrow">Ils m&apos;ont fait confiance</div>
                <h2 className="section-title" style={{ marginBottom: 48 }}>
                  {reviews.length} retour{reviews.length > 1 ? "s" : ""} <span className="serif">vérifié{reviews.length > 1 ? "s" : ""}</span>.
                </h2>
                <div style={{
                  display: "grid", gap: 20,
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                }}>
                  {reviews.map((r, i) => (
                    <article key={r.author + "-" + i} style={{
                      padding: "28px", borderRadius: "var(--radius)",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                      border: "1px solid var(--ink-border)",
                      display: "flex", flexDirection: "column", gap: 16,
                    }}>
                      <StarRow />
                      <blockquote style={{
                        fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
                        fontSize: "1.15rem", lineHeight: 1.5, color: "#fff",
                        margin: 0, padding: 0,
                        borderLeft: "2px solid var(--sun-500)", paddingLeft: 18,
                      }}>
                        « {r.quote} »
                      </blockquote>
                      <div style={{
                        marginTop: "auto", paddingTop: 16,
                        borderTop: "1px solid var(--ink-border)",
                        display: "flex", justifyContent: "space-between",
                        alignItems: "flex-end", gap: 12,
                      }}>
                        <div>
                          <div style={{
                            fontFamily: "var(--font-display-pv)", fontWeight: 700,
                            fontSize: 15, color: "#fff",
                          }}>{r.author}</div>
                          <div style={{
                            color: "rgba(248,250,252,0.6)", fontSize: 13, marginTop: 2,
                          }}>{r.role}</div>
                        </div>
                        <div style={{
                          fontFamily: "var(--font-display-pv)", fontSize: 11,
                          letterSpacing: "0.14em", textTransform: "uppercase",
                          color: "var(--sun-400)", textAlign: "right", fontWeight: 600,
                        }}>
                          {r.service}<br />
                          <span style={{ color: "rgba(248,250,252,0.5)", fontWeight: 500 }}>{r.date}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-900)" }}>
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="section-eyebrow">Comment laisser un avis</div>
            <h2 className="section-title" style={{ marginBottom: 40 }}>
              Trois lignes suffisent. <span className="serif">Merci</span> d&apos;avance.
            </h2>
            <ol style={{ listStyle: "none", padding: 0, display: "grid", gap: 20 }}>
              {[
                { n: "01", t: "Cliquez sur WhatsApp", d: "Le bouton vert « Laisser un avis sur WhatsApp » ouvre une conversation avec un message pré-rempli." },
                { n: "02", t: "Racontez brièvement", d: "Ce que j'ai fait pour vous, si le délai/prix était tenu, et ce que ça vous a apporté. Format libre — 2 à 5 phrases suffisent." },
                { n: "03", t: "Précisez ce que je peux publier", d: "Votre prénom + initiale (« Fatou K. » plutôt que nom complet si vous préférez), profession/contexte, service concerné. Rien ne sera publié sans votre accord explicite." },
              ].map((step) => (
                <li key={step.n} style={{
                  padding: "24px 28px", borderRadius: "var(--radius)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                  border: "1px solid var(--ink-border)",
                  display: "flex", gap: 20, alignItems: "flex-start",
                }}>
                  <div style={{
                    fontFamily: "var(--font-display-pv)", fontWeight: 700,
                    fontSize: 32, lineHeight: 1, color: "transparent",
                    WebkitTextStroke: "1.5px var(--sun-500)", flexShrink: 0,
                  }} aria-hidden="true">{step.n}</div>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-display-pv)", fontWeight: 700,
                      fontSize: "1.15rem", letterSpacing: "-0.01em",
                      color: "#fff", marginBottom: 6,
                    }}>{step.t}</h3>
                    <p style={{
                      color: "rgba(248,250,252,0.7)", fontSize: 15, lineHeight: 1.5,
                    }}>{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa magnetic"
                style={{ minHeight: 56 }}>
                <WhatsAppIcon size={20} />
                Message pré-rempli
              </a>
              <a href={waSimple} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"
                style={{ minHeight: 56 }}>
                Écrire librement
              </a>
            </div>
          </div>
        </section>

        <section className="final" aria-labelledby="final-title">
          <div className="wrap">
            <h2 id="final-title">Votre avis <span className="serif">compte</span>.</h2>
            <p>Chaque retour honnête m&apos;aide à progresser et rassure les prochains clients. Ça prend deux minutes.</p>
            <div className="final-ctas">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa magnetic">
                <WhatsAppIcon size={18} />
                Laisser un avis
              </a>
              <Link href="/" className="btn btn-ghost">Retour au portfolio</Link>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-wrap">
          <div>
            <div className="footer-brand">
              <span className="brand-dot" aria-hidden="true" />
              Kazem Williame Wallid
            </div>
            <div className="footer-role">Entrepreneur multi-services · Abidjan, Côte d&apos;Ivoire</div>
            <div className="footer-tag">Un profil polyvalent, des solutions concrètes.</div>
          </div>
        </div>
        <div className="footer-copy">© 2026 Kazem Williame Wallid — Abidjan, Côte d&apos;Ivoire.</div>
      </footer>
    </div>
  );
}
