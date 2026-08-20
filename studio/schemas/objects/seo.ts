import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      validation: (r) => r.max(160),
    }),
    defineField({ name: "ogImage", type: "imageWithAlt" }),
    defineField({
      name: "noIndex",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
