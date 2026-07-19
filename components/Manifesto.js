import Link from "next/link";
import styles from "./Manifesto.module.css";
import { ORIGIN_STORY } from "@/lib/content";

export default function Manifesto() {
  return (
    <section className={`section ${styles.manifesto}`}>
      <div className={`container ${styles.frame}`}>
        <span className={styles.corner} data-pos="tl" aria-hidden="true" />
        <span className={styles.corner} data-pos="tr" aria-hidden="true" />
        <span className={styles.corner} data-pos="bl" aria-hidden="true" />
        <span className={styles.corner} data-pos="br" aria-hidden="true" />

        <p className={styles.wordmark}>tiemogo communication</p>
        <p className={styles.lead}>{ORIGIN_STORY.lead}</p>
        {ORIGIN_STORY.paragraphs.map((paragraph, i) => (
          <p key={i} className={styles.text}>
            {paragraph}
          </p>
        ))}
        <Link href="/agence" className="btn btn--pill">
          En savoir +
        </Link>
      </div>
    </section>
  );
}
