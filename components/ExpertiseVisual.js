import styles from "./ExpertiseVisual.module.css";

// Placeholder photo en attendant de vraies images par expertise : réutilise
// la photo caméléon déjà présente sur le site (Hero/ChameleonReveal) plutôt
// que d'inventer un visuel générique. Cadrage et intensité du traitement
// varient par index pour que les 5 blocs ne soient pas identiques.
const CROPS = ["25% 20%", "60% 15%", "40% 55%", "70% 35%", "30% 65%"];

export default function ExpertiseVisual({ index, className }) {
  return (
    <div className={`${styles.visual} ${className || ""}`}>
      <img
        src="/chameleon.jpg"
        alt=""
        aria-hidden="true"
        style={{ objectPosition: CROPS[index % CROPS.length] }}
      />
      <span className={styles.scrim} aria-hidden="true" />
    </div>
  );
}
