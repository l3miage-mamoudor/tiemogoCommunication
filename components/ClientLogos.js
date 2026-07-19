import Marquee from "./Marquee";

// Démo — remplace par les vrais noms/logos clients dès qu'ils sont disponibles
const CLIENTS = [
  "Structure Kadi",
  "Maison Ferrand",
  "Groupe Solène",
  "Atelier Voss",
  "Fondation Ardra",
];

export default function ClientLogos() {
  return <Marquee items={CLIENTS} label="Ils nous font confiance" />;
}
