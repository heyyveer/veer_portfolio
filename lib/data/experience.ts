import { sanityFetch } from "@/lib/sanity/live";
import { EXPERIENCE_LIST } from "@/lib/sanity/queries";
import type { ExperienceItem } from "@/lib/sanity/types";
import { experience as localExperience } from "@/lib/content";

export async function getExperience(): Promise<ExperienceItem[]> {
  const remote = await sanityFetch<ExperienceItem[]>({
    query: EXPERIENCE_LIST,
    tags: ["experience"],
  });
  if (remote && remote.length > 0) return remote;
  return localExperience.map((e, i) => ({
    _id: `${e.org}-${e.start}-${i}`,
    role: e.role,
    org: e.org,
    start: e.start,
    end: e.end,
    note: e.note,
    current: e.current,
  }));
}
