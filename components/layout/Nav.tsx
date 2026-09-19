"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "#services", label: "Services" },
  { href: "#a-propos", label: "À propos" },
  { href: "#experience", label: "Parcours" },
  { href: "#projets", label: "Réalisations" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    let raf = 0;
    const check = () => setScrolled(window.scrollY > 20);
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        check();
        raf = 0;
      });
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  React.useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-slow ease-out-expo",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-1 py-1 -mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`${siteConfig.name} — accueil`}
        >
          <Logo />
          <span className="font-serif text-lg leading-none tracking-tight">
            <span className="text-foreground">{siteConfig.firstName}</span>
            <span className="text-muted ml-1.5 italic">{siteConfig.lastName}</span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm text-muted transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="/devis" size="sm" variant="primary" className="hidden sm:inline-flex">
            Demander un devis
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-elev text-foreground transition-all duration-base hover:bg-surface hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bottom-0 bg-background border-t border-border transition-all duration-base ease-out-expo",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav aria-label="Navigation mobile" className="container-wide pt-6 pb-24">
          <ul className="flex flex-col divide-y divide-border">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-lg text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                >
                  {l.label}
                  <span className="text-muted text-sm">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink href="/devis" size="lg" variant="primary" onClick={() => setOpen(false)}>
              Demander un devis
            </ButtonLink>
            <ButtonLink
              href={`https://wa.me/${siteConfig.whatsapp}`}
              size="lg"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              WhatsApp direct
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background font-serif text-base leading-none"
      aria-hidden="true"
    >
      W
    </span>
  );
}
