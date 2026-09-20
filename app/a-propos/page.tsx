import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/sections/PageShell";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "À propos — " + siteConfig.name,
  description:
    "Kazem Williame Wallid : BTS FCGE Pigier CI, ex-Manager Samer, fondateur Al Walid Lavage Auto et Poulet d'CI. Entrepreneur polyvalent et autodidacte à la croisée du management, du terrain et des nouvelles technologies.",
  openGraph: {
    title: "À propos — " + siteConfig.name,
    description: "Comprendre. Apprendre. Expérimenter. Construire.",
    type: "website",
    locale: "fr_FR",
  },
};

const TIMELINE = [
  {
    period: "Précédemment",
    role: "Secteur quincaillerie",
    body: "Premières années professionnelles dans le commerce de quincaillerie. Découverte du terrain, du contact client et de la gestion opérationnelle d'une activité de vente.",
    tag: null,
  },
  {
    period: "Puis",
    role: "Fondateur — Al Walid Lavage Auto",
    body: "Création et gestion de mon propre lavage automobile. Première expérience complète de création d'entreprise : investissement, équipe, opérations quotidiennes, service client.",
    tag: "Entrepreneuriat",
  },
  {
    period: "2018 → 2022",
    role: "Manager chez Samer",
    body: "Gestion opérationnelle complète : management d'équipe, achats, stocks, fournisseurs, organisation quotidienne. Quatre ans de terrain qui ont ancré ma spécialité en gestion de stock.",
    tag: "Management",
  },
  {
    period: "2023 → 2026",
    role: "Retour comme Manager chez Samer",
    body: "Reprise du poste avec l'expérience accumulée entretemps. Consolidation des processus achats, stocks, fournisseurs. Approfondissement de la spécialité gestion de stock — commerces, restos, entrepôts.",
    tag: "Management",
  },
  {
    period: "Aujourd'hui",
    role: "Poulet d'CI + Digital + Multi-services",
    body: "Développement de Poulet d'CI (élevage et commercialisation de volailles) en parallèle de l'exploration IA/no-code pour créer sites, apps et outils numériques. Tout ça sous une seule enseigne : cinq domaines, un contact.",
    tag: "Nouveau",
  },
];

const SKILLS = [
  {
    title: "Management & gestion",
    body: "Achats, stocks, fournisseurs, équipes, procédures. Ma spécialité pro, forgée par 8 ans chez Samer.",
    slug: "gestion",
  },
  {
    title: "Terrain & technique",
    body: "Bricolage, électricité, équipements, automatisation. Comprendre comment ça marche pour mieux organiser.",
    slug: "technique",
  },
  {
    title: "Digital & no-code",
    body: "Sites web, applications no-code, IA. Transformer des idées et des problèmes concrets en outils fonctionnels.",
    slug: "digital",
  },
];

const METHOD = ["Comprendre.", "Apprendre.", "Expérimenter.", "Construire."];

