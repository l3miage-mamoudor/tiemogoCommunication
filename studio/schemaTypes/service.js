export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "items",
      title: "Sous-services",
      type: "array",
      of: [{ type: "string" }],
      description: "Liste courte affichée en petits tags sous la description",
    },
    {
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Les services s'affichent du plus petit au plus grand numéro",
    },
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
