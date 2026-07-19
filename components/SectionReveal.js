"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SectionReveal.module.css";

// Fait "s'ouvrir" une section au scroll : léger zoom + clip-path qui se
// détend, pour un effet d'entrée plus marqué que le simple fade de Reveal.js
export default function SectionReveal({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          scale: 0.94,
          clipPath: "inset(3% round 18px)",
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% round 0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={styles.reveal}>
      {children}
    </div>
  );
}
