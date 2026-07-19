"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/expertises", label: "Expertises" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/agence", label: "L'agence" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Le header transparent n'est lisible que sur l'accueil, où il flotte
  // au-dessus du Hero sombre. Sur les autres pages, PageHeader peut être
  // clair ("paper") — le texte blanc du header y serait invisible tant
  // qu'on n'a pas scrollé. On force donc le fond solide dès le départ
  // partout ailleurs qu'à l'accueil.
  const solid = scrolled || pathname !== "/";

  return (
    <header className={`${styles.header} ${solid ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo-mark.jpg"
            alt="Tiemogo Communication"
            width={36}
            height={36}
            className={styles.logoImg}
          />
          <span className={styles.logoWord}>Tiemogo Communication</span>
        </Link>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
          {LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={active ? styles.active : ""}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/contact" className={`btn btn--pill ${styles.ctaMobile}`}>
            Parlons de votre projet
          </Link>
        </nav>

        <Link href="/contact" className={`btn btn--pill ${styles.cta}`}>
          Parlons de votre projet
        </Link>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
