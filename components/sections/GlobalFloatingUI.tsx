"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useKeyboardUser } from "@/lib/hooks/useKeyboardUser";
import { useCoalescedScroll } from "@/lib/hooks/useCoalescedScroll";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const WA = siteConfig.whatsapp;

const WhatsAppIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export function GlobalFloatingUI() {
  useKeyboardUser();
  const reduceMotion = usePrefersReducedMotion();
  const [scrollPct, setScrollPct] = useState(0);
  const cursorHaloRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);

  useCoalescedScroll(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  });

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)").matches) return;
    const halo = cursorHaloRef.current;
    const dot = cursorDotRef.current;
    if (!halo || !dot) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, hx = x, hy = y;
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = "translate(" + x + "px, " + y + "px) translate(-50%, -50%)";
    };
    let raf = 0;
    const anim = () => {
      hx += (x - hx) * 0.18;
      hy += (y - hy) * 0.18;
      halo.style.transform = "translate(" + hx + "px, " + hy + "px) translate(-50%, -50%)";
      raf = requestAnimationFrame(anim);
    };
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(anim);
    const hoverables = 'a, button, [role="button"], .service, input, textarea, select, summary, details';
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.(hoverables)) halo.classList.add("hover");
      const labelMap: Array<[string, string]> = [
        [".bv-qr, .bcard-qr", "Scan"],
        [".hero-photo", "Regard"],
        ['a[href*="wa.me"], .btn-wa, .contact-hero-btn, .mobile-bar-btn--wa, .reviews-btn', "Écrire"],
        ['a[href^="tel:"]', "Appeler"],
        [".service, .faq-item summary, details summary", "Voir"],
        [".faq-item .faq-answer, blockquote", "Lire"],
      ];
      let label = "";
      for (const [sel, l] of labelMap) {
        if (target.closest?.(sel)) { label = l; break; }
      }
      halo.dataset.label = label;
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.(hoverables)) halo.classList.remove("hover");
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div className="pv19">
      <div className="scroll-progress" aria-hidden="true" style={{ width: scrollPct + "%" }} />
      <div className="cursor-halo" aria-hidden="true" ref={cursorHaloRef} />
      <div className="cursor-dot" aria-hidden="true" ref={cursorDotRef} />
      <a href={"https://wa.me/" + WA} className="fab" aria-label="Contacter Wallid sur WhatsApp" target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon size={28} />
      </a>
    </div>
  );
}
