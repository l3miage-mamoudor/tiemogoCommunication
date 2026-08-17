export default {
  name: "client",
  title: "Client (Ils nous font confiance)",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nom du client",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      description: "Optionnel — tant qu'aucun logo n'est ajouté, le nom s'affiche seul dans le bandeau.",
    },
    {
      name: "url",
      title: "Site web",
      type: "url",
      description: "Optionnel",
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
    select: { title: "name", media: "logo" },
  },
};
