import styles from "./Marquee.module.css";
import { EXPERTISES } from "@/lib/content";

const WORDS = EXPERTISES.map((expertise) => expertise.title);

export default function Marquee() {
  const track = [...WORDS, ...WORDS];

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {track.map((word, i) => (
          <span key={i} className={styles.item}>
            {word}
            <span className={styles.dot}>●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
