import styles from "./ExpertiseVisual.module.css";

// Placeholder photo en attendant de vraies images par expertise : réutilise
// la photo caméléon déjà présente sur le site (Hero/ChameleonReveal) plutôt
// que d'inventer un visuel générique. Cadrage propre à chaque catégorie
// (ordre fixe de lib/content.js EXPERTISES) pour que chaque bloc ait une
// identité visuelle distincte plutôt qu'une simple variation aléatoire.
const CROPS = [
  { position: "15% 25%", scale: 1.15 }, // conseil stratégique — plan large, prise de recul
  { position: "55% 10%", scale: 1.35 }, // création — cadrage serré sur la texture/motif
  { position: "70% 60%", scale: 1.05 }, // digital — angle net, peu de zoom
  { position: "30% 70%", scale: 1.25 }, // édition et print — grain, matière
  { position: "45% 40%", scale: 1.45 }, // événementiel — le plus rapproché, immersif
];

export default function ExpertiseVisual({ index, className }) {
  const crop = CROPS[index % CROPS.length];

  return (
    <div className={`${styles.visual} ${className || ""}`}>
      <img
        src="/chameleon.jpg"
        alt=""
        aria-hidden="true"
        style={{ objectPosition: crop.position, "--zoom": crop.scale }}
      />
      <span className={styles.scrim} aria-hidden="true" />
    </div>
  );
}