export default function AProposPage() {
  return (
    <PageShell cta="Me contacter">
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
              <p style={{
                fontSize: "clamp(1.15rem, 2vw, 1.35rem)",
                color: "rgba(248,250,252,0.9)", maxWidth: "50ch",
                marginBottom: 20, lineHeight: 1.4,
                fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
              }}>
                Entrepreneur polyvalent et autodidacte, à la croisée du management, du terrain et des nouvelles technologies.
              </p>
              <p className="hero-lede">
                Titulaire d&apos;un <strong style={{ color: "var(--sun-400)" }}>BTS FCGE — Finance, Comptabilité et Gestion des Entreprises</strong>, obtenu à Pigier Côte d&apos;Ivoire. Je construis mon parcours autour d&apos;une même approche : apprendre, expérimenter et transformer les idées en projets concrets.
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
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="section-eyebrow">Parcours</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            De la quincaillerie au <span className="serif">digital</span>.
          </h2>
          <ol style={{ listStyle: "none", padding: 0, display: "grid", gap: 24, position: "relative" }}>
            {TIMELINE.map((item, i) => (
              <li key={i} style={{
                padding: "28px 32px", borderRadius: "var(--radius)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                border: "1px solid var(--ink-border)",
                display: "grid",
                gridTemplateColumns: "minmax(140px, auto) 1fr",
                gap: 28, alignItems: "flex-start",
              }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-display-pv)", fontWeight: 700,
                    fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "var(--sun-400)", marginBottom: 4,
                  }}>{item.period}</div>
                  {item.tag && (
                    <div style={{
                      display: "inline-block", marginTop: 8, padding: "4px 10px",
                      borderRadius: 999, fontSize: 10, fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      background: "rgba(251,191,36,0.12)",
                      border: "1px solid rgba(251,191,36,0.3)",
                      color: "var(--sun-300)",
                    }}>{item.tag}</div>
                  )}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-display-pv)", fontWeight: 700,
                    fontSize: "1.25rem", letterSpacing: "-0.02em",
                    color: "#fff", marginBottom: 10,
                  }}>{item.role}</h3>
                  <p style={{
                    color: "rgba(248,250,252,0.72)", fontSize: 15,
                    lineHeight: 1.6,
                  }}>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-900)" }}>
        <div className="wrap">
          <div className="section-eyebrow">Trois familles de compétences</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            Ce que je <span className="serif">maîtrise</span> vraiment.
          </h2>
          <div style={{
            display: "grid", gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}>
            {SKILLS.map((s, i) => (
              <Link key={s.slug} href={"/services/" + s.slug} style={{
                padding: "28px 26px", borderRadius: "var(--radius)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
                border: "1px solid var(--ink-border)",
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{
                  fontFamily: "var(--font-display-pv)", fontWeight: 700,
                  fontSize: 32, lineHeight: 1, color: "transparent",
                  WebkitTextStroke: "1.5px var(--sun-500)",
                }} aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
                <h3 style={{
                  fontFamily: "var(--font-display-pv)", fontWeight: 700,
                  fontSize: "1.25rem", letterSpacing: "-0.02em",
                  color: "#fff",
                }}>{s.title}</h3>
                <p style={{ color: "rgba(248,250,252,0.72)", fontSize: 15, lineHeight: 1.5, flex: 1 }}>
                  {s.body}
                </p>
                <div style={{
                  marginTop: 8, color: "var(--sun-400)",
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "var(--font-display-pv)",
                }}>Voir la page dédiée →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: "var(--section) var(--gutter)",
        background: "radial-gradient(ellipse at 20% 30%, rgba(251,191,36,0.12), transparent 55%), var(--ink-950)",
        textAlign: "center",
      }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            Ma méthode
          </div>
          <h2 style={{
            fontFamily: "var(--font-display-pv)", fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em",
            lineHeight: 1.05, color: "#fff", marginBottom: 48, marginTop: 12,
            maxWidth: "22ch", marginInline: "auto",
          }}>
            Quatre verbes, un <span style={{
              fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
              fontWeight: 400, color: "var(--sun-400)",
            }}>engagement</span>.
          </h2>
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: "clamp(20px, 4vw, 60px)", marginTop: 32,
          }}>
            {METHOD.map((word, i) => (
              <div key={word} style={{
                fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                background: "linear-gradient(160deg, var(--sun-300), var(--sun-500) 60%, var(--sun-700))",
                WebkitBackgroundClip: "text", backgroundClip: "text",
                color: "transparent", lineHeight: 1,
              }}>{word}</div>
            ))}
          </div>
          <p style={{
            marginTop: 40, color: "rgba(248,250,252,0.75)",
            fontSize: "1.1rem", maxWidth: "60ch", marginInline: "auto",
            lineHeight: 1.6,
          }}>
            Qu&apos;il s&apos;agisse de gérer une activité, de lancer un nouveau projet, de résoudre un problème technique ou de créer un outil numérique — je pars du besoin réel et je cherche la solution la plus efficace pour le résoudre.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section) var(--gutter)", background: "var(--ink-900)" }}>
        <div className="wrap">
          <div className="section-eyebrow">Aujourd&apos;hui — deux projets à suivre</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>
            Ce sur quoi <span className="serif">je bosse</span> en ce moment.
          </h2>
          <div style={{
            display: "grid", gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}>
            <Link href="/services/aviculture" style={{
              padding: "32px 28px", borderRadius: "var(--radius)",
              background: "linear-gradient(180deg, rgba(251,191,36,0.08), rgba(251,191,36,0.02))",
              border: "1px solid rgba(251,191,36,0.25)",
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              <div style={{
                fontFamily: "var(--font-display-pv)", fontSize: 11,
                letterSpacing: "0.24em", textTransform: "uppercase",
                color: "var(--sun-400)", fontWeight: 700,
              }}>Marque en tête</div>
              <h3 style={{
                fontFamily: "var(--font-display-pv)", fontWeight: 700,
                fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#fff",
              }}>Poulet d&apos;CI</h3>
              <p style={{ color: "rgba(248,250,252,0.75)", fontSize: 15, lineHeight: 1.6 }}>
                Élevage et commercialisation de volailles. Poulets frais, poussins pour élevage (1j/1sem/2sem/1mois — chauffés et vaccinés), œufs frais, formation, conseil pour installation.
              </p>
              <div style={{ color: "var(--sun-400)", fontSize: 13, fontWeight: 600, marginTop: 8 }}>
                Voir le pôle aviculture →
              </div>
            </Link>
            <Link href="/services/digital" style={{
              padding: "32px 28px", borderRadius: "var(--radius)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
              border: "1px solid var(--ink-border)",
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              <div style={{
                fontFamily: "var(--font-display-pv)", fontSize: 11,
                letterSpacing: "0.24em", textTransform: "uppercase",
                color: "var(--sun-400)", fontWeight: 700,
              }}>Nouveau chantier</div>
              <h3 style={{
                fontFamily: "var(--font-display-pv)", fontWeight: 700,
                fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#fff",
              }}>IA + no-code</h3>
              <p style={{ color: "rgba(248,250,252,0.75)", fontSize: 15, lineHeight: 1.6 }}>
                Création d&apos;applications, de sites web et de solutions numériques via IA et no-code (Bubble, Glide, Softr). Transformer rapidement des idées et des problèmes concrets en outils fonctionnels.
              </p>
              <div style={{ color: "var(--sun-400)", fontSize: 13, fontWeight: 600, marginTop: 8 }}>
                Voir le pôle digital →
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="final" aria-labelledby="final-title">
        <div className="wrap">
          <h2 id="final-title">
            Un projet, une idée, une question ? <span className="serif">Écrivez-moi</span>.
          </h2>
          <p>WhatsApp reste le canal le plus rapide. Réponse dans la journée, devis clair sous 24h.</p>
          <div className="final-ctas">
            <Link href="/contact" className="btn btn-wa magnetic">Me contacter</Link>
            <Link href="/" className="btn btn-ghost">Retour au portfolio</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

