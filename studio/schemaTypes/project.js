export default {
  name: "project",
  title: "Réalisation",
  type: "document",
  fields: [
    {
      name: "client",
      title: "Nom du client",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "client", maxLength: 96 },
      description: "Génère l'adresse de la page dédiée du projet (/realisations/...)",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Expertise",
      type: "string",
      options: {
        list: [
          { title: "Conseil stratégique", value: "conseil-strategique" },
          { title: "Création", value: "creation" },
          { title: "Digital", value: "digital" },
          { title: "Édition et Print", value: "edition-print" },
          { title: "Événementiel", value: "evenementiel" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sector",
      title: "Type de prestation",
      type: "string",
      description: 'Ex. "Refonte de marque", "Relations presse"',
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "description",
      title: "Description longue",
      type: "array",
      of: [{ type: "block" }],
      description: "Affichée sur la page dédiée du projet (/realisations/...)",
    },
    {
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderDesc",
      by: [{ field: "order", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "client", subtitle: "sector", media: "image" },
  },
};
