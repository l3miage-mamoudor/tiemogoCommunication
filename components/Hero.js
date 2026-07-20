"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RotatingBadge from "./RotatingBadge";
import ChameleonAura from "./ChameleonAura";
import styles from "./Hero.module.css";
import { hueForIndex } from "@/lib/palette";

// Verbes alignés sur le positionnement réel de Tiemogo : adaptation et sur-mesure
const VERBS = ["s'adapter.", "se différencier.", "marquer.", "durer."];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % VERBS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className={styles.hero}>
      <ChameleonAura />
      <div className={`container ${styles.inner}`}>
        <div className={styles.topRow}>
          <RotatingBadge compact />
        </div>

        <h1 className={styles.headline}>
          Une marque ne parle pas.
          <br />
          Elle sait{" "}
          <span className={styles.verbWrap} aria-live="polite">
            <span
              key={index}
              className={styles.verb}
              style={{ color: hueForIndex(index) }}
            >
              {VERBS[index]}
            </span>
          </span>
        </h1>

        <div className={styles.bottom}>
          <div className={styles.statsInline}>
            <div>
              <p className={styles.statValue}>12+</p>
              <p className={styles.statLabel}>
                Années
                <br />
                d&apos;expérience
              </p>
            </div>
            <div>
              <p className={styles.statValue}>80+</p>
              <p className={styles.statLabel}>
                Projets
                <br />
                réalisés
              </p>
            </div>
          </div>

          <div className={styles.copy}>
            <p className={styles.lead}>
              Nous construisons une communication sur mesure, à l'image de vos
              besoins : stratégie, identité de marque, relations presse et
              communication digitale.
            </p>
            <div className={styles.actions}>
              <Link href="/contact" className="btn btn--pill">
                Parlons de votre projet
              </Link>
              <Link href="/realisations" className="btn btn--outline-dark">
                Voir nos réalisations
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span>Scroll</span>
        <span className={styles.scrollLine}>
          <span className={styles.scrollDot} />
        </span>
      </div>
    </section>
  );
}
