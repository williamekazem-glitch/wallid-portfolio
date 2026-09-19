import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium select-none " +
  "transition-all duration-base ease-out-expo " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring " +
  "active:scale-[0.98] whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 shadow-sm " +
    "shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.12),0_1px_2px_0_rgb(0_0_0_/_0.08)]",
  secondary:
    "bg-surface text-foreground border border-border hover:bg-surface-hover hover:border-border-strong",
  ghost: "text-foreground hover:bg-surface",
  outline:
    "bg-transparent text-foreground border border-border-strong hover:bg-surface",
  accent:
    "bg-accent text-accent-fg hover:bg-accent-hover shadow-sm " +
    "shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.16),0_1px_2px_0_rgb(0_0_0_/_0.08)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm rounded-md",
  md: "h-11 px-5 text-sm rounded-lg",
  lg: "h-13 px-7 text-base rounded-lg py-3.5",
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const isExternal = external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const cls = cn(base, variants[variant], sizes[size], className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        target={external || href.startsWith("http") ? "_blank" : undefined}
        rel={external || href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...props}>
      {children}
    </Link>
  );
}
