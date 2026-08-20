import { defineType, defineField } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "group",
      type: "string",
      options: {
        list: ["Frontend", "Backend", "Database", "Tooling"],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency (0–100)",
      type: "number",
      validation: (r) => r.min(0).max(100),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "group" },
  },
});
