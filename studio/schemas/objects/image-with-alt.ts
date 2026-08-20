import { defineType, defineField } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (r) =>
        r
          .required()
          .min(4)
          .error(
            "Alt text is required for accessibility. Describe the image in a short sentence.",
          ),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});
