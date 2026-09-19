import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ThemeInit } from "@/components/layout/ThemeInit";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kazem-williame-wallid.example"),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description:
    "Portfolio personnel de Kazem Williame Wallid — aviculture, gestion, services techniques (bâtiment, artisanat, sécurité), transport et digital.",
  keywords: [
    "portfolio",
    "aviculture",
    "gestion de stock",
    "services techniques",
    "menuiserie",
    "ferronnerie",
    "plomberie",
    "vidéosurveillance",
    "chauffeur",
    "développement web",
    "marketing digital",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      "Cinq domaines, un contact. Aviculture, gestion, technique, transport, digital.",
    siteName: siteConfig.name,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#100f0d" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <ThemeInit />
      </head>
      <body className="min-h-screen bg-background text-foreground selection:bg-accent-soft">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-foreground focus:text-background focus:px-4 focus:py-2"
        >
          Aller au contenu principal
        </a>
        <Nav />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}