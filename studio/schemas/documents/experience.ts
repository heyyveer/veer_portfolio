import { defineType, defineField } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "role",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "org",
      title: "Organization",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "start",
      type: "string",
      description: "Display string e.g. 'Dec 2024'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "end",
      type: "string",
      description: "Display string. Use 'Present' for active roles.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "note",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(320),
    }),
    defineField({ name: "current", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "role", subtitle: "org" },
  },
});
