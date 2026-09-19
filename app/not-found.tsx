import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center pt-32 pb-20">
      <div className="container-tight text-center">
        <p className="eyebrow justify-center">Erreur 404</p>
        <h1 className="mt-6 font-serif text-display-xl text-foreground">
          Page introuvable.
        </h1>
        <p className="mt-4 text-lg text-muted">
          Ce lien ne mène nulle part — mais mes services, eux, sont bien là.
        </p>
        <div className="mt-8">
          <ButtonLink href="/" size="lg">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour à l'accueil
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
