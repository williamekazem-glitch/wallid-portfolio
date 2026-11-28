"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

// Animation d'accueil (≈ 5,5 s) à la première visite — typiquement après le scan
// du QR code de la carte de visite. Rendue côté serveur et animée en CSS :
// elle disparaît seule même si le JavaScript tarde. Bouton « Passer » + toucher
// n'importe où. Jamais revue ensuite (localStorage), jamais si « mouvement réduit »
// (le script de ThemeInit pose la classe html.intro-seen avant l'affichage).
// Son : seulement si un enregistrement de Wallid est fourni (siteConfig.introAudio),
// lancé au toucher (les navigateurs interdisent le son automatique).

const TAGS: { label: string; c1: string }[] = [
  { label: "Poulets & œufs", c1: "#C2410C" },
  { label: "Voyages", c1: "#2563EB" },
  { label: "Travaux", c1: "#E11D48" },
  { label: "Gestion de stock", c1: "#7C3AED" },
  { label: "Digital", c1: "#0E7490" },
  { label: "Import Chine", c1: "#047857" },
];

const KEY = "wallid-intro-seen";
const DURATION_MS = 5600;

export function IntroSplash() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-seen")) {
      setOpen(false);
      return;
    }
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* sans stockage, l'animation reviendra à la prochaine visite */
    }
    const t = window.setTimeout(() => setOpen(false), DURATION_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (!open) return null;

  const close = () => setOpen(false);
  const audio = siteConfig.introAudio;

  return (
    <div className="intro" role="dialog" aria-label="Présentation de Wallid" onClick={close}>
      <div className="intro-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="intro-avatar" src="/wallid-avatar.jpg" alt="" width={96} height={96} />
        <p className="intro-l intro-l1">Bonjour 👋</p>
        <p className="intro-l intro-l2">Je suis <span>Wallid</span>.</p>
        <p className="intro-l intro-l3">Avec mon équipe, disponible pour :</p>
        <ul className="intro-tags" aria-label="Mes services">
          {TAGS.map((t, i) => (
            <li key={t.label} style={{ background: t.c1, animationDelay: 2.3 + i * 0.18 + "s" }}>{t.label}</li>
          ))}
        </ul>
        <p className="intro-l intro-l4">Écrivez-moi sur WhatsApp, on s&apos;en occupe.</p>
        {audio && (
          <button
            type="button"
            className="intro-sound"
            onClick={(e) => {
              e.stopPropagation();
              void new Audio(audio).play().catch(() => {});
            }}
          >
            🔊 Écouter Wallid
          </button>
        )}
      </div>
      <button type="button" className="intro-skip" onClick={close}>Passer ›</button>
      <div className="intro-progress" aria-hidden="true" />
    </div>
  );
}
