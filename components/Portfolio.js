import styles from "./Portfolio.module.css";
import Reveal from "./Reveal";
import { client } from "@/lib/sanity/client";
import { projectsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { EXPERTISES, REALISATION_TEASERS, FALLBACK_PROJECTS } from "@/lib/content";

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

// Hash déterministe (même nom de client => même composition à chaque
// rendu) pour varier l'inclinaison du dégradé de fond tant qu'aucune vraie
// photo de projet n'est disponible.
function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const TILTS = [8, -6, 12, -10, 5];

function ProjectCard({ project }) {
  const letter = project.client.charAt(0).toUpperCase();
  const tilt = TILTS[hashSeed(project.client) % TILTS.length];

  return (
    <article className={styles.card}>
      <div
        className={styles.thumb}
        style={project.image ? undefined : { "--tilt": `${tilt}deg` }}
      >
        {project.image ? (
          <img
            src={urlFor(project.image).width(800).height(500).url()}
            alt={project.client}
          />
        ) : (
          <>
            <span className={styles.ghostLetter} aria-hidden="true">
              {letter}
            </span>
            <span className={styles.monogram}>{letter}</span>
          </>
        )}
        <span className={styles.hoverLink}>
          Voir le projet <span aria-hidden="true">→</span>
        </span>
      </div>
      <p className={styles.client}>{project.client}</p>
      <p className={styles.sector}>{project.sector}</p>
    </article>
  );
}

function TeaserCard({ expertise }) {
  return (
    <article className={`${styles.card} ${styles.teaser}`}>
      <div className={`${styles.thumb} ${styles.teaserThumb}`}>
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
          <a href="/realisations" className={`btn btn--outline-light ${styles.link}`}>
            Voir toutes nos réalisations
          </a>
        )}
      </div>
    </section>
  );
}
