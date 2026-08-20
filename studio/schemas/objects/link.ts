import { defineType, defineField } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      type: "url",
      validation: (r) =>
        r.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
    defineField({
      name: "external",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
