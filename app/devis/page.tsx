import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Demander un devis",
  description: "Écrivez-moi directement sur WhatsApp pour obtenir un devis rapide.",
};

// Placeholder page — le formulaire structuré est prévu en v2.
// V1 canalise tout via WhatsApp direct (cf. cahier des charges).
export default function DevisPage() {
  const waHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Bonjour Wallid, je souhaite un devis pour :"
  )}`;
  return (
    <div className="pv19">
      <main
        id="main"
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "80px 24px",
          background: "var(--ink-900)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <div className="section-eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}>
            Demander un devis
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display-pv)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Le plus rapide, <span style={{ fontFamily: "var(--font-serif-pv)", fontStyle: "italic", color: "var(--sun-400)" }}>c&apos;est</span> WhatsApp.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 32 }}>
            Décrivez-moi votre besoin en quelques mots — je vous réponds sous 4h avec un devis clair
            sous 24h. Gratuit, sans engagement.
          </p>
          <a href={waHref} className="btn btn-wa" style={{ minHeight: 56 }}>
            Écrire sur WhatsApp
          </a>
          <div style={{ marginTop: 24 }}>
            <Link href="/" style={{ color: "var(--sun-400)", fontSize: 14 }}>
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
