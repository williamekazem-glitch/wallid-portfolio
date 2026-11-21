import type { Metadata } from "next";
import HomePage from "../page";

// Adresse imprimée dans le QR code des cartes de visite (à partir de la 2e série).
// Même contenu que l'accueil ; l'adresse séparée permet de compter, dans les
// statistiques, les visites qui viennent d'un scan de carte.
// Non indexée et canonique vers « / » pour ne pas dupliquer l'accueil sur Google.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default HomePage;
