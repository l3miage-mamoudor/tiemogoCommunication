"use client";

import { useEffect } from "react";

const STRENGTH = 14;

// Aimante légèrement tous les .btn vers le curseur au survol, via les
// variables --mx/--my consommées dans globals.css. Écoute déléguée sur le
// document plutôt qu'un ref par bouton : marche sur tous les boutons du
// site, y compris ceux rendus plus tard (Sanity, routes suivantes).
export default function MagneticButtons() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    let current = null;

    function release(el) {
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    }

    function handleMove(e) {
      const target = e.target.closest(".btn");

      if (target !== current) {
        if (current) release(current);
        current = target;
      }
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      target.style.setProperty("--mx", `${Math.max(-STRENGTH, Math.min(STRENGTH, relX * 0.3))}px`);
      target.style.setProperty("--my", `${Math.max(-STRENGTH, Math.min(STRENGTH, relY * 0.3))}px`);
    }

    function handleLeave() {
      if (current) release(current);
      current = null;
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (current) release(current);
    };
  }, []);

  return null;
}
