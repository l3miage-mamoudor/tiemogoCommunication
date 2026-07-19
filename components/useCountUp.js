"use client";

import { useEffect, useRef, useState } from "react";

// Anime un nombre de 0 → target quand l'élément entre dans le viewport.
// `target` : la valeur numérique finale. `formatted` (optionnel) : le texte
// d'origine (ex. "80+", "98%") — sert à réinjecter le suffixe/préfixe une
// fois l'animation terminée, pour ne jamais afficher un nombre "nu" à la fin.
export default function useCountUp(target, { duration = 1400 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }

    let rafId;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;

        const start = performance.now();
        function tick(now) {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * eased));
          if (progress < 1) rafId = requestAnimationFrame(tick);
        }
        rafId = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return [ref, value];
}
