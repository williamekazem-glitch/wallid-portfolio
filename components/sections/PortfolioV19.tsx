"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/lib/site-config";
import { FooterSocials, SocialCards } from "@/components/ui/SocialLinks";
import {
  services,
  trajets,
  skillsMarquee,
  processSteps,
  faq,
  buildServiceWhatsAppHref,
  buildReviewWhatsAppHref,
  buildQuickWhatsAppHref,
  valueSummary,
  buildSummaryShareHref,
} from "@/lib/data";
import { useKeyboardUser } from "@/lib/hooks/useKeyboardUser";
import { useCoalescedScroll } from "@/lib/hooks/useCoalescedScroll";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const WA = siteConfig.whatsapp;

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// Pastilles du premier écran : libellés courts, orientés besoin du visiteur.
const HERO_CHIPS: { slug: string; label: string }[] = [
  { slug: "aviculture", label: "Poulets & œufs" },
  { slug: "transport", label: "Voyages & déplacements" },
  { slug: "technique", label: "Travaux & sécurité" },
  { slug: "gestion", label: "Gestion de stock" },
  { slug: "digital", label: "Site & réseaux" },
  { slug: "sourcing", label: "Import Chine" },
];

const ServiceIcons: Record<string, JSX.Element> = {
  aviculture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z" />
    </svg>
  ),
  transport: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
      <circle cx="6.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  ),
  technique: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  digital: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  gestion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  ),
  sourcing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 10.189V14" />
      <path d="M12 2v3" />
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  ),
};

