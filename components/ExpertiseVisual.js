"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const wrapRef = useRef(null);
  const crop = CROPS[index % CROPS.length];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // Glissement droite -> gauche couplé au scroll (pas une animation qui se
    // joue une fois : la position suit directement la progression du scroll).
    const tween = gsap.fromTo(
      el,
      { xPercent: 22, opacity: 0.5 },
      {
        xPercent: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top 50%",
          scrub: true,
        },
      }
    );

    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <div ref={wrapRef} className={`${styles.visual} ${className || ""}`}>
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
