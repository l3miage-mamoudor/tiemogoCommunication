import Link from "next/link";
import styles from "./Services.module.css";
import Reveal from "./Reveal";
import { client } from "@/lib/sanity/client";
import { servicesQuery } from "@/lib/sanity/queries";
import { EXPERTISES } from "@/lib/content";

// Utilisé tant que le projet Sanity n'est pas configuré, ou si aucun
// service n'a encore été ajouté dans le Studio (/studio)
const FALLBACK_SERVICES = EXPERTISES;

async function getServices() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_SERVICES;
  try {
    const data = await client.fetch(
      servicesQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data?.length ? data : FALLBACK_SERVICES;
  } catch {
    return FALLBACK_SERVICES;
  }
}

// limit : n'affiche que les X premiers (aperçu accueil). Laisse vide pour tout afficher (page Expertises).
// showLink : affiche un lien "Voir toutes nos expertises" en bas
export default async function Services({ limit, showLink = false }) {
  const all = await getServices();
  const services = limit ? all.slice(0, limit) : all;

  return (
    <section id="services" className="section">
      <div className="container">
        <p className="eyebrow">Ce que nous faisons</p>
        <h2 className={styles.title}>Cinq expertises, un même fil conducteur</h2>

        <div className={styles.rows}>
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <article className={styles.row}>
                <div className={styles.titleCol}>
                  <span className={styles.rowIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.rowTitle}>{service.title}</h3>
                </div>
                <div className={styles.rowBody}>
                  <p className={styles.rowText}>{service.description}</p>
                  {service.items?.length > 0 && (
                    <ul className={styles.rowItems}>
                      {service.items.map((item) => (
                        <li key={item.title || item}>{item.title || item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {showLink && (
          <Link href="/expertises" className={`btn btn--outline-dark ${styles.link}`}>
            Voir toutes nos expertises
          </Link>
        )}
      </div>
    </section>
  );
}
