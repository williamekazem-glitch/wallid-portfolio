"use client";

import { useEffect } from "react";

// Enregistre le service worker (appli installée utilisable sur réseau faible ou coupé).
// Uniquement en production : en développement, il gênerait le rechargement à chaud.
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* sans service worker, le site fonctionne normalement en ligne */
      });
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);
  return null;
}
