import styles from "./ClientLogos.module.css";

// Démo — remplace par les vrais noms/logos clients dès qu'ils sont disponibles
const CLIENTS = [
  "Structure Kadi",
  "Maison Ferrand",
  "Groupe Solène",
  "Atelier Voss",
  "Fondation Ardra",
];

export default function ClientLogos() {
  return (
    <div className={styles.wrap}>
      <div className="container">
        <p className={styles.label}>Ils nous font confiance</p>
        <div className={styles.row}>
          {CLIENTS.map((name) => (
            <span key={name} className={styles.item}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
