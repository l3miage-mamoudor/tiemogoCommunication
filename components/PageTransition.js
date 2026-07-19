"use client";

import { usePathname } from "next/navigation";
import styles from "./PageTransition.module.css";

// Remonte {children} à chaque changement de route (clé = pathname), ce qui
// déclenche l'animation d'entrée CSS ci-dessous. Ne sert à rien tant que la
// nav interne utilise des <a href> bruts (rechargement complet) — dépend de
// la migration vers next/link.
export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className={styles.enter}>
      {children}
    </div>
  );
}
