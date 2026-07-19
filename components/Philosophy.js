import ChameleonMark from "./ChameleonMark";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
  return (
    <section className={styles.band}>
      <div className={`container ${styles.inner}`}>
        <ChameleonMark size={48} className={styles.icon} />
        <p className={styles.text}>
          Comme le caméléon, symbole d'adaptation et d'intelligence, nous
          prenons le temps de comprendre votre activité, votre vision et vos
          objectifs avant de construire une stratégie unique — parfaitement
          alignée avec votre identité, sans jamais la diluer.
        </p>
      </div>
    </section>
  );
}
