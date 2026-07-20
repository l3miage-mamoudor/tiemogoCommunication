import Image from "next/image";
import Link from "next/link";
import ChameleonAura from "./ChameleonAura";
import styles from "./Footer.module.css";
import { TAGLINE } from "@/lib/content";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/expertises", label: "Expertises" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/agence", label: "L'agence" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// Remplace par les vrais réseaux sociaux du cabinet
const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.cta}>
          <div className={styles.auraDim} aria-hidden="true">
            <ChameleonAura />
          </div>
          <div className={styles.ctaContent}>
            <p className="eyebrow">Un projet en tête ?</p>
            <h2 className={styles.ctaTitle}>
              Parlons de votre <em>prochaine</em> communication.
            </h2>
            <Link href="/contact" className="btn btn--pill">
              Parlons de votre projet
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div className="container">
          <div className={styles.top}>
            <Link href="/" className={styles.brand}>
              <Image
                src="/logo-mark.jpg"
                alt="Tiemogo Communication"
                width={30}
                height={30}
                className={styles.logo}
              />
              <span>tiemogo communication</span>
            </Link>
            <span className={styles.tagline}>{TAGLINE}</span>
          </div>

          <div className={styles.columns}>
            <div>
              <p className={styles.colTitle}>Navigation</p>
              <nav className={styles.colLinks}>
                {NAV_LINKS.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className={styles.colTitle}>Suivez-nous</p>
              <div className={styles.colLinks}>
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className={styles.colTitle}>Contact</p>
              <div className={styles.colLinks}>
                <span>contact@tiemogo.com</span>
                <span>01 23 45 67 89</span>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <span>Tiemogo Communication</span>
            <span>© {new Date().getFullYear()} Tous droits réservés</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
