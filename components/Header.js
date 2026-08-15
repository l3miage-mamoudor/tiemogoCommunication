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
  const [isMobile, setIsMobile] = useState(false);
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
    // Correspond à la media query mobile de Header.module.css (860px) —
    // le style inline ci-dessous ne doit s'appliquer qu'en dessous de ce
    // seuil, sinon il masque le menu desktop en permanence (open y reste
    // toujours à false, faute de bouton burger pour le faire passer à true).
    const mq = window.matchMedia("(max-width: 860px)");
    setIsMobile(mq.matches);
    const handleChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Verrouille le scroll de la page tant que le menu plein écran est
    // ouvert. Sans ça, le fond reste scrollable derrière un `position:
    // fixed`, ce qui produit un rendu incohérent dès qu'on n'est pas tout
    // en haut de la page (constaté sur tous les navigateurs, pas
    // seulement Safari) — on fige le body à sa position de scroll actuelle
    // plutôt qu'un simple overflow:hidden, plus fiable sur mobile.
    if (!open) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

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

        <nav
          className={styles.nav}
          style={isMobile ? { opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" } : undefined}
        >
          {LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${styles.navLink} ${active ? styles.active : ""}`}
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
