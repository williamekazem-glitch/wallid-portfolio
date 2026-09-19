import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "muted" | "success";

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface text-foreground border-border",
  accent: "bg-accent-soft text-accent border-transparent",
  muted: "bg-transparent text-muted border-border",
  success: "bg-success/10 text-success border-transparent",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
