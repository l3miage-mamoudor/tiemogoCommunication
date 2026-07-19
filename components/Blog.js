import Link from "next/link";
import styles from "./Blog.module.css";
import { client } from "@/lib/sanity/client";
import { postsQuery } from "@/lib/sanity/queries";

// Utilisé tant que le projet Sanity n'est pas configuré, ou si aucun
// article n'a encore été ajouté dans le Studio (/studio)
const FALLBACK_POSTS = [
  {
    date: "2026-06-12",
    title: "Pourquoi la cohérence de marque compte plus que la fréquence",
    excerpt:
      "Trois principes pour garder un discours reconnaissable sur tous les canaux.",
    slug: "coherence-de-marque",
  },
  {
    date: "2026-05-28",
    title: "Relations presse : ce qui capte l'attention d'un journaliste en 2026",
    excerpt:
      "Ce qui fonctionne encore, ce qui ne fonctionne plus, et pourquoi.",
    slug: "relations-presse-2026",
  },
  {
    date: "2026-05-09",
    title: "Gérer une crise de communication : les 48 premières heures",
    excerpt: "La méthode que nous appliquons avec nos clients sur le terrain.",
    slug: "gerer-une-crise",
  },
];

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getPosts() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_POSTS;
  try {
    const data = await client.fetch(postsQuery, {}, { next: { revalidate: 60 } });
    return data?.length ? data : FALLBACK_POSTS;
  } catch {
    return FALLBACK_POSTS;
  }
}

// limit : n'affiche que les X premiers articles (aperçu accueil).
// showLink : affiche un lien "Voir tous les articles" en bas
export default async function Blog({ limit, showLink = false }) {
  const all = await getPosts();
  const posts = limit ? all.slice(0, limit) : all;

  return (
    <section id="actus" className="section">
      <div className="container">
        <div className={styles.list}>
          {posts.map((post) => (
            <Link key={post.title} href={`/blog/${post.slug}`} className={styles.post}>
              <p className={styles.date}>{formatDate(post.date)}</p>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.excerpt}>{post.excerpt}</p>
            </Link>
          ))}
        </div>

        {showLink && (
          <Link href="/blog" className={`btn btn--outline-dark ${styles.link}`}>
            Voir tous les articles
          </Link>
        )}
      </div>
    </section>
  );
}
