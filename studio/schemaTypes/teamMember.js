export default {
  name: "teamMember",
  title: "Membre de l'équipe",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nom complet",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Poste",
      type: "string",
    },
    {
      name: "signature",
      title: "Signature",
      type: "string",
      description: 'Courte formule qui résume son rôle, ex. "L\'œil stratégique"',
    },
    {
      name: "photo",
      title: "Photo",
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
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
};
