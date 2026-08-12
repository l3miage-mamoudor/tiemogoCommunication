import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity/client";
import { postBySlugQuery } from "@/lib/sanity/queries";
import styles from "./post.module.css";

// Utilisé tant que le projet Sanity n'est pas configuré, ou si l'article
// n'existe pas encore dans le Studio (/studio)
const FALLBACK_POSTS = {
  "coherence-de-marque": {
    title: "Pourquoi la cohérence de marque compte plus que la fréquence",
    date: "2026-06-12",
    excerpt:
      "Trois principes pour garder un discours reconnaissable sur tous les canaux.",
  },
  "relations-presse-2026": {
    title: "Relations presse : ce qui capte l'attention d'un journaliste en 2026",
    date: "2026-05-28",
    excerpt: "Ce qui fonctionne encore, ce qui ne fonctionne plus, et pourquoi.",
  },
  "gerer-une-crise": {
    title: "Gérer une crise de communication : les 48 premières heures",
    date: "2026-05-09",
    excerpt: "La méthode que nous appliquons avec nos clients sur le terrain.",
  },
};

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getPost(slug) {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const data = await client.fetch(
        postBySlugQuery,
        { slug },
        { next: { revalidate: 60 } }
      );
      if (data) return data;
    } catch {
      // on retombe sur le contenu de secours ci-dessous
    }
  }
  return FALLBACK_POSTS[slug] || null;
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <section className="section section--paper">
        <div className="container">
          <p className="eyebrow">Article</p>
          <h1 className={styles.title}>Article introuvable</h1>
          <p className={styles.lead}>
            Cet article n'existe pas ou plus. Retourne au{" "}
            <Link href="/blog">blog</Link>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <article className="section section--paper">
      <div className="container">
        <p className="eyebrow">{formatDate(post.date)}</p>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.lead}>{post.excerpt}</p>

        <div className={styles.body}>
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>

        <Link href="/blog" className={`btn btn--outline-light ${styles.back}`}>
          ← Retour au blog
        </Link>
      </div>
    </article>
  );
}
