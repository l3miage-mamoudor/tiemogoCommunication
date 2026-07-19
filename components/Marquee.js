import styles from "./Marquee.module.css";
import { EXPERTISES } from "@/lib/content";
import { hueForIndex } from "@/lib/palette";

const DEFAULT_WORDS = EXPERTISES.map((expertise) => expertise.title);

// Bandeau défilant réutilisable (mots-clés d'expertises par défaut, ou toute
// autre liste — voir ClientLogos.js qui lui passe les noms clients).
export default function Marquee({ items = DEFAULT_WORDS, label }) {
  const track = [...items, ...items];

  return (
    <div className={styles.wrap} aria-hidden="true">
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.track}>
        {track.map((word, i) => (
          <span key={i} className={styles.item}>
            {word}
            <span className={styles.dot} style={{ color: hueForIndex(i) }}>
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
