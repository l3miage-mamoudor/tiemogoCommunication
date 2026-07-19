"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    // Désactivé sur tactile : pas de souris à suivre
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    if (!dot) return;

    let x = 0;
    let y = 0;
    let rafId;
    let overField = false;
    let started = false;

    function handleMove(e) {
      x = e.clientX;
      y = e.clientY;
      if (!started) {
        started = true;
        dot.style.opacity = overField ? "0" : "1";
      }
    }

    function loop() {
      dot.style.transform = `translate(${x}px, ${y}px)`;
      rafId = requestAnimationFrame(loop);
    }

    function handleOver(e) {
      const field = e.target.closest("input, textarea");
      const interactive = e.target.closest("a, button");

      overField = Boolean(field);
      dot.style.opacity = started ? (overField ? "0" : "1") : dot.style.opacity;
      dot.classList.toggle(styles.expand, Boolean(interactive) && !field);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={dotRef} className={styles.dot} aria-hidden="true" />;
}
