"use client";

import styles from "./Stats.module.css";
import Reveal from "./Reveal";
import useCountUp from "./useCountUp";

const STATS = [
  { target: 4, suffix: "+", label: "Années d'existence" },
  { target: 80, suffix: "+", label: "Projets réalisés" },
  { target: 100, suffix: "%", label: "Clients satisfaits" },
  { target: 4, suffix: "", label: "Membres dans l'équipe" },
];

function StatItem({ stat, delay }) {
  const [ref, value] = useCountUp(stat.target);

  return (
    <Reveal delay={delay}>
      <div ref={ref} className={styles.item}>
        <p className={styles.value}>
          {value}
          {stat.suffix}
        </p>
        <p className={styles.label}>{stat.label}</p>
      </div>
    </Reveal>
  );
}

export default function Stats() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
