"use client";

import { useEffect, useRef, useState } from "react";

// Propose d'installer l'appli (PWA) aux visiteurs mobiles — typiquement après
// le scan du QR code de la carte de visite.
// - Android/Chrome : vraie fenêtre d'installation (beforeinstallprompt).
// - iPhone/Safari : pas d'API, on explique le geste « Partager → Écran d'accueil ».
// Jamais sur le premier écran : après 12 s ou dès que la personne fait défiler.
// « Plus tard » = silence pendant 7 jours. Rien si l'appli est déjà installée.

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

const KEY = "wallid-install-dismissed";
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const DELAY_MS = 12000;

function snoozed(): boolean {
  try {
    const t = Number(localStorage.getItem(KEY) || 0);
    return Date.now() - t < SNOOZE_MS;
  } catch {
    return false;
  }
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIosSafari(): boolean {
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua);
  // Safari seulement : les navigateurs intégrés (Facebook, Instagram…) ne savent pas installer.
  const safari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|FBAN|FBAV|Instagram|Line\//.test(ua);
  return ios && safari;
}

export function InstallPrompt() {
  const [mode, setMode] = useState<"android" | "ios" | null>(null);
  const [visible, setVisible] = useState(false);
  const deferred = useRef<BIPEvent | null>(null);

  useEffect(() => {
    if (isStandalone() || snoozed()) return;

    const onBIP = (e: Event) => {
      e.preventDefault(); // on garde l'événement pour l'afficher au bon moment
      deferred.current = e as BIPEvent;
      setMode("android");
    };
    const onInstalled = () => {
      setVisible(false);
      setMode(null);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);
    if (isIosSafari()) setMode("ios");

    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Affichage différé : après DELAY_MS ou au premier vrai défilement.
  useEffect(() => {
    if (!mode) return;
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setVisible(true);
      cleanup();
    };
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) show();
    };
    const timer = window.setTimeout(show, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, [mode]);

  useEffect(() => {
    document.body.classList.toggle("install-open", visible);
    return () => document.body.classList.remove("install-open");
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* stockage indisponible : la bannière reviendra simplement plus tard */
    }
  };

  const install = async () => {
    const e = deferred.current;
    if (!e) return;
    setVisible(false);
    await e.prompt();
    const { outcome } = await e.userChoice.catch(() => ({ outcome: "dismissed" }));
    deferred.current = null;
    if (outcome !== "accepted") dismiss();
  };

  if (!visible || !mode) return null;

  return (
    <div className="pv19">
      <div className="install-banner" role="dialog" aria-labelledby="install-title" aria-describedby="install-desc">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon-192.png" alt="" width={48} height={48} className="install-icon" />
        <div className="install-text">
          <p id="install-title" className="install-title">Installer l&apos;appli Wallid</p>
          {mode === "android" ? (
            <p id="install-desc" className="install-desc">
              Retrouvez-nous en un geste depuis votre écran d&apos;accueil, même avec une connexion faible.
            </p>
          ) : (
            <p id="install-desc" className="install-desc">
              Touchez{" "}
              <svg className="install-share" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Partager" role="img">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>{" "}
              puis « Sur l&apos;écran d&apos;accueil ».
            </p>
          )}
          <div className="install-actions">
            {mode === "android" && (
              <button type="button" className="install-btn install-btn--primary" onClick={install}>
                Installer
              </button>
            )}
            <button type="button" className="install-btn" onClick={dismiss}>
              {mode === "android" ? "Plus tard" : "J'ai compris"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
