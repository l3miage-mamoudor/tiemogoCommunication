import PageHeader from "@/components/PageHeader";
import Blog from "@/components/Blog";
import { BLOG_INTRO } from "@/lib/content";

export const metadata = {
  title: "Blog — Tiemogo Communication",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title={BLOG_INTRO.title} lead={BLOG_INTRO.lead} paper />
      <Blog />
    </>
  );
}
