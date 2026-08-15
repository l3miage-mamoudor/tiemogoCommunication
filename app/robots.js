const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tiemogocommaker.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
