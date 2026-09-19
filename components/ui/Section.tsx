import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  tight?: boolean;
  align?: "left" | "center";
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  tight,
  align = "left",
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 sm:py-20 lg:py-28 scroll-mt-24",
        className
      )}
      aria-labelledby={id ? `${id}-title` : undefined}
      {...props}
    >
      <div className={cn(tight ? "container-tight" : "container-wide")}>
        {(eyebrow || title || description) && (
          <header
            className={cn(
              "mb-12 sm:mb-16 flex flex-col gap-4 max-w-3xl",
              align === "center" && "mx-auto text-center items-center"
            )}
          >
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && (
              <h2
                id={id ? `${id}-title` : undefined}
                className="font-serif text-display-lg text-balance text-foreground"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg leading-relaxed text-muted text-pretty">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
