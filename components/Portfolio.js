import Link from "next/link";
import styles from "./Portfolio.module.css";
import Reveal from "./Reveal";
import ScalePattern from "./ScalePattern";
import { client } from "@/lib/sanity/client";
import { projectsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { EXPERTISES, REALISATION_TEASERS, FALLBACK_PROJECTS } from "@/lib/content";
import { hashSeed, hueForSeed } from "@/lib/palette";

async function getProjects() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_PROJECTS;
  try {
    const data = await client.fetch(
      projectsQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return data?.length ? data : FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

// Tuile adaptative : tant qu'aucune vraie photo de projet n'existe, la
// vignette reçoit une teinte stable (dérivée du nom du client, jamais
// aléatoire) + un filigrane d'écailles, plutôt qu'un simple rond-initiale.
function ProjectCard({ project }) {
  const letter = project.client.charAt(0).toUpperCase();
  const hue = hueForSeed(project.client);
  const patternId = `portfolio-scale-${hashSeed(project.client)}`;

  const body = (
    <>
      <div className={styles.thumb} style={{ "--tile-hue": hue }}>
        {project.image ? (
          <img
            src={urlFor(project.image).width(800).height(500).url()}
            alt={project.client}
          />
        ) : (
          <>
            <ScalePattern id={patternId} className={styles.pattern} opacity={0.4} />
            <span className={styles.ghostLetter} aria-hidden="true">
              {letter}
            </span>
          </>
        )}
        {project.slug && (
          <span className={styles.hoverLink}>
            Voir le projet <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
      <p className={styles.client}>{project.client}</p>
      <p className={styles.sector}>{project.sector}</p>
    </>
  );

  // Sans slug (anciennes fiches Sanity créées avant l'ajout du champ), la
  // carte reste décorative plutôt que de pointer vers une page inexistante.
  if (!project.slug) {
    return <article className={styles.card}>{body}</article>;
  }

  return (
    <Link href={`/realisations/${project.slug}`} className={styles.card}>
      {body}
    </Link>
  );
}

function TeaserCard({ expertise }) {
  const hue = hueForSeed(expertise.slug);
  const patternId = `teaser-scale-${hashSeed(expertise.slug)}`;

  return (
    <article className={`${styles.card} ${styles.teaser}`}>
      <div
        className={`${styles.thumb} ${styles.teaserThumb}`}
        style={{ "--tile-hue": hue }}
      >
        <ScalePattern id={patternId} className={styles.pattern} opacity={0.18} />
        <span className={styles.soon}>Bientôt</span>
      </div>
      <p className={styles.client}>{expertise.title}</p>
      <p className={styles.sector}>{REALISATION_TEASERS[expertise.slug]}</p>
    </article>
  );
}

// limit : n'affiche qu'un aperçu à plat (une carte par expertise, dans l'ordre).
// showLink : affiche un lien "Voir toutes nos réalisations" en bas.
// Sans limit, chaque expertise devient une section groupant ses projets réels
// (ou une carte "Bientôt" tant qu'aucun projet ne lui est rattaché) — prêt à
// être alimenté au fil du temps depuis le Studio Sanity / un futur CRM.
export default async function Portfolio({ limit, showLink = false }) {
  const projects = await getProjects();

  const categories = EXPERTISES.map((expertise) => ({
    expertise,
    projects: projects.filter((p) => p.category === expertise.slug),
  }));

  return (
    <section id="portfolio" className="section section--paper">
      <div className="container">
        <p className="eyebrow">Réalisations</p>
        <h2 className={styles.title}>Une sélection de projets récents</h2>

        {limit ? (
          <div className={styles.grid}>
            {categories.slice(0, limit).map(({ expertise, projects: catProjects }, i) => (
              <Reveal key={expertise.slug} delay={i * 80}>
                {catProjects[0] ? (
                  <ProjectCard project={catProjects[0]} />
                ) : (
                  <TeaserCard expertise={expertise} />
                )}
              </Reveal>
            ))}
          </div>
        ) : (
          <div className={styles.categories}>
            {categories.map(({ expertise, projects: catProjects }) => (
              <div key={expertise.slug} className={styles.category}>
                <h3 className={styles.categoryTitle}>{expertise.title}</h3>
                <div className={styles.grid}>
                  {catProjects.length > 0 ? (
                    catProjects.map((project, i) => (
                      <Reveal key={project.client} delay={i * 80}>
                        <ProjectCard project={project} />
                      </Reveal>
                    ))
                  ) : (
                    <Reveal>
                      <TeaserCard expertise={expertise} />
                    </Reveal>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showLink && (
          <Link href="/realisations" className={`btn btn--outline-light ${styles.link}`}>
            Voir toutes nos réalisations
          </Link>
        )}
      </div>
    </section>
  );
}
