import { client } from "@/lib/sanity/client";
import { postsQuery, projectsQuery } from "@/lib/sanity/queries";
import { FALLBACK_PROJECTS } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tiemogocommaker.com";

const FALLBACK_POST_SLUGS = [
  "coherence-de-marque",
  "relations-presse-2026",
  "gerer-une-crise",
];

async function getPostSlugs() {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const posts = await client.fetch(postsQuery);
      if (posts?.length) return posts.map((p) => p.slug);
    } catch {
      // on retombe sur le contenu de secours ci-dessous
    }
  }
  return FALLBACK_POST_SLUGS;
}

async function getProjectSlugs() {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const projects = await client.fetch(projectsQuery);
      if (projects?.length) return projects.map((p) => p.slug);
    } catch {
      // on retombe sur le contenu de secours ci-dessous
    }
  }
  return FALLBACK_PROJECTS.map((p) => p.slug);
}

export default async function sitemap() {
  const [postSlugs, projectSlugs] = await Promise.all([
    getPostSlugs(),
    getProjectSlugs(),
  ]);

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/expertises", priority: 0.9 },
    { path: "/realisations", priority: 0.9 },
    { path: "/agence", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/mentions-legales", priority: 0.3 },
    { path: "/confidentialite", priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    priority,
  }));

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/realisations/${slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  const postRoutes = postSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
