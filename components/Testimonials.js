import styles from "./Testimonials.module.css";
import Reveal from "./Reveal";
import { client } from "@/lib/sanity/client";
import { testimonialsQuery } from "@/lib/sanity/queries";

// Utilisé tant que le projet Sanity n'est pas configuré, ou si aucun
// témoignage n'a encore été ajouté dans le Studio (/studio)
const FALLBACK_TESTIMONIALS = [
  {
    quote:
      "Une équipe qui a su comprendre notre identité et la traduire en une stratégie claire, sans jamais nous faire ressembler à tout le monde.",
    name: "Aïcha Kadi",
    role: "Dirigeante, Structure Kadi",
  },
  {
    quote:
      "Résultat au-delà de nos attentes sur la visibilité, avec un vrai accompagnement à chaque étape.",
    name: "Julien Ferrand",
    role: "Responsable communication, Maison Ferrand",
  },
  {
    quote:
      "Réactifs, à l'écoute, et surtout capables de s'adapter à nos contraintes sans jamais perdre en qualité.",
    name: "Solène Vasseur",
    role: "Fondatrice, Groupe Solène",
  },
];

async function getTestimonials() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_TESTIMONIALS;
  try {
    const data = await client.fetch(
      testimonialsQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data?.length ? data : FALLBACK_TESTIMONIALS;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  const [featured, ...rest] = testimonials;

  return (
    <section id="temoignages" className="section">
      <div className="container">
        <p className="eyebrow">Témoignages</p>
        <h2 className={styles.title}>Ce que nos clients en disent</h2>

        <div className={styles.layout}>
          {featured && (
            <Reveal>
              <blockquote className={styles.featured}>
                <p className={styles.featuredQuote}>&laquo; {featured.quote} &raquo;</p>
                <footer className={styles.footer}>
                  <p className={styles.name}>{featured.name}</p>
                  <p className={styles.role}>{featured.role}</p>
                </footer>
              </blockquote>
            </Reveal>
          )}

          <div className={styles.grid}>
            {rest.map((t, i) => (
              <Reveal key={`${t.name}-${i}`} delay={i * 80}>
                <blockquote className={styles.card}>
                  <p className={styles.quote}>&laquo; {t.quote} &raquo;</p>
                  <footer className={styles.footer}>
                    <p className={styles.name}>{t.name}</p>
                    <p className={styles.role}>{t.role}</p>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
