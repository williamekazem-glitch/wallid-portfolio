import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";
import { buildQuickWhatsAppHref } from "@/lib/data";

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const FOOTER_SECTIONS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: "Portfolio",
    links: [
      { href: "/", label: "Accueil" },
      { href: "/a-propos", label: "À propos" },
      { href: "/realisations", label: "Réalisations" },
      { href: "/avis", label: "Avis clients" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/aviculture", label: "Aviculture" },
      { href: "/services/transport", label: "Transport" },
      { href: "/services/technique", label: "Services techniques" },
      { href: "/services/digital", label: "Digital" },
      { href: "/services/gestion", label: "Gestion de stock" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "/contact", label: "Page contact" },
      { href: "/devis", label: "Demander un devis" },
      { href: "https://wa.me/" + siteConfig.whatsapp, label: "WhatsApp", external: true },
      { href: "tel:+" + siteConfig.whatsapp, label: siteConfig.phone },
      { href: "mailto:" + siteConfig.email, label: siteConfig.email },
    ],
  },
];

export function PageShell({ children, cta = "Écrivez-moi" }: { children: ReactNode; cta?: string }) {
  const waHref = buildQuickWhatsAppHref();
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
          {cta}
        </a>
      </header>

      <main id="main">{children}</main>

      <footer style={{ paddingTop: 48 }}>
        <div className="footer-wrap" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40, marginBottom: 40, paddingBottom: 40,
          borderBottom: "1px solid var(--ink-border)",
        }}>
          <div>
            <div className="footer-brand">
              <span className="brand-dot" aria-hidden="true" />
              Kazem Williame Wallid
            </div>
            <div className="footer-role">Entrepreneur multi-services · Abidjan, Côte d&apos;Ivoire</div>
            <div className="footer-tag" style={{ marginTop: 8 }}>Un profil polyvalent, des solutions concrètes.</div>
          </div>
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <div style={{
                fontFamily: "var(--font-display-pv)", fontWeight: 700,
                fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
                color: "var(--sun-400)", marginBottom: 16,
              }}>{section.title}</div>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10 }}>
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer"
                        style={{ color: "rgba(248,250,252,0.7)", fontSize: 14 }}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} style={{ color: "rgba(248,250,252,0.7)", fontSize: 14 }}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-copy" style={{
          display: "flex", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12, alignItems: "center",
        }}>
          <span>© 2026 Kazem Williame Wallid — Abidjan, Côte d&apos;Ivoire.</span>
          <Link href="/mentions-legales" style={{ color: "rgba(248,250,252,0.5)", fontSize: 12 }}>
            Mentions légales
          </Link>
        </div>
      </footer>
    </div>
  );
}
