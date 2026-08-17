export default {
  name: "post",
  title: "Article",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "date",
      title: "Date de publication",
      type: "date",
    },
    {
      name: "excerpt",
      title: "Extrait (résumé court)",
      type: "text",
      rows: 2,
    },
    {
      name: "body",
      title: "Contenu de l'article",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Le contenu complet — pas encore affiché sur une page dédiée, préparé pour plus tard",
    },
  ],
  orderings: [
    {
      title: "Date de publication",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
};
