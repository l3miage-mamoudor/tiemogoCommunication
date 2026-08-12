"use client";

import { useEffect, useState } from "react";
import styles from "./ExpertiseList.module.css";

// item peut être une simple string (contenu Sanity minimal) ou un objet
// { title, tagline, text[] } (texte complet du document de marque) — les
// deux s'affichent, seul le second ouvre une popup avec le texte intégral.
// Popup plutôt qu'accordéon en place : dans la grille de cartes, un
// accordéon qui s'ouvre allonge sa carte et laisse un vide dans les cartes
// voisines de la même ligne (hauteur alignée par CSS grid stretch).
export default function ExpertiseItems({ items }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <ul className={styles.items}>
        {items.map((item) =>
          typeof item === "string" ? (
            <li key={item} className={styles.itemSimple}>
              {item}
            </li>
          ) : (
            <li key={item.title} className={styles.item}>
              <button
                type="button"
                className={styles.summary}
                onClick={() => setActive(item)}
              >
                <span className={styles.itemTitle}>{item.title}</span>
                {item.tagline && (
                  <span className={styles.itemTagline}>{item.tagline}</span>
                )}
                <span className={styles.chevron} aria-hidden="true" />
              </button>
            </li>
          )
        )}
      </ul>

      {active && (
        <div
          className={styles.modalOverlay}
          role="presentation"
          onClick={() => setActive(null)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.itemTitle}>{active.title}</span>
                {active.tagline && (
                  <span className={styles.itemTagline}>{active.tagline}</span>
                )}
              </div>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setActive(null)}
                aria-label="Fermer"
              >
                ×
              </button>
            </div>
            {active.text?.length > 0 && (
              <div className={styles.modalScroll}>
                <div className={styles.itemBody}>
                  {active.text.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
