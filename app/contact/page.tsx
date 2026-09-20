import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/sections/PageShell";
import { siteConfig } from "@/lib/site-config";
import { buildQuickWhatsAppHref } from "@/lib/data";

const WA = siteConfig.whatsapp;

export const metadata: Metadata = {
  title: "Contact — " + siteConfig.name,
  description:
    "Contactez Kazem Williame Wallid : WhatsApp direct, téléphone, email. Réponse dans la journée, 7j/7. Basé à Abidjan, Côte d'Ivoire.",
  openGraph: {
    title: "Contact — " + siteConfig.name,
    description: "Trois canaux, une réponse rapide.",
    type: "website",
    locale: "fr_FR",
  },
};

const CHANNELS = [
  {
    key: "wa",
    label: "WhatsApp",
    hint: "Le plus rapide — réponse dans la journée",
    action: "Écrire sur WhatsApp",
    href: "https://wa.me/" + WA,
    accent: "var(--wa-500)",
    primary: true,
  },
  {
    key: "tel",
    label: "Téléphone",
    hint: "Voix à voix, pour les échanges plus longs",
    action: siteConfig.phone,
    href: "tel:+" + WA,
    accent: "var(--sun-500)",
    primary: false,
  },
  {
    key: "mail",
    label: "Email",
    hint: "Pour les demandes avec pièces jointes ou détaillées",
    action: siteConfig.email,
    href: "mailto:" + siteConfig.email,
    accent: "var(--sun-400)",
    primary: false,
  },
];

const ZONES = [
  "Abidjan (toutes communes : Cocody, Yopougon, Marcory, Plateau, Riviera, Treichville, Adjamé…)",
  "Grand-Bassam",
  "Assinie",
  "Yamoussoukro",
  "Bouaké",
  "Autres zones sur demande",
];

const SOCIAL = [
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "TikTok", href: siteConfig.social.tiktok },
];

export default function ContactPage() {
  const waHref = buildQuickWhatsAppHref();
  return (
    <PageShell cta="WhatsApp direct">
      <section className="hero" style={{ paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="hero-bg" aria-hidden="true" />
        <div className="blob blob-1" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-eyebrow" style={{ marginBottom: 20 }}>Contact</div>
          <h1 style={{
            fontFamily: "var(--font-display-pv)", fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05,
            letterSpacing: "-0.03em", marginBottom: 24, maxWidth: "18ch",
          }}>
            Trois canaux, <span style={{
              fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
              fontWeight: 400, color: "var(--sun-400)",
            }}>une</span> réponse rapide.
          </h1>
          <p style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "rgba(248,250,252,0.72)", maxWidth: "60ch",
            marginBottom: 40, lineHeight: 1.5,
          }}>
            WhatsApp reste le canal le plus rapide (réponse dans la journée). Téléphone et email sont aussi disponibles selon ce qui vous arrange. Aucun standard, aucun intermédiaire — vous parlez directement avec moi.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-950)" }}>
        <div className="wrap">
          <div style={{
            display: "grid", gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}>
            {CHANNELS.map((ch) => (
              <a key={ch.key} href={ch.href} target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  padding: "32px 28px", borderRadius: "var(--radius)",
                  background: ch.primary
                    ? "linear-gradient(135deg, var(--wa-500), var(--wa-600))"
                    : "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                  border: ch.primary ? "none" : "1px solid var(--ink-border)",
                  display: "flex", flexDirection: "column", gap: 14,
                  color: ch.primary ? "#fff" : "inherit",
                  boxShadow: ch.primary ? "0 20px 40px -12px rgba(37,211,102,0.35)" : "none",
                }}>
                <div style={{
                  fontFamily: "var(--font-display-pv)", fontSize: 11,
                  letterSpacing: "0.24em", textTransform: "uppercase",
                  color: ch.primary ? "rgba(255,255,255,0.85)" : ch.accent, fontWeight: 700,
                }}>{ch.label}</div>
                <div style={{
                  fontFamily: "var(--font-display-pv)", fontWeight: 700,
                  fontSize: ch.primary ? "1.35rem" : "1.15rem", letterSpacing: "-0.02em",
                  color: ch.primary ? "#fff" : "#fff", lineHeight: 1.2,
                  wordBreak: "break-word",
                }}>{ch.action}</div>
                <div style={{
                  fontSize: 14, color: ch.primary ? "rgba(255,255,255,0.85)" : "rgba(248,250,252,0.65)",
                  lineHeight: 1.4,
                }}>{ch.hint}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-900)" }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div style={{
            display: "grid", gap: 40,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}>
            <div>
              <div className="section-eyebrow" style={{ marginBottom: 16 }}>Zones desservies</div>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
                {ZONES.map((z) => (
                  <li key={z} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    fontSize: 15, color: "rgba(248,250,252,0.85)",
                  }}>
                    <span style={{ color: "var(--sun-500)", flexShrink: 0 }} aria-hidden="true">•</span>
                    <span>{z}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="section-eyebrow" style={{ marginBottom: 16 }}>Horaires</div>
              <p style={{ color: "rgba(248,250,252,0.85)", fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
                Réponse WhatsApp <strong style={{ color: "var(--sun-400)" }}>dans la journée</strong>, 7 jours sur 7. Appel possible entre <strong style={{ color: "#fff" }}>8h et 20h</strong> heure d&apos;Abidjan (GMT+0).
              </p>
              <p style={{ color: "rgba(248,250,252,0.7)", fontSize: 14, lineHeight: 1.5 }}>
                Pour les urgences (transport, dépannage), écrivez-moi directement — je réponds aussi hors horaires quand c&apos;est possible.
              </p>

              <div className="section-eyebrow" style={{ marginTop: 32, marginBottom: 16 }}>Réseaux sociaux</div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: 12 }}>
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" style={{
                      padding: "8px 16px", borderRadius: 999,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid var(--ink-border)",
                      color: "rgba(248,250,252,0.85)",
                      fontFamily: "var(--font-display-pv)", fontWeight: 600, fontSize: 13,
                      display: "inline-block",
                    }}>{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="final" aria-labelledby="final-title">
        <div className="wrap">
          <h2 id="final-title">Message rapide, <span className="serif">réponse rapide</span>.</h2>
          <p>Un devis, une question, un projet — le canal le plus direct reste WhatsApp.</p>
          <div className="final-ctas">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa magnetic">
              WhatsApp direct
            </a>
            <a href={"tel:+" + WA} className="btn btn-ghost">Appeler directement</a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
