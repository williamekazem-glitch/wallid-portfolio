import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Channel = {
  index: string;
  eyebrow: string;
  title: string;
  desc: string;
  meta: string;
  metaValue: string;
  cta: string;
  href: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

export function Contact() {
  const channels: Channel[] = [
    {
      index: "01",
      eyebrow: "Le plus rapide",
      title: "WhatsApp",
      desc: "Réponse en journée",
      meta: "Numéro",
      metaValue: siteConfig.phone,
      cta: "Écrire sur WhatsApp",
      href: `https://wa.me/${siteConfig.whatsapp}?text=Bonjour%20Williame`,
      icon: <MessageCircle className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />,
      highlight: true,
    },
    {
      index: "02",
      eyebrow: "Voix à voix",
      title: "Téléphone",
      desc: "Pour les urgences",
      meta: "Numéro",
      metaValue: siteConfig.phone,
      cta: "Appeler",
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
      icon: <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />,
    },
    {
      index: "03",
      eyebrow: "Écrit posé",
      title: "Email",
      desc: "Idéal pour un brief détaillé",
      meta: "Adresse",
      metaValue: siteConfig.email,
      cta: "Envoyer un email",
      href: `mailto:${siteConfig.email}`,
      icon: <Mail className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 lg:py-28 scroll-mt-24"
      aria-labelledby="contact-title"
    >
      <div className="container-wide">
        {/* Header */}
        <header className="mb-14 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Contact
            </span>
          </div>
          <h2
            id="contact-title"
            className="font-serif text-display-lg text-balance text-foreground leading-[1.08]"
          >
            Parlons de votre projet<span className="text-accent">.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted">
            Un besoin précis, une demande de service ou simplement une question ?
            Contactez-moi directement.
          </p>
        </header>

        {/* 3 contact cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 mb-12 md:mb-16">
          {channels.map((c) => (
            <ChannelCard key={c.index} channel={c} />
          ))}
        </div>

        {/* Devis form CTA */}
        <div className="rounded-2xl border border-border bg-background-elev p-8 sm:p-10 md:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3 className="font-serif text-2xl sm:text-3xl leading-tight text-foreground">
                Vous préférez un devis structuré<span className="text-accent">&nbsp;?</span>
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                Décrivez votre besoin dans un court formulaire — je reviens vers vous
                avec les informations nécessaires.
              </p>
            </div>
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.12),0_1px_2px_0_rgb(0_0_0_/_0.08)] transition-all duration-base ease-out-expo hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] whitespace-nowrap"
            >
              Ouvrir le formulaire
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelCard({ channel }: { channel: Channel }) {
  const {
    index,
    eyebrow,
    title,
    desc,
    meta,
    metaValue,
    cta,
    href,
    icon,
    highlight,
  } = channel;

  const isExternal = href.startsWith("http");

  return (
    <article
      className={cn(
        "relative flex flex-col justify-between rounded-2xl border p-7 md:p-8 transition-all duration-base ease-out-expo",
        highlight
          ? "bg-foreground text-background border-foreground shadow-sm hover:-translate-y-0.5"
          : "bg-background-elev border-border shadow-xs hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md"
      )}
    >
      <div>
        {/* number + icon */}
        <div className="mb-8 flex items-center justify-between">
          <span
            className={cn(
              "font-mono text-xs tracking-wider tabular-nums",
              highlight ? "text-background/50" : "text-subtle"
            )}
          >
            {index}
          </span>
          <span
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl",
              highlight ? "bg-background/10 text-accent" : "bg-surface text-foreground"
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        </div>

        {/* eyebrow */}
        <span
          className={cn(
            "mb-1.5 block text-xs font-medium uppercase tracking-[0.18em]",
            highlight ? "text-accent" : "text-muted"
          )}
        >
          {eyebrow}
        </span>

        {/* title */}
        <h3
          className={cn(
            "mb-2 text-2xl font-medium tracking-tight",
            highlight ? "text-background" : "text-foreground"
          )}
        >
          {title}
        </h3>

        {/* description */}
        <p
          className={cn(
            "mb-6 text-sm leading-relaxed",
            highlight ? "text-background/70" : "text-muted"
          )}
        >
          {desc}
        </p>
      </div>

      <div>
        {/* meta with separator */}
        <div
          className={cn(
            "mb-6 border-t pt-5",
            highlight ? "border-background/10" : "border-border"
          )}
        >
          <span
            className={cn(
              "mb-1 block text-xs",
              highlight ? "text-background/40" : "text-subtle"
            )}
          >
            {meta}
          </span>
          <span
            className={cn(
              "block text-sm tabular-nums tracking-wide",
              highlight ? "text-background/85" : "text-foreground/80"
            )}
          >
            {metaValue}
          </span>
        </div>

        {/* CTA */}
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={cn(
            "inline-flex w-full items-center justify-between rounded-xl px-5 py-3 text-sm font-medium transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            highlight
              ? "bg-accent text-accent-fg hover:bg-accent-hover focus-visible:ring-offset-foreground shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.16),0_1px_2px_0_rgb(0_0_0_/_0.08)]"
              : "bg-background border border-border-strong text-foreground hover:bg-surface focus-visible:ring-offset-background"
          )}
        >
          <span>{cta}</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
