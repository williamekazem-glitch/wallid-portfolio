import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/sections/PageShell";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales — " + siteConfig.name,
  description:
    "Mentions légales, politique de confidentialité et informations obligatoires du portfolio de Kazem Williame Wallid.",
  openGraph: {
    title: "Mentions légales — " + siteConfig.name,
    description: "Informations légales et politique de confidentialité.",
    type: "website",
    locale: "fr_FR",
  },
  robots: { index: true, follow: false },
};

const SECTIONS = [
  {
    title: "1. Éditeur du site",
    body: [
      "Ce site est édité et maintenu à titre personnel par :",
      "**Kazem Williame Wallid**",
      "Entrepreneur personnel multi-services",
      "Abidjan, Côte d'Ivoire",
      "Contact : " + siteConfig.email + " · " + siteConfig.phone,
    ],
  },
  {
    title: "2. Hébergement",
    body: [
      "Le site est hébergé par :",
      "**Vercel Inc.**",
      "340 S Lemon Ave #4133",
      "Walnut, CA 91789, USA",
      "https://vercel.com",
    ],
  },
  {
    title: "3. Propriété intellectuelle",
    body: [
      "L'ensemble des contenus présents sur ce site (textes, photos, graphismes, logo, code source) sont la propriété exclusive de Kazem Williame Wallid, sauf mention contraire.",
      "Toute reproduction, représentation, modification, publication, adaptation partielle ou intégrale de ces éléments est interdite sans autorisation écrite préalable.",
    ],
  },
  {
    title: "4. Données personnelles",
    body: [
      "**Aucune donnée personnelle n'est collectée automatiquement sur ce site.** Aucun formulaire d'inscription, aucun compte utilisateur, aucun tracker publicitaire ne sont utilisés.",
      "Les seules données que vous partagez avec l'éditeur sont celles que vous fournissez volontairement lors d'un contact via WhatsApp, téléphone ou email (nom, coordonnées, nature de votre demande).",
      "Ces données sont utilisées uniquement pour répondre à votre demande et effectuer la prestation si elle est acceptée. Elles ne sont **jamais partagées** avec un tiers, ne sont **jamais utilisées** à des fins commerciales autres que la relation directe avec vous, et sont supprimées sur simple demande à " + siteConfig.email + ".",
      "Vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression conformément à la loi ivoirienne n°2013-450 relative à la protection des données à caractère personnel et, si vous êtes résident de l'Union européenne, au Règlement (UE) 2016/679 (RGPD).",
    ],
  },
  {
    title: "5. Cookies",
    body: [
      "**Ce site n'utilise aucun cookie de suivi, ni cookie publicitaire, ni cookie d'analyse tierce.** Seul un stockage local minimal (localStorage du navigateur) est utilisé pour mémoriser votre préférence de thème (clair/sombre) et savoir si vous avez déjà visité le site pour skipper l'animation d'introduction. Ces données restent exclusivement dans votre navigateur, ne sont jamais transmises à un serveur, et vous pouvez les effacer à tout moment via les paramètres de votre navigateur.",
    ],
  },
  {
    title: "6. Témoignages et avis",
    body: [
      "**Aucun faux témoignage, aucune fausse statistique.** Les avis clients publiés sur la page dédiée le sont uniquement avec l'accord explicite du client concerné. Les statistiques d'activité ne sont publiées que si elles sont vérifiables.",
    ],
  },
  {
    title: "7. Liens externes",
    body: [
      "Ce site contient des liens vers des services externes (WhatsApp, LinkedIn, Facebook, TikTok, service de cartographie, plateforme d'hébergement). L'éditeur n'est pas responsable du contenu ou des pratiques de ces sites tiers.",
    ],
  },
  {
    title: "8. Droit applicable et juridiction",
    body: [
      "Les présentes mentions légales sont soumises au droit ivoirien. Tout litige relatif à leur interprétation ou leur exécution sera de la compétence exclusive des tribunaux d'Abidjan.",
    ],
  },
  {
    title: "9. Contact",
    body: [
      "Pour toute question relative à ces mentions légales, à la politique de confidentialité, ou pour exercer vos droits sur vos données personnelles :",
      "Email : " + siteConfig.email,
      "WhatsApp : " + siteConfig.phone,
    ],
  },
];

function renderLine(line: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i} style={{ color: "#fff", fontWeight: 700 }}>{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}

export default function MentionsLegalesPage() {
  return (
    <PageShell>
      <section style={{ paddingBlock: "clamp(4rem, 8vw, 6rem)", padding: "clamp(4rem, 8vw, 6rem) var(--gutter)" }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="section-eyebrow" style={{ marginBottom: 20 }}>Informations légales</div>
          <h1 style={{
            fontFamily: "var(--font-display-pv)", fontWeight: 700,
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)", lineHeight: 1.05,
            letterSpacing: "-0.03em", marginBottom: 24, maxWidth: "22ch",
          }}>
            Mentions légales &amp; <span style={{
              fontFamily: "var(--font-serif-pv)", fontStyle: "italic",
              fontWeight: 400, color: "var(--sun-400)",
            }}>confidentialité</span>.
          </h1>
          <p style={{
            fontSize: "1.1rem", color: "rgba(248,250,252,0.72)",
            maxWidth: "60ch", marginBottom: 48, lineHeight: 1.6,
          }}>
            Dernière mise à jour : septembre 2026. Ce site collecte le minimum de données possible et ne partage rien avec des tiers.
          </p>

          <div style={{ display: "grid", gap: 40 }}>
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 style={{
                  fontFamily: "var(--font-display-pv)", fontWeight: 700,
                  fontSize: "1.35rem", letterSpacing: "-0.01em",
                  color: "#fff", marginBottom: 16, paddingTop: 20,
                  borderTop: "1px solid var(--ink-border)",
                }}>{s.title}</h2>
                <div style={{ display: "grid", gap: 12 }}>
                  {s.body.map((line, i) => (
                    <p key={i} style={{
                      color: "rgba(248,250,252,0.78)", fontSize: 15,
                      lineHeight: 1.65,
                    }}>{renderLine(line)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div style={{
            marginTop: 60, padding: 24, borderRadius: "var(--radius)",
            background: "linear-gradient(180deg, rgba(251,191,36,0.06), rgba(251,191,36,0.02))",
            border: "1px solid rgba(251,191,36,0.2)",
            textAlign: "center",
          }}>
            <p style={{ color: "rgba(248,250,252,0.85)", fontSize: 14, lineHeight: 1.6 }}>
              Une question sur ces mentions ? Écrivez à <a href={"mailto:" + siteConfig.email} style={{ color: "var(--sun-400)", fontWeight: 600 }}>{siteConfig.email}</a>.
            </p>
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "var(--sun-400)", fontSize: 14,
              fontFamily: "var(--font-display-pv)", fontWeight: 600,
            }}>
              ← Retour au portfolio
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
