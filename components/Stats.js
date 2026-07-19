import styles from "./Stats.module.css";
import Reveal from "./Reveal";

// Chiffres à remplacer par les vraies données du cabinet dès qu'elles existent
const STATS = [
  { value: "12+", label: "Années d'existence" },
  { value: "80+", label: "Projets réalisés" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "6", label: "Membres dans l'équipe" },
];

export default function Stats() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className={styles.item}>
                <p className={styles.value}>{stat.value}</p>
                <p className={styles.label}>{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
