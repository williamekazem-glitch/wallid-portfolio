import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=Bonjour%20Wallid%2C%20je%20souhaite%20un%20renseignement`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all duration-base ease-out-expo hover:scale-105 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
