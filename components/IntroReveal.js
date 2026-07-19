"use client";

import { useEffect, useState } from "react";
import styles from "./IntroReveal.module.css";

const SESSION_KEY = "tiemogo-intro-shown";

// Flash de marque affiché une seule fois par session (onglet), avant le
// premier rendu perçu — jamais sur navigation interne (PageTransition s'en
// charge), jamais si prefers-reduced-motion. Le contenu de la page reste
// monté en dessous pendant l'intro : pas d'impact sur le LCP.
export default function IntroReveal() {
  const [phase, setPhase] = useState("hidden");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);

    if (reduced || alreadyShown) return;

    sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("visible");

    const leaveTimer = setTimeout(() => setPhase("leaving"), 700);
    const hideTimer = setTimeout(() => setPhase("hidden"), 1100);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className={`${styles.overlay} ${phase === "leaving" ? styles.leaving : ""}`} aria-hidden="true">
      <span className={styles.word}>tiemogo</span>
    </div>
  );
}
