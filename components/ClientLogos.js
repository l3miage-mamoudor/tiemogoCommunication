import Marquee from "./Marquee";
import { client } from "@/lib/sanity/client";
import { clientsQuery } from "@/lib/sanity/queries";

// Démo — remplace par les vrais noms clients dès qu'ils sont ajoutés dans le
// Studio (/studio). Disparaît automatiquement dès qu'un premier client réel
// y est ajouté.
const FALLBACK_CLIENTS = [
  "Structure Kadi",
  "Maison Ferrand",
  "Groupe Solène",
  "Atelier Voss",
  "Fondation Ardra",
];

async function getClients() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_CLIENTS;
  try {
    const data = await client.fetch(clientsQuery, {}, { next: { revalidate: 60 } });
    return data?.length ? data.map((c) => c.name) : FALLBACK_CLIENTS;
  } catch {
    return FALLBACK_CLIENTS;
  }
}

export default async function ClientLogos() {
  const clients = await getClients();
  return <Marquee items={clients} label="Ils nous font confiance" />;
}
