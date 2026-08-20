import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

/**
 * Mount this config from `app/(studio)/studio/[[...tool]]/page.tsx`:
 *
 *   import { NextStudio } from "next-sanity/studio";
 *   import config from "@/studio/sanity.config";
 *   export default function StudioPage() { return <NextStudio config={config} />; }
 */
export default defineConfig({
  name: "soumya_potfolio_studio",
  title: "Soumya · Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "missing",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.editor()
                  .id("siteSettings")
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("experience").title("Experience"),
            S.documentTypeListItem("skill").title("Skills"),
            S.documentTypeListItem("post").title("Writing"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
