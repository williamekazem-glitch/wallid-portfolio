"use client";

import { useEffect, useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

// Formulaire de devis sans serveur : il range la demande puis ouvre WhatsApp
// avec un message complet. Rien n'est envoyé ni stocké par le site.

const SERVICES: { slug: string; label: string; besoin: string; quantite: string }[] = [
  { slug: "aviculture", label: "Poulets & œufs", besoin: "Ex. : poulets de chair pour un événement, poussins Kuroiler, œufs de table…", quantite: "Ex. : 50 poulets, 10 plaquettes" },
  { slug: "transport", label: "Voyages & déplacements", besoin: "Ex. : aller-retour Abidjan – Assinie, livraison de marchandise…", quantite: "Ex. : 3 personnes, 2 colis" },
  { slug: "technique", label: "Travaux & sécurité", besoin: "Ex. : rénovation d'une cuisine, pose de caméras, porte en fer…", quantite: "Ex. : 2 pièces, 4 caméras" },
  { slug: "gestion", label: "Gestion de stock", besoin: "Ex. : inventaire de boutique, mise en place d'un suivi des stocks…", quantite: "Ex. : 1 boutique, 300 articles" },
  { slug: "digital", label: "Site & réseaux", besoin: "Ex. : site vitrine pour mon restaurant, gestion de ma page Facebook…", quantite: "Ex. : 5 pages, 1 application" },
  { slug: "sourcing", label: "Import Chine", besoin: "Ex. : machines, pièces, matériel — joignez une photo dans WhatsApp", quantite: "Ex. : 20 unités, 1 conteneur" },
];

const DELAIS = ["Dès que possible", "Cette semaine", "Ce mois-ci", "Pas pressé", "Date précise (je la donne dans le message)"];

export function DevisForm() {
  const [service, setService] = useState("");
  const [besoin, setBesoin] = useState("");
  const [quantite, setQuantite] = useState("");
  const [lieu, setLieu] = useState("");
  const [delai, setDelai] = useState(DELAIS[0]);
  const [nom, setNom] = useState("");
  const [errors, setErrors] = useState<{ service?: string; besoin?: string }>({});

  // Service présélectionné depuis un lien : /devis?service=aviculture
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("service");
    if (s && SERVICES.some((x) => x.slug === s)) setService(s);
  }, []);

  const current = SERVICES.find((s) => s.slug === service);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!service) next.service = "Choisissez le service qui vous intéresse.";
    if (besoin.trim().length < 5) next.besoin = "Décrivez votre besoin en quelques mots.";
    setErrors(next);
    if (next.service || next.besoin) {
      document.getElementById(next.service ? "devis-service" : "devis-besoin")?.focus();
      return;
    }
    const details = [
      "• Service : " + current!.label,
      "• Besoin : " + besoin.trim(),
      quantite.trim() ? "• Quantité : " + quantite.trim() : null,
      lieu.trim() ? "• Lieu : " + lieu.trim() : null,
      "• Délai : " + delai,
    ].filter(Boolean);
    const text = [
      "Bonjour Wallid, je souhaite un devis.",
      "",
      ...details,
      ...(nom.trim() ? ["", "Nom : " + nom.trim()] : []),
    ].join("\n");
    window.location.href = "https://wa.me/" + siteConfig.whatsapp + "?text=" + encodeURIComponent(text);
  };

  return (
    <form className="devis-form" onSubmit={onSubmit} noValidate>
      <fieldset className="devis-field" aria-describedby={errors.service ? "devis-service-err" : undefined}>
        <legend className="devis-label">1. Quel service ? <span aria-hidden="true">*</span></legend>
        <div className="devis-choices" id="devis-service" tabIndex={-1}>
          {SERVICES.map((s) => (
            <label key={s.slug} className={"devis-choice" + (service === s.slug ? " is-on" : "")}>
              <input
                type="radio"
                name="service"
                value={s.slug}
                checked={service === s.slug}
                onChange={() => { setService(s.slug); setErrors((x) => ({ ...x, service: undefined })); }}
              />
              {s.label}
            </label>
          ))}
        </div>
        {errors.service && <p className="devis-error" id="devis-service-err" role="alert">{errors.service}</p>}
      </fieldset>

      <div className="devis-field">
        <label className="devis-label" htmlFor="devis-besoin">2. Votre besoin <span aria-hidden="true">*</span></label>
        <textarea
          id="devis-besoin"
          className="devis-input"
          rows={4}
          value={besoin}
          onChange={(e) => { setBesoin(e.target.value); if (errors.besoin) setErrors((x) => ({ ...x, besoin: undefined })); }}
          placeholder={current?.besoin || "Décrivez en quelques mots ce dont vous avez besoin."}
          aria-invalid={errors.besoin ? true : undefined}
          aria-describedby={errors.besoin ? "devis-besoin-err" : undefined}
          required
        />
        {errors.besoin && <p className="devis-error" id="devis-besoin-err" role="alert">{errors.besoin}</p>}
      </div>

      <div className="devis-row">
        <div className="devis-field">
          <label className="devis-label" htmlFor="devis-quantite">Quantité <span className="devis-opt">(facultatif)</span></label>
          <input id="devis-quantite" className="devis-input" value={quantite} onChange={(e) => setQuantite(e.target.value)} placeholder={current?.quantite || "Ex. : 50 unités"} />
        </div>
        <div className="devis-field">
          <label className="devis-label" htmlFor="devis-lieu">Lieu <span className="devis-opt">(facultatif)</span></label>
          <input id="devis-lieu" className="devis-input" value={lieu} onChange={(e) => setLieu(e.target.value)} placeholder="Ex. : Cocody, Yopougon, Bassam…" list="devis-zones" autoComplete="address-level2" />
          <datalist id="devis-zones">
            {["Abidjan – Cocody", "Abidjan – Yopougon", "Abidjan – Marcory", "Abidjan – Plateau", "Abidjan – Riviera", "Abidjan – Treichville", "Abidjan – Adjamé", "Abidjan – Abobo", "Grand-Bassam", "Assinie", "Bingerville", "Yamoussoukro", "Bouaké"].map((z) => <option key={z} value={z} />)}
          </datalist>
        </div>
      </div>

      <div className="devis-row">
        <div className="devis-field">
          <label className="devis-label" htmlFor="devis-delai">Pour quand ?</label>
          <select id="devis-delai" className="devis-input" value={delai} onChange={(e) => setDelai(e.target.value)}>
            {DELAIS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="devis-field">
          <label className="devis-label" htmlFor="devis-nom">Votre nom <span className="devis-opt">(facultatif)</span></label>
          <input id="devis-nom" className="devis-input" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex. : Fatou K." autoComplete="name" />
        </div>
      </div>

      <button type="submit" className="btn btn-wa devis-submit">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        Envoyer ma demande sur WhatsApp
      </button>
      <p className="devis-note">
        WhatsApp s&apos;ouvre avec votre demande déjà rédigée : vous n&apos;avez plus qu&apos;à l&apos;envoyer. Ajoutez des photos si besoin. Devis gratuit, sans engagement.
      </p>
    </form>
  );
}
