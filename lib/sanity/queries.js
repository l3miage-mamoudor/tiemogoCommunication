export const servicesQuery = `*[_type == "service"] | order(order asc){ title, description, items }`;

export const projectsQuery = `*[_type == "project"] | order(order desc){ client, sector, image, category }`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc){ quote, name, role }`;

export const postsQuery = `*[_type == "post"] | order(date desc){ title, "slug": slug.current, excerpt, date }`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{ title, "slug": slug.current, excerpt, date, body }`;

export const teamQuery = `*[_type == "teamMember"] | order(order asc){ name, role, signature, photo }`;

export const clientsQuery = `*[_type == "client"] | order(order asc){ name, logo, url }`;
