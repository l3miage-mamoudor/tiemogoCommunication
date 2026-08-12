import styles from "./ExpertiseList.module.css";
import Reveal from "./Reveal";
import ExpertiseVisual from "./ExpertiseVisual";
import ExpertiseItems from "./ExpertiseItems";
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

export default async function ExpertiseList() {
  const services = await getServices();

  return (
    <div className={styles.list}>
      {services.map((service, i) => (
        <Reveal key={service.title} delay={i * 60}>
          <article className={styles.card}>
            <div className={styles.visualWrap}>
              <ExpertiseVisual index={i} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.titleRow}>
                <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                <h2 className={styles.title}>{service.title}</h2>
              </div>
              <p className={styles.text}>{service.description}</p>
              {service.items?.length > 0 && (
                <ExpertiseItems items={service.items} />
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
