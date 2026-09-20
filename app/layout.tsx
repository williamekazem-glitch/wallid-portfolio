import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./portfolio.css";
import { ThemeInit } from "@/components/layout/ThemeInit";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-display",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kazem-williame-wallid.example"),
  title: {
    default: siteConfig.name + " - " + siteConfig.tagline,
    template: "%s - " + siteConfig.name,
  },
  description:
    "Portfolio de Kazem Williame Wallid - entrepreneur multi-services à Abidjan. Aviculture, transport, services techniques, digital, gestion de stock. Un seul contact.",
  keywords: [
    "portfolio",
    "Abidjan",
    "Côte d'Ivoire",
    "aviculture",
    "gestion de stock",
    "services techniques",
    "chauffeur privé",
    "vidéosurveillance",
    "sites internet",
    "no-code",
    "packaging sur mesure",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: siteConfig.name + " - " + siteConfig.tagline,
    description: "Cinq domaines, un contact. Aviculture, transport, technique, digital, gestion de stock.",
    siteName: siteConfig.name,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF7F0" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B10" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={inter.variable + " " + spaceGrotesk.variable + " " + instrumentSerif.variable}
      suppressHydrationWarning
    >
      <head>
        <ThemeInit />
      </head>
      <body className="pv19-body min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-foreground focus:text-background focus:px-4 focus:py-2 focus:font-medium"
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}

