import { sanityFetch } from "@/lib/sanity/live";
import { PROJECTS_INDEX, PROJECT_BY_SLUG } from "@/lib/sanity/queries";
import type { ProjectListItem, ProjectDetail } from "@/lib/sanity/types";
import { projects as localProjects } from "@/lib/content";

/**
 * Sanity-first, local-fallback. When `NEXT_PUBLIC_SANITY_PROJECT_ID` is
 * unset (or the fetch fails) we return the catalogue snapshot from
 * `lib/content.ts` so the site keeps shipping during local dev.
 */
function toListItem(p: (typeof localProjects)[number]): ProjectListItem {
  return {
    _id: p.slug,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    status: p.status,
    liveUrl: p.liveUrl,
    featured: Boolean(p.featured),
    stack: p.stack.map((name) => ({ _id: name, name, group: "Frontend" })),
  };
}

export async function getProjects(): Promise<ProjectListItem[]> {
  const remote = await sanityFetch<ProjectListItem[]>({
    query: PROJECTS_INDEX,
    tags: ["project"],
  });
  if (remote && remote.length > 0) return remote;
  return localProjects.map(toListItem);
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetail | null> {
  const remote = await sanityFetch<ProjectDetail | null>({
    query: PROJECT_BY_SLUG,
    params: { slug },
    tags: ["project", `project:${slug}`],
  });
  if (remote) return remote;

  const local = localProjects.find((p) => p.slug === slug);
  if (!local) return null;
  return {
    ...toListItem(local),
    publishedAt: new Date().toISOString(),
  };
}
