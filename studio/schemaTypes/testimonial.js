export default {
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    {
      name: "quote",
      title: "Citation",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Fonction / entreprise",
      type: "string",
      description: 'Ex. "Dirigeant, Client Retail"',
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
};
