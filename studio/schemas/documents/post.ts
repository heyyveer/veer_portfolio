import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Writing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 2,
      validation: (r) => r.max(220),
    }),
    defineField({ name: "cover", type: "imageWithAlt" }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title", media: "cover" } },
});
