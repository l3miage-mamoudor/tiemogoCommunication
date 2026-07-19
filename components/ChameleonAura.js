"use client";

import { useEffect, useRef } from "react";
import styles from "./ChameleonAura.module.css";

// Halo de couleur qui suit le curseur avec un léger retard, comme un
// caméléon qui s'adapte à la présence de l'utilisateur — écho direct au
// positionnement "nous devenons vous pour mieux vous révéler". Reste en
// dérive lente (CSS pure) sur tactile / reduced-motion, jamais figé.
export default function ChameleonAura() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) {
      root.classList.add(styles.driftOnly);
      return;
    }

    let targetX = 60;
    let targetY = 30;
    let x = targetX;
    let y = targetY;
    let rafId;

    function handleMove(e) {
      const rect = root.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    }

    function loop() {
      x += (targetX - x) * 0.035;
      y += (targetY - y) * 0.035;
      root.style.setProperty("--ax", `${x}%`);
      root.style.setProperty("--ay", `${y}%`);
      root.style.setProperty("--bx", `${100 - x}%`);
      root.style.setProperty("--by", `${100 - y}%`);
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", handleMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.aura} aria-hidden="true">
      <span className={`${styles.blob} ${styles.blobA}`} />
      <span className={`${styles.blob} ${styles.blobB}`} />
    </div>
  );
}
