import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildServiceWhatsAppHref, type ServiceDef } from "@/lib/data";

const WA = siteConfig.whatsapp;

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export function ServicePageContent({ service, related }: { service: ServiceDef; related: ServiceDef[] }) {
  const waHref = buildServiceWhatsAppHref(service);

  return (
    <div className="pv19">
      <header
        style={{
          padding: "18px var(--gutter)",
          borderBottom: "1px solid var(--ink-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(11, 11, 16, 0.85)",
          backdropFilter: "blur(14px)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "var(--sun-400)",
            fontSize: 14,
            fontFamily: "var(--font-display-pv)",
            fontWeight: 500,
          }}
        >
          ← Retour au portfolio
        </Link>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa"
          style={{ minHeight: 40, padding: "10px 18px", fontSize: 14, borderRadius: 999 }}
        >
          <WhatsAppIcon size={16} />
          WhatsApp
        </a>
      </header>

      <main id="main">
        <section
          className="hero"
          style={{ paddingBlock: "clamp(4rem, 8vw, 6rem)", minHeight: "auto" }}
        >
          <div className="hero-bg" aria-hidden="true" />
          <div className="blob blob-1" aria-hidden="true" />
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
                gap: "clamp(32px, 5vw, 64px)",
                alignItems: "start",
              }}
              className="service-hero-grid"
            >
              <div>
                <div className="section-eyebrow" style={{ marginBottom: 20 }}>
                  Pôle {service.index}
                </div>
                <h1
                  style={{
                    fontFamily: "var(--font-display-pv)",
                    fontWeight: 700,
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    marginBottom: 24,
                    maxWidth: "14ch",
                  }}
                >
                  {service.title}
                </h1>
                <p
                  style={{
                    fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                    color: "rgba(248,250,252,0.72)",
                    maxWidth: "45ch",
                    marginBottom: 32,
                    lineHeight: 1.5,
                  }}
                >
                  {service.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-wa magnetic"
                    style={{ minHeight: 56, fontSize: 16 }}
                  >
                    <WhatsAppIcon size={20} />
                    {service.ctaLabel}
                  </a>
                  <a href={`tel:+${WA}`} className="btn btn-ghost" style={{ minHeight: 56 }}>
                    Appeler {siteConfig.phone}
                  </a>
                </div>
              </div>

              <aside
                aria-label="Prestations incluses"
                style={{
                  padding: "28px 26px",
                  borderRadius: "var(--radius)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid var(--ink-border)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="section-eyebrow"
                  style={{
                    marginBottom: 20,
                    fontSize: 11,
                    letterSpacing: "0.24em",
                  }}
                >
                  {service.highlights.length} prestations
                </div>
                <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
                  {service.highlights.map((h) => (
                    <li
                      key={h}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "10px 14px",
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        transition: "background 0.2s var(--ease), border-color 0.2s var(--ease)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background: "rgba(251,191,36,0.15)",
                          border: "1px solid rgba(251,191,36,0.3)",
                          color: "var(--sun-400)",
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          color: "rgba(248,250,252,0.9)",
                          fontWeight: 500,
                          lineHeight: 1.4,
                        }}
                      >
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                {service.extras && (
                  <div
                    style={{
                      marginTop: 20,
                      padding: "16px 18px",
                      borderRadius: 10,
                      border: "1px solid rgba(251,191,36,0.3)",
                      background:
                        "linear-gradient(180deg, rgba(251,191,36,0.1), rgba(251,191,36,0.03))",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display-pv)",
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--sun-400)",
                        marginBottom: 6,
                      }}
                    >
                      {service.extras.label}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-display-pv)",
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#fff",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.35,
                      }}
                    >
                      {service.extras.content}
                    </p>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        <section className="final" aria-labelledby="final-title">
          <div className="wrap">
            <h2 id="final-title">
              Un projet en <span className="serif">{service.title}</span> ?
            </h2>
            <p>
              Écrivez-moi sur WhatsApp — je vous réponds dans la journée avec un devis clair
              sous 24h. Gratuit, sans engagement.
            </p>
            <div className="final-ctas">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa magnetic"
              >
                <WhatsAppIcon size={18} />
                WhatsApp direct
              </a>
              <a href={`tel:+${WA}`} className="btn btn-ghost">
                Appeler directement
              </a>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-900)" }}>
            <div className="wrap">
              <div className="section-eyebrow">Autres pôles</div>
              <h2 className="section-title" style={{ marginBottom: 40 }}>
                Découvrez les <span className="serif">autres</span> services.
              </h2>
              <div
                style={{
                  display: "grid",
                  gap: 14,
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                }}
              >
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    style={{
                      padding: "22px",
                      borderRadius: "var(--radius)",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                      border: "1px solid var(--ink-border)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      transition: "border-color 0.3s var(--ease), transform 0.3s var(--ease)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display-pv)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(248,250,252,0.62)",
                      }}
                    >
                      {s.index} · {s.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display-pv)",
                        fontWeight: 700,
                        fontSize: "1.15rem",
                        color: "#fff",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {s.short}
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        color: "var(--sun-400)",
                        fontSize: 13,
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      Voir cette page →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <div className="footer-wrap">
          <div>
            <div className="footer-brand">
              <span className="brand-dot" aria-hidden="true" />
              Kazem Williame Wallid
            </div>
            <div className="footer-role">
              Entrepreneur multi-services · Abidjan, Côte d&apos;Ivoire
            </div>
            <div className="footer-tag">
              Un profil polyvalent, des solutions concrètes.
            </div>
          </div>
        </div>
        <div className="footer-copy">© 2026 Kazem Williame Wallid — Abidjan, Côte d&apos;Ivoire.</div>
      </footer>
    </div>
  );
}

