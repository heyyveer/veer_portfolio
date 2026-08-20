import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "code",
      title: "Code (P/001 …)",
      type: "string",
      validation: (r) => r.required().regex(/^P\/\d{3}$/),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "cover",
      type: "imageWithAlt",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "stack",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "liveUrl", type: "url" }),
    defineField({ name: "repoUrl", type: "url" }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "Shipped", value: "shipped" },
          { title: "Work in progress", value: "wip" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "live",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "cover",
    },
  },
  orderings: [
    {
      title: "Featured → Newest",
      name: "featuredNewest",
      by: [
        { field: "featured", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
  ],
});
