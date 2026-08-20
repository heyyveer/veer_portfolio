import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants";
import { CASE_STUDY_SLUGS } from "@/lib/case-studies";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...CASE_STUDY_SLUGS.map((s) => `case-studies/${s}`)];
  return routes.map((path) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    changeFrequency: "monthly",
    priority: path ? 0.8 : 1,
  }));
}
