"use client";

import * as React from "react";
import { Send, CheckCircle2, MessageCircle, Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

// Slim type — QuoteForm only needs identity + label. Passing full Service (with
// lucide icon components = functions) from a Server Component to a Client
// Component fails serialization.
export type QuoteFormService = {
  slug: string;
  title: string;
};

interface QuoteFormProps {
  services: QuoteFormService[];
  preSelected?: string;
}

type Budget = "" | "moins-500" | "500-2000" | "2000-10000" | "10000+" | "a-discuter";

export function QuoteForm({ services, preSelected }: QuoteFormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [service, setService] = React.useState(preSelected || "");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [budget, setBudget] = React.useState<Budget>("");
  const [message, setMessage] = React.useState("");

  const summary = React.useMemo(() => {
    const svc = services.find((s) => s.slug === service);
    const parts = [
      `Bonjour Wallid,`,
      ``,
      `Je souhaite un devis pour : ${svc?.title || "un service"}.`,
      ``,
      `Nom : ${name || "-"}`,
      `Téléphone : ${phone || "-"}`,
      email ? `Email : ${email}` : "",
      budget ? `Budget : ${budget}` : "",
      ``,
      `Description :`,
      message || "-",
    ].filter(Boolean);
    return parts.join("\n");
  }, [service, name, phone, email, budget, message, services]);

  const canSubmit =
    service.length > 0 && name.length > 1 && (phone.length > 5 || email.includes("@")) && message.length > 5;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(summary)}`;
  const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `Devis — ${services.find((s) => s.slug === service)?.title || "demande"}`
  )}&body=${encodeURIComponent(summary)}`;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-background-elev p-8 sm:p-10">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="font-serif text-2xl text-foreground">
          Votre demande est prête à être envoyée.
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Choisissez comment vous préférez la transmettre. J'ouvre soit WhatsApp,
          soit votre application email — le message est déjà rédigé.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-base ease-out-expo hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Envoyer sur WhatsApp
          </a>
          <a
            href={mailtoUrl}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-strong bg-transparent px-5 py-3 text-sm font-medium text-foreground transition-all duration-base ease-out-expo hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Envoyer par email
          </a>
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-muted underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
        >
          Modifier ma demande
        </button>

        <details className="mt-8 rounded-lg border border-border bg-background p-4">
          <summary className="cursor-pointer text-sm font-medium text-foreground">
            Aperçu du message
          </summary>
          <pre className="mt-3 whitespace-pre-wrap text-xs text-muted font-mono">
            {summary}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 rounded-2xl border border-border bg-background-elev p-6 sm:p-8"
      noValidate
    >
      <Select
        label="Quel service ?"
        required
        value={service}
        onChange={(e) => setService(e.target.value)}
        options={[
          { value: "", label: "— Sélectionner un service —" },
          ...services.map((s) => ({ value: s.slug, label: s.title })),
        ]}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Votre nom"
          placeholder="Prénom Nom"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <Input
          label="Téléphone"
          type="tel"
          placeholder="+000 00 00 00 00"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          hint="Ou email — au moins un des deux"
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="vous@exemple.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      <Select
        label="Budget approximatif"
        value={budget}
        onChange={(e) => setBudget(e.target.value as Budget)}
        options={[
          { value: "", label: "— Optionnel —" },
          { value: "moins-500", label: "Moins de 500" },
          { value: "500-2000", label: "500 – 2 000" },
          { value: "2000-10000", label: "2 000 – 10 000" },
          { value: "10000+", label: "Plus de 10 000" },
          { value: "a-discuter", label: "À discuter ensemble" },
        ]}
        hint="Aide à orienter la proposition (unité selon votre monnaie)"
      />

      <Textarea
        label="Décrivez votre projet"
        placeholder="Ex : Rénovation d'une pièce de 20 m², refaire le sol, la peinture, la plomberie…"
        required
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex items-start gap-3 rounded-lg bg-surface p-4 text-xs text-muted leading-relaxed">
        <span
          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
          aria-hidden="true"
        >
          i
        </span>
        <p>
          Cette demande n'envoie rien automatiquement. Après validation, vous choisirez
          d'envoyer sur WhatsApp ou par email — vous gardez le contrôle.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-subtle">
          * champs obligatoires
        </p>
        <Button type="submit" disabled={!canSubmit} size="lg">
          <Send className="h-4 w-4" aria-hidden="true" />
          Préparer ma demande
        </Button>
      </div>
    </form>
  );
}
