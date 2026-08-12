import PageHeader from "@/components/PageHeader";
import Blog from "@/components/Blog";
import { BLOG_INTRO } from "@/lib/content";

export const metadata = {
  title: "Blog",
  description:
    "Analyses et conseils de Tiemogo Communication sur la stratégie de marque, les relations presse et la gestion de crise en communication.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title={BLOG_INTRO.title} lead={BLOG_INTRO.lead} paper />
      <Blog />
    </>
  );
}
