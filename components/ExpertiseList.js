import styles from "./ExpertiseList.module.css";
import Reveal from "./Reveal";
import ExpertiseVisual from "./ExpertiseVisual";
import { client } from "@/lib/sanity/client";
import { servicesQuery } from "@/lib/sanity/queries";
import { EXPERTISES } from "@/lib/content";

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

// item peut être une simple string (contenu Sanity minimal) ou un objet
// { title, tagline, text[] } (texte complet du document de marque) — les
// deux s'affichent, seul le second ouvre un accordéon avec le texte intégral.
function ExpertiseItem({ item }) {
  if (typeof item === "string") {
    return <li className={styles.itemSimple}>{item}</li>;
  }

  return (
    <li className={styles.item}>
      <details className={styles.details}>
        <summary className={styles.summary}>
          <span className={styles.itemTitle}>{item.title}</span>
          {item.tagline && <span className={styles.itemTagline}>{item.tagline}</span>}
          <span className={styles.chevron} aria-hidden="true" />
        </summary>
        {item.text?.length > 0 && (
          <div className={styles.itemBody}>
            {item.text.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </details>
    </li>
  );
}

export default async function ExpertiseList() {
  const services = await getServices();

  return (
    <div className={styles.list}>
      {services.map((service, i) => (
        <Reveal key={service.title} delay={i * 60}>
          <article className={styles.block}>
            <div className={styles.titleRow}>
              <span className={styles.number}>({String(i + 1).padStart(2, "0")})</span>
              <h2 className={styles.title}>{service.title}</h2>
            </div>
            <div className={styles.row}>
              <div className={styles.textCol}>
                <p className={styles.text}>{service.description}</p>
                {service.items?.length > 0 && (
                  <ul className={styles.items}>
                    {service.items.map((item) => (
                      <ExpertiseItem key={item.title || item} item={item} />
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.visualWrap}>
                <ExpertiseVisual index={i} />
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
