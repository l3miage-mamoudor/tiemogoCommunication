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
