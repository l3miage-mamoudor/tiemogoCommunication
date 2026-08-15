"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    function update() {
      ticking = false;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      const progress = max > 0 ? (scrollTop / max) * 100 : 0;
      bar.style.transform = `scaleX(${progress / 100})`;
      document.documentElement.style.setProperty("--scroll-hue", String(progress / 100));
    }

    // Sur iOS Safari, l'événement "scroll" peut se déclencher bien plus
    // souvent que 60fps pendant un scroll rapide. Écrire une custom
    // property à chaque déclenchement force un recalcul de style à chaque
    // fois (ici, le dégradé du halo caméléon qui en dépend) — assez pour
    // faire perdre au navigateur la synchro du header fixe pendant le
    // scroll. On limite donc la mise à jour à une fois par frame d'affichage.
    function handleScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
