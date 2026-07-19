import styles from "./Values.module.css";
import Reveal from "./Reveal";
import { VALUES } from "@/lib/content";

export default function Values() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Nos valeurs</p>
        <h2 className={styles.title}>Ce qui guide chacune de nos décisions</h2>

        <div className={styles.grid}>
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 80}>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>{value.title}</h3>
                <p className={styles.lead}>{value.lead}</p>
                <p className={styles.text}>{value.text}</p>
                <p className={styles.culture}>{value.culture}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
