import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity/client";
import { projectBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import ScalePattern from "@/components/ScalePattern";
import { EXPERTISES, FALLBACK_PROJECTS } from "@/lib/content";
import { hashSeed, hueForSeed } from "@/lib/palette";
import styles from "./project.module.css";

const FALLBACK_BY_SLUG = Object.fromEntries(
  FALLBACK_PROJECTS.map((project) => [project.slug, project])
);

function categoryTitle(slug) {
  return EXPERTISES.find((expertise) => expertise.slug === slug)?.title || "Réalisation";
}

async function getProject(slug) {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const data = await client.fetch(
        projectBySlugQuery,
        { slug },
        { next: { revalidate: 60 } }
      );
      if (data) return data;
    } catch {
      // on retombe sur le contenu de secours ci-dessous
    }
  }
  return FALLBACK_BY_SLUG[slug] || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Réalisation" };
  return {
    title: project.client,
    description: project.sector || `${project.client} — une réalisation Tiemogo Communication.`,
    alternates: { canonical: `/realisations/${slug}` },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <section className="section section--paper">
        <div className="container">
          <p className="eyebrow">Réalisation</p>
          <h1 className={styles.title}>Projet introuvable</h1>
          <p className={styles.lead}>
            Ce projet n'existe pas ou plus. Retourne aux{" "}
            <Link href="/realisations">réalisations</Link>.
          </p>
        </div>
      </section>
    );
  }

  const letter = project.client.charAt(0).toUpperCase();
  const hue = hueForSeed(project.client);
  const patternId = `project-scale-${hashSeed(project.client)}`;
  const description = project.description;
  const hasTextDescription =
    Array.isArray(description) && description.length > 0 && typeof description[0] === "string";
  const hasPortableDescription =
    Array.isArray(description) && description.length > 0 && !hasTextDescription;

  return (
    <article className="section section--paper">
      <div className="container">
        <p className="eyebrow">{categoryTitle(project.category)}</p>
        <h1 className={styles.title}>{project.client}</h1>
        {project.sector && <p className={styles.lead}>{project.sector}</p>}

        <div className={styles.visual} style={{ "--tile-hue": hue }}>
          {project.image ? (
            <img
              src={urlFor(project.image).width(1600).height(800).url()}
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
        </div>

        <div className={styles.body}>
          {hasPortableDescription ? (
            <PortableText value={description} />
          ) : hasTextDescription ? (
            description.map((paragraph, i) => <p key={i}>{paragraph}</p>)
          ) : (
            <p>{project.sector}</p>
          )}
        </div>

        <Link href="/realisations" className={`btn btn--outline-light ${styles.back}`}>
          ← Retour aux réalisations
        </Link>
      </div>
    </article>
  );
}
