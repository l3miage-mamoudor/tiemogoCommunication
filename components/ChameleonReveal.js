"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ChameleonReveal.module.css";
import { METHOD } from "@/lib/content";

// Le caméléon reprend ses couleurs au fil du scroll : écho direct au
// positionnement de Tiemogo ("s'adapter, se différencier, marquer, durer").
// Le duotone encre/orange est fait via un filtre SVG (feComponentTransfer)
// qui mappe noir->ink et blanc->orange exactement (valeurs de la charte),
// plutôt que des filtres CSS approximatifs (sepia/hue-rotate dérivait vers
// du rose). La photo reste grise ; une seconde image, teintée par le filtre
// SVG, apparaît en fondu par-dessus pour révéler la couleur de marque.
const GRAYSCALE_HIDDEN = "grayscale(1) brightness(0.5) contrast(1.1)";
const GRAYSCALE_REVEALED = "grayscale(1) brightness(0.92) contrast(1.05)";

export default function ChameleonReveal() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const duotoneRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 781px)", () => {
      gsap.set([imgRef.current, duotoneRef.current], { scale: 0.55 });
      gsap.set(imgRef.current, { filter: GRAYSCALE_HIDDEN });
      gsap.set(duotoneRef.current, { opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + Math.round(window.innerHeight * 0.7),
          scrub: true,
          pin: true,
        },
      });

      tl.to([imgRef.current, duotoneRef.current], { scale: 1, ease: "none" }, 0)
        .to(imgRef.current, { filter: GRAYSCALE_REVEALED, ease: "none" }, 0)
        .to(duotoneRef.current, { opacity: 1, ease: "none" }, 0)
        .to(textRef.current, { opacity: 1, y: 0, ease: "none" }, 0.45);

      return () => tl.scrollTrigger?.kill();
    });

    mm.add("(max-width: 780px)", () => {
      gsap.set(imgRef.current, { filter: GRAYSCALE_HIDDEN });
      gsap.set(duotoneRef.current, { opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 16 });

      // Sur mobile, on n'anime plus le filter CSS de l'image grise pendant
      // le scroll (coûteux à recalculer à chaque frame sur Safari iOS —
      // ça allait jusqu'à faire perdre au header sa position fixe pendant
      // le scroll). Seule l'opacité du calque duotone (déjà filtré, statique)
      // est animée : bien moins cher, même effet visuel de révélation.
      const duotoneTween = gsap.to(duotoneRef.current, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 35%",
          scrub: true,
        },
      });

      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      return () => {
        duotoneTween.scrollTrigger?.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="chameleonDuotone" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            {/* noir (0) -> ink #121212, blanc (1) -> orange #ff2a00 */}
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.07 1" />
              <feFuncG type="table" tableValues="0.07 0.165" />
              <feFuncB type="table" tableValues="0.07 0" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      <img ref={imgRef} src="/chameleon.jpg" alt="" className={styles.image} aria-hidden="true" />
      <img
        ref={duotoneRef}
        src="/chameleon.jpg"
        alt=""
        className={`${styles.image} ${styles.imageDuotone}`}
        aria-hidden="true"
      />
      <div className={styles.scrim} aria-hidden="true" />
      <div ref={textRef} className={styles.copy}>
        <p className="eyebrow">{METHOD.eyebrow}</p>
        <p className={styles.steps}>{METHOD.steps.join(" ")}</p>
        <p className={styles.line}>{METHOD.statement}</p>
      </div>
    </section>
  );
}
