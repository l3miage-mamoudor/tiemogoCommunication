import Image from "next/image";
import styles from "./RotatingBadge.module.css";

const RING_TEXT = "AGENCE DE CONSEIL EN COMMUNICATION";

// Version vectorielle du sceau de marque : un simple filet fin qui tourne
// autour du logomark, plutôt qu'un disque plein façon tampon artisanal —
// plus proche d'une marque kinétique que d'un sceau de confiserie.
export default function RotatingBadge({ compact = false }) {
  const size = compact ? 128 : 160;
  const markSize = compact ? 44 : 54;

  return (
    <div className={`${styles.badge} ${compact ? styles.compact : ""}`} aria-hidden="true">
      <svg className={styles.ring} viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <path id="badgeCircle" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
        </defs>
        <circle cx="100" cy="100" r="96" className={styles.outline} />
        <text className={styles.ringText}>
          <textPath href="#badgeCircle" startOffset="0%">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>
      <Image src="/logo.png" alt="" width={markSize} height={markSize} className={styles.mark} />
    </div>
  );
}
