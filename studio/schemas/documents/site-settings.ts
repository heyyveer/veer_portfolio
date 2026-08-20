import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(260),
    }),
    defineField({
      name: "bioShort",
      type: "text",
      rows: 2,
      validation: (r) => r.required().max(260),
    }),
    defineField({ name: "bioLong", type: "text", rows: 5 }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "timezone", type: "string" }),
    defineField({ name: "availability", type: "boolean", initialValue: true }),
    defineField({
      name: "email",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "phone", type: "string" }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            { name: "label", type: "string" },
            { name: "handle", type: "string" },
            { name: "href", type: "url" },
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
