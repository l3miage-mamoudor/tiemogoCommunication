"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ExpertiseVisual.module.css";

// Une photo dédiée par expertise (ordre fixe de lib/content.js EXPERTISES)
// plutôt qu'un seul visuel recadré différemment — chaque bloc a sa propre
// identité au lieu d'une variation sur la même image.
const PHOTOS = [
  { src: "/expertises/conseil-strategique.jpg", position: "50% 35%", scale: 1.15 },
  { src: "/expertises/creation.jpg", position: "50% 40%", scale: 1.15 },
  { src: "/expertises/digital.jpg", position: "50% 50%", scale: 1.1 },
  { src: "/expertises/edition-print.jpg", position: "50% 55%", scale: 1.15 },
  { src: "/expertises/evenementiel.jpg", position: "50% 30%", scale: 1.15 },
];

export default function ExpertiseVisual({ index, className }) {
  const wrapRef = useRef(null);
  const photo = PHOTOS[index % PHOTOS.length];

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
      { xPercent: 55, opacity: 0.25 },
      {
        xPercent: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          end: "top 45%",
          scrub: true,
        },
      }
    );

    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <div ref={wrapRef} className={`${styles.visual} ${className || ""}`}>
      <img
        src={photo.src}
        alt=""
        aria-hidden="true"
        style={{ objectPosition: photo.position, "--zoom": photo.scale }}
      />
      <span className={styles.scrim} aria-hidden="true" />
    </div>
  );
}