export function PortfolioV19() {
  useKeyboardUser();
  const reduceMotion = usePrefersReducedMotion();

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [pastHeroFar, setPastHeroFar] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const heroPhotoRef = useRef<HTMLElement | null>(null);
  const cursorHaloRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wallid-theme");
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch { /* noop */ }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("wallid-theme", next); } catch { /* noop */ }
  };

  useCoalescedScroll(() => {
    const scrollTop = window.scrollY;
    if (heroRef.current) {
      const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
      setScrolled(scrollTop > heroBottom - 200);
      setPastHero(scrollTop > heroBottom - 80);
      setPastHeroFar(scrollTop > heroBottom - 100);
    }
  });

  useEffect(() => {
    const titles = document.querySelectorAll<HTMLElement>(".pv19 .section-title");
    titles.forEach((title) => {
      if (title.dataset.split === "1") return;
      title.dataset.split = "1";
      const walkWords = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = (node.nodeValue ?? "").split(/(\s+)/);
          const frag = document.createDocumentFragment();
          words.forEach((w) => {
            if (/\s+/.test(w)) frag.appendChild(document.createTextNode(w));
            else if (w) {
              const kw = document.createElement("span");
              kw.className = "kw";
              const inner = document.createElement("span");
              inner.textContent = w;
              kw.appendChild(inner);
              frag.appendChild(kw);
            }
          });
          (node as ChildNode).replaceWith(frag);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.classList?.contains("kw")) return;
          [...el.childNodes].forEach(walkWords);
        }
      };
      [...title.childNodes].forEach(walkWords);
      title.querySelectorAll<HTMLElement>(".kw > span").forEach((s, i) => {
        s.style.transitionDelay = i * 60 + "ms";
      });
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    titles.forEach((t) => io.observe(t));
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll(".pv19 .reveal").forEach((el) => revealIO.observe(el));
    return () => { io.disconnect(); revealIO.disconnect(); };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (min-width: 900px)").matches) return;
    const btns = document.querySelectorAll<HTMLElement>(".pv19 .magnetic");
    const cleanup: Array<() => void> = [];
    btns.forEach((btn) => {
      let bx = 0, by = 0, cx = 0, cy = 0, animating = false;
      const anim = () => {
        bx += (cx - bx) * 0.2;
        by += (cy - by) * 0.2;
        btn.style.transform = "translate(" + bx + "px, " + by + "px)";
        if (Math.abs(cx - bx) > 0.1 || Math.abs(cy - by) > 0.1) requestAnimationFrame(anim);
        else animating = false;
      };
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        cx = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
        cy = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
        if (!animating) { animating = true; requestAnimationFrame(anim); }
      };
      const onLeave = () => {
        cx = 0; cy = 0;
        if (!animating) { animating = true; requestAnimationFrame(anim); }
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      cleanup.push(() => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanup.forEach((f) => f());
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)").matches) return;
    const photo = heroPhotoRef.current;
    if (!photo) return;
    let tiltFrame = 0;
    const onMove = (e: MouseEvent) => {
      const rect = photo.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      photo.style.setProperty("--mx", x + "%");
      photo.style.setProperty("--my", y + "%");
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        photo.style.transform = "perspective(1200px) rotateX(" + (-py * 5) + "deg) rotateY(" + (px * 8) + "deg)";
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(tiltFrame);
      photo.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    };
    photo.addEventListener("mousemove", onMove);
    photo.addEventListener("mouseleave", onLeave);
    return () => {
      photo.removeEventListener("mousemove", onMove);
      photo.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(tiltFrame);
    };
  }, [reduceMotion]);

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
    const hoverables = 'a, button, [role="button"], .service, input, textarea, select, summary';
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.(hoverables)) halo.classList.add("hover");
      const labelMap: Array<[string, string]> = [
        [".bv-qr, .bcard-qr", "Scan"],
        [".hero-photo", "Regard"],
        ['a[href*="wa.me"], .btn-wa, .contact-hero-btn, .mobile-bar-btn--wa, .reviews-btn', "Écrire"],
        ['a[href^="tel:"]', "Appeler"],
        [".service, .faq-item summary", "Voir"],
        [".faq-item .faq-answer", "Lire"],
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

  useEffect(() => {
    if (reduceMotion) return;
    const marquees = document.querySelectorAll<HTMLElement>(".pv19 .trajets-inner, .pv19 .skills-inner");
    if (marquees.length === 0) return;
    let mouseVel = 0, lastMx = 0, lastMt = performance.now();
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastMt, 1);
      const dx = e.clientX - lastMx;
      const v = Math.min(Math.abs(dx) / dt, 3);
      mouseVel = mouseVel * 0.85 + v * 0.15;
      lastMx = e.clientX; lastMt = now;
    };
    document.addEventListener("mousemove", onMove);
    const interval = window.setInterval(() => {
      const factor = 1 + Math.min(mouseVel * 2, 2.5);
      marquees.forEach((m) => {
        m.style.animationDuration = m.classList.contains("skills-inner")
          ? (34 / factor) + "s"
          : (28 / factor) + "s";
      });
      mouseVel *= 0.94;
    }, 200);
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.clearInterval(interval);
    };
  }, [reduceMotion]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopyToast(true);
      window.setTimeout(() => setCopyToast(false), 1800);
    } catch {
      window.location.href = "mailto:" + siteConfig.email;
    }
  };


  const trajetsSeq = [...trajets, ...trajets];
  const skillsSeq = [...skillsMarquee, ...skillsMarquee];

  return (
    <div className="pv19">
      <nav className={"nav" + (scrolled ? " compact" : "")} aria-label="Navigation principale">
        <a href="#" className="brand">
          <span className="brand-dot" aria-hidden="true" />
          Wallid&nbsp;Kazem
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="/a-propos">À propos</a>
          <a href="#pourquoi">Pourquoi moi</a>
          <a href="/avis">Avis</a>
          <a href="/contact">Contact</a>
        </div>
        <span className="nav-status" aria-label="Disponibilité">
          <span className="nav-status-dot" aria-hidden="true" />
          En ligne · répond en 15 min
        </span>
        <button
          type="button"
          className="theme-toggle"
          aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
          onClick={toggleTheme}
        >
          <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </button>
        <a href="#contact" className="nav-cta magnetic">
          <span className="nav-cta-long">Demander un devis</span>
          <span className="nav-cta-short">Devis</span>
          <ArrowRight />
        </a>
      </nav>

      <main id="main" tabIndex={-1}>
        <section className="hero" aria-label="Présentation" ref={(el) => { heroRef.current = el; }}>
          <div className="hero-bg" aria-hidden="true" />
          <div className="blob blob-1" aria-hidden="true" />
          <div className="hero-wrap">
            <div className="hero-main">
              <div className="hero-content">
                <div className="hero-hello hero-in">
                  <Image
                    className="hero-avatar"
                    src="/wallid-avatar.jpg"
                    alt=""
                    width={64}
                    height={64}
                    priority
                  />
                  <div>
                    <p className="hero-hello-hi">Salut&nbsp;! Je suis Wallid</p>
                    <p className="hero-hello-sub">
                      <span className="hero-hello-dot" aria-hidden="true" />
                      Disponible · Abidjan
                    </p>
                  </div>
                </div>
                <h1 className="hero-in-title">
                  Un besoin&nbsp;?<br /> <span className="accent hero-accent-line">Je m&apos;en occupe.</span>
                </h1>
                <p className="hero-lede hero-in hero-in-1">
                  Six domaines, un seul interlocuteur. Touchez ce qui vous intéresse&nbsp;:
                </p>
                <ul className="hero-chips hero-in hero-in-2" aria-label="Mes services">
                  {HERO_CHIPS.map((c) => (
                    <li key={c.slug}>
                      <Link href={"/services/" + c.slug} className="hero-chip">
                        <span className="hero-chip-icon">{ServiceIcons[c.slug]}</span>
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="hero-ctas hero-in hero-in-3">
                  <a href={buildQuickWhatsAppHref()} className="btn btn-wa magnetic">
                    <WhatsAppIcon size={18} />
                    Écrire sur WhatsApp
                  </a>
                  <a href="/wallid.vcf" download="Wallid-Kazem.vcf" className="btn btn-ghost">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M19 8v6" />
                      <path d="M22 11h-6" />
                    </svg>
                    Enregistrer mon contact
                  </a>
                </div>
              </div>
              <figure className="hero-photo hero-in hero-in-2" aria-label="Portrait de Kazem Williame Wallid" ref={(el) => { heroPhotoRef.current = el; }}>
                <Image
                  className="hero-photo-img"
                  src="/wallid.jpg"
                  alt="Portrait de Kazem Williame Wallid"
                  width={480}
                  height={600}
                  loading="lazy"
                  sizes="480px"
                />
                <div className="hero-photo-caption">
                  <div className="hero-photo-caption-name">Kazem Williame Wallid</div>
                  <div className="hero-photo-caption-sub">Abidjan · Côte d&apos;Ivoire</div>
                </div>
              </figure>
            </div>
          </div>
        </section>

        <section className="resume" id="resume" aria-labelledby="resume-title">
          <div className="wrap">
            <div className="resume-head">
              <div className="section-eyebrow">En résumé</div>
              <h2 className="section-title" id="resume-title">
                Ce que je vous <span style={{ whiteSpace: "nowrap" }}><span className="serif">apporte</span>,</span> en 30 secondes.
              </h2>
              <p className="resume-intro">{valueSummary.intro}</p>
            </div>
            <ul className="resume-facts reveal reveal-delay-1" aria-label="En chiffres">
              {valueSummary.facts.map((f) => (
                <li key={f.label}>
                  <span className="resume-fact-value">{f.value}</span>
                  <span className="resume-fact-label">{f.label}</span>
                </li>
              ))}
            </ul>
            <ol className="resume-list reveal reveal-delay-2">
              {valueSummary.points.map((pt) => (
                <li key={pt.slug}>
                  <Link href={"/services/" + pt.slug} className="resume-item">
                    <span className="resume-item-title">{pt.title}</span>
                    <span className="resume-item-benefit">{pt.benefit}</span>
                    <span className="resume-item-more" aria-hidden="true"><ArrowRight /></span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="resume-ctas reveal reveal-delay-3">
              <a href={buildQuickWhatsAppHref()} className="btn btn-wa magnetic">
                <WhatsAppIcon size={18} />
                Discuter de mon besoin
              </a>
              <a href={buildSummaryShareHref("https://wallid-portfolio.vercel.app")} className="btn resume-share" target="_blank" rel="noopener noreferrer">
                Partager ce résumé
              </a>
            </div>
          </div>
        </section>

        <div className="trajets" aria-label="Trajets réguliers en transport">
          <div className="trajets-inner">
            {trajetsSeq.map((ville, i) => (
              <span className="trajets-item" key={"traj-" + i}>
                {(i === 0 || i === trajets.length) && <em>Trajets réguliers</em>}
                <span className="dot" aria-hidden="true" /> {ville}
              </span>
            ))}
          </div>
        </div>

        <div className="skills-band" aria-label="Compétences et savoir-faire">
          <div className="skills-inner">
            {skillsSeq.map((skill, i) => (
              <span className="skills-item" key={"skill-" + i}>
                <span className="diamond" aria-hidden="true" /> {skill}
              </span>
            ))}
          </div>
        </div>

        <section className="services" id="services" aria-labelledby="services-title">
          <div className="wrap">
            <div className="services-head reveal">
              <div>
                <div className="section-eyebrow">Ce que je fais</div>
                <h2 className="section-title" id="services-title">
                  Six domaines,<br />
                  <span className="serif">un seul</span> interlocuteur.
                </h2>
                <p className="section-lede">
                  Chaque domaine est une compétence réelle, exercée avec un point de contact unique : moi, sur WhatsApp.
                </p>
              </div>
              <div className="services-count" aria-hidden="true">06</div>
            </div>
            <div className="services-grid">
              {services.map((svc, i) => (
                <Link
                  key={svc.slug}
                  href={"/services/" + svc.slug}
                  className={"service reveal reveal-delay-" + i}
                  aria-label={svc.title + " — voir la page dédiée"}
                >
                  <div className="service-toggle" aria-hidden="true">
                    <svg className="icon-arrow-static" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                  <div className="service-photo">
                    <Image
                      src={svc.photo.src}
                      alt={svc.photo.alt}
                      fill
                      sizes="(min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="service-icon">{ServiceIcons[svc.slug]}</div>
                  <div className="service-idx">
                    <span>{svc.index} - {svc.title.split(" ")[0]}</span>
                  </div>
                  <h3>{svc.title}</h3>
                  <p>{svc.short}</p>
                  <div className="service-hint">Voir la page →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="about" id="apropos" aria-labelledby="about-title">
          <div className="wrap">
            <div className="about-grid">
              <div className="reveal">
                <div className="section-eyebrow">À propos</div>
                <h2 className="section-title" id="about-title">
                  Entrepreneur multi-services, <span className="serif">basé</span> à Abidjan.
                </h2>
                <p className="about-body">
                  Je m&apos;appelle Kazem Williame Wallid. J&apos;ai construit mon activité autour d&apos;une idée simple : offrir à mes clients, particuliers comme entreprises, un point de contact unique pour des besoins concrets et variés.
                </p>
                <p className="about-body">
                  Ma spécialité professionnelle est la <strong>gestion de stock</strong> — pour commerces, restaurants, entrepôts, partout où il y a de la marchandise à suivre. À côté, j&apos;exploite quatre autres domaines que je maîtrise : aviculture, transport, services techniques et digital. Peu importe la demande, je m&apos;engage sur ce que je peux tenir, et je le tiens.
                </p>
                <blockquote className="about-quote">Un profil polyvalent, des solutions concrètes.</blockquote>
                <div style={{ marginTop: 32 }}>
                  <a href="/a-propos" style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 22px", borderRadius: 14,
                    background: "var(--deep-900)", color: "var(--ivory-50)",
                    fontFamily: "var(--font-display-pv)", fontWeight: 700, fontSize: 15,
                    boxShadow: "0 8px 20px -6px rgba(26,20,8,0.4)",
                  }}>
                    Voir mon parcours complet →
                  </a>
                </div>
              </div>
              <div className="about-stage reveal reveal-delay-2" aria-label="Carte de visite qui se retourne">
                <div className="about-stage-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="7" width="18" height="14" rx="2" />
                    <path d="M8 3v4" />
                    <path d="M16 3v4" />
                    <path d="M3 11h18" />
                  </svg>
                  Ma carte de visite
                </div>
                <div className="bcard-flipper" aria-label="Recto verso animés">
                  <div className="bcard-face bcard-face--front">
                    <div className="brm-hi">
                      Salut !
                      <small>Je suis Wallid</small>
                    </div>
                    <div className="brm-mono-illu" aria-hidden="true">W</div>
                    <div className="brm-foot">
                      <span>Multi-services</span>
                      <span className="brm-handle">@wallidkazem</span>
                    </div>
                  </div>
                  <div className="bcard-face bcard-face--back">
                    <div className="bv-brand">Portfolio Wallid</div>
                    <div className="bv-qr" role="img" aria-label="QR code — scannez pour ouvrir wallid-portfolio.vercel.app">
                      <svg viewBox="0 0 37 37" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" aria-hidden="true">
                        <path fill="#fff" d="M0 0h37v37H0z" />
                        <path stroke="#000" d="M4 4.5h7m2 0h1m1 0h2m2 0h6m1 0h7M4 5.5h1m5 0h1m2 0h1m2 0h1m5 0h1m3 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m3 0h1m1 0h1m1 0h1m3 0h1m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m4 0h1m1 0h1m2 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h2m2 0h4m1 0h4m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m1 0h1m1 0h4m1 0h1m2 0h1m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h2m1 0h1m1 0h1m1 0h1m3 0h2M4 12.5h1m1 0h5m2 0h1m1 0h1m2 0h6m2 0h5M4 13.5h2m2 0h2m1 0h2m1 0h1m5 0h9m3 0h1M5 14.5h1m4 0h1m1 0h1m3 0h1m2 0h1m1 0h1m3 0h2m1 0h1M6 15.5h3m2 0h5m2 0h2m2 0h3m2 0h1m1 0h1m1 0h1M4 16.5h1m1 0h1m2 0h3m1 0h1m1 0h1m3 0h3m7 0h2M5 17.5h1m2 0h2m3 0h6m1 0h1m2 0h6m3 0h1M4 18.5h4m1 0h2m1 0h1m1 0h1m1 0h6m6 0h3M4 19.5h2m3 0h1m1 0h3m2 0h2m1 0h1m2 0h1m1 0h2m1 0h1m3 0h1M4 20.5h2m2 0h1m1 0h3m1 0h1m3 0h2m1 0h1m2 0h2m3 0h2M4 21.5h1m4 0h1m1 0h1m1 0h1m1 0h1m4 0h1m1 0h7m1 0h1m1 0h1M4 22.5h1m2 0h4m2 0h1m2 0h1m2 0h1m6 0h3m1 0h1M4 23.5h1m3 0h1m2 0h2m5 0h1m1 0h1m2 0h1m4 0h1m2 0h1M4 24.5h1m5 0h1m2 0h4m4 0h1m2 0h5m1 0h3M12 25.5h2m2 0h3m4 0h2m3 0h5M4 26.5h7m2 0h1m1 0h5m1 0h4m1 0h1m1 0h3M4 27.5h1m5 0h1m1 0h1m3 0h2m1 0h2m1 0h3m3 0h1m3 0h1M4 28.5h1m1 0h3m1 0h1m1 0h1m5 0h1m2 0h1m2 0h5m1 0h2M4 29.5h1m1 0h3m1 0h1m1 0h1m2 0h2m3 0h1m1 0h3m4 0h4M4 30.5h1m1 0h3m1 0h1m1 0h1m3 0h2m1 0h6m1 0h6M4 31.5h1m5 0h1m3 0h4m1 0h2m3 0h2m1 0h1m1 0h1m1 0h1M4 32.5h7m1 0h2m1 0h1m3 0h1m1 0h1m1 0h1m1 0h1m1 0h4" />
                      </svg>
                      <div className="bv-qr-label">Scannez ce code</div>
                    </div>
                    <div className="bv-name">
                      Kazem Williame Wallid
                      <span className="bv-msg">Un profil polyvalent,<br />des solutions concrètes.</span>
                    </div>
                    <div className="bv-contact">
                      <WhatsAppIcon size={16} />
                      {siteConfig.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="why" id="pourquoi" aria-labelledby="why-title">
          <div className="wrap">
            <div className="reveal">
              <div className="section-eyebrow">Pourquoi moi</div>
              <h2 className="section-title" id="why-title">
                Un interlocuteur direct, <span className="serif">pas</span> un standard.
              </h2>
            </div>
            <div className="why-grid">
              <div className="why-item reveal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <h3>Un seul contact</h3>
                <p>Vous parlez directement avec moi. Pas de standard, pas de commercial intermédiaire.</p>
              </div>
              <div className="why-item reveal reveal-delay-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <h3>Multi-services</h3>
                <p>Cinq domaines couverts, du produit frais au site internet. Un seul devis, un seul suivi.</p>
              </div>
              <div className="why-item reveal reveal-delay-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <h3>Ancré à Abidjan</h3>
                <p>Je connais le terrain. Je me déplace, j&apos;organise, je livre — dans toute la Côte d&apos;Ivoire.</p>
              </div>
              <div className="why-item reveal reveal-delay-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <h3>Devis rapide</h3>
                <p>Vous m&apos;écrivez sur WhatsApp, je vous réponds la journée même. Concret, sans jargon.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="process" aria-labelledby="process-title">
          <div className="wrap">
            <div className="reveal">
              <div className="section-eyebrow">Comment je travaille</div>
              <h2 className="section-title" id="process-title">
                Trois étapes, <span className="serif">un</span> engagement clair.
              </h2>
            </div>
            <div className="process-grid">
              {processSteps.map((step, i) => (
                <article key={step.index} className={"process-step reveal reveal-delay-" + i}>
                  <div className="process-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {i === 0 && <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />}
                      {i === 1 && (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>)}
                      {i === 2 && <polyline points="20 6 9 17 4 12" />}
                    </svg>
                  </div>
                  <h3>{step.title}</h3>
                  <p>
                    {i === 0 && "Un message WhatsApp avec ce dont vous avez besoin : produit, service, chantier, projet. Je vous lis dans la journée."}
                    {i === 1 && "Je vous envoie un devis structuré : prix, délais, ce qui est inclus. Zéro surprise en cours de route."}
                    {i === 2 && "Je livre ce qui a été convenu, quand ça a été convenu. Suivi WhatsApp jusqu'à la fin."}
                  </p>
                  <div className="lead-time">{step.detail}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq" aria-labelledby="faq-title">
          <div className="wrap">
            <div className="reveal">
              <div className="section-eyebrow">Questions fréquentes</div>
              <h2 className="section-title" id="faq-title">
                Les réponses aux <span className="serif">vraies</span> questions.
              </h2>
            </div>
            <div className="faq-grid">
              {faq.map((item, i) => (
                <details key={item.question} className={"faq-item reveal reveal-delay-" + (i % 5)}>
                  <summary>{item.question}</summary>
                  <div className="faq-answer">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="reviews" aria-labelledby="reviews-title">
          <div className="wrap">
            <div className="reveal">
              <div className="section-eyebrow">Avis</div>
              <h2 className="section-title" id="reviews-title">
                Ce que <span className="serif">disent</span> mes clients.
              </h2>
            </div>
            <div className="reviews-panel reveal reveal-delay-1">
              <div>
                <div className="reviews-stars" role="img" aria-label="Cinq étoiles">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <h3>
                  Vous m&apos;avez déjà fait confiance ? <span className="serif">Partagez</span> votre expérience.
                </h3>
                <p>
                  Vos avis honnêtes m&apos;aident à progresser et rassurent les prochains clients. Envoyez-moi votre témoignage sur WhatsApp, je le publierai ici avec votre accord.
                </p>
              </div>
              <a href={buildReviewWhatsAppHref()} className="reviews-btn magnetic" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} />
                Laisser un avis
              </a>
            </div>
            <div className="reviews-hint reveal reveal-delay-2">Les premiers témoignages arrivent bientôt</div>
            <div style={{ marginTop: 20, textAlign: "center" }} className="reveal reveal-delay-3">
              <a href="/avis" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-display-pv)", fontWeight: 700,
                fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--sun-700)", padding: "10px 18px",
                borderBottom: "1px solid var(--sun-700)",
              }}>
                Voir la page dédiée aux avis →
              </a>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <div className="reveal">
              <div className="section-eyebrow">Contact</div>
              <h2 className="section-title" id="contact-title">
                Trois canaux, <span className="serif">une</span> réponse rapide.
              </h2>
            </div>
            <div className="contact-hero reveal reveal-delay-1">
              <div>
                <div className="contact-hero-eyebrow">Le plus rapide</div>
                <h3>Un message WhatsApp et je vous réponds.</h3>
                <p>Devis, question, projet, le canal direct, sans intermediaire. Reponse dans la journée.</p>
              </div>
              <a href={buildQuickWhatsAppHref()} className="contact-hero-btn magnetic">
                <WhatsAppIcon size={20} />
                Écrire sur WhatsApp
              </a>
            </div>
            <div className="contact-alt reveal reveal-delay-2">
              <a href={"tel:+" + WA} className="contact-alt-item">
                <div className="contact-alt-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-alt-label">Voix à voix</div>
                  <span className="contact-alt-value">{siteConfig.phone}</span>
                </div>
              </a>
              <a href={"mailto:" + siteConfig.email} className="contact-alt-item">
                <div className="contact-alt-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="contact-alt-label">Écrit posé</div>
                  <span className="contact-alt-value">{siteConfig.email}</span>
                </div>
              </a>
            </div>
            <div className="contact-follow reveal reveal-delay-3">
              <div className="contact-alt-label">Suivez mon actualité</div>
              <SocialCards />
            </div>
          </div>
        </section>

        <section className="final" aria-labelledby="final-title">
          <div className="wrap reveal">
            <h2 id="final-title">
              Un besoin ? <span className="serif">Parlons-en</span> aujourd&apos;hui.
            </h2>
            <p>Une question, un devis, une idée qui traîne — la réponse la plus rapide passe par WhatsApp.</p>
            <div className="final-ctas">
              <a href={buildQuickWhatsAppHref()} className="btn btn-wa magnetic">
                <WhatsAppIcon size={18} />
                WhatsApp
              </a>
              <a href={"tel:+" + WA} className="btn btn-ghost">Appeler directement</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-wrap">
          <div>
            <div className="footer-brand">
              <span className="brand-dot" aria-hidden="true" />
              Kazem Williame Wallid
            </div>
            <div className="footer-role">Entrepreneur multi-services · Abidjan, Côte d&apos;Ivoire</div>
            <div className="footer-tag">Un profil polyvalent, des solutions concrètes.</div>
          </div>
          <FooterSocials />
        </div>
        <div className="footer-copy">© 2026 Kazem Williame Wallid — Abidjan, Côte d&apos;Ivoire.</div>
      </footer>

      <button
        className={"mini-brand" + (pastHero ? " visible" : "")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
        type="button"
      >
        <span className="mini-brand-dot" aria-hidden="true" />
        Wallid Kazem
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>


      <div className={"mobile-bar" + (pastHeroFar ? " visible" : "")} role="navigation" aria-label="Actions rapides">
        <a href={buildQuickWhatsAppHref()} className="mobile-bar-btn mobile-bar-btn--wa">
          <WhatsAppIcon size={22} />
          WhatsApp
        </a>
        <a href={"tel:+" + WA} className="mobile-bar-btn mobile-bar-btn--call">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Appeler
        </a>
        <button type="button" className="mobile-bar-btn mobile-bar-btn--mail" onClick={copyEmail} aria-label="Copier mon email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-10 6L2 7" />
          </svg>
          Copier email
        </button>
      </div>
      <div className={"copy-toast" + (copyToast ? " show" : "")} role="status" aria-live="polite">
        Email copié ✓
      </div>


    </div>
  );
}











