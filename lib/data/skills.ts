import { sanityFetch } from "@/lib/sanity/live";
import { SKILLS_LIST } from "@/lib/sanity/queries";
import type { SkillItem } from "@/lib/sanity/types";
import { skills as localSkills } from "@/lib/content";

export async function getSkills(): Promise<SkillItem[]> {
  const remote = await sanityFetch<SkillItem[]>({
    query: SKILLS_LIST,
    tags: ["skill"],
  });
  if (remote && remote.length > 0) return remote;
  return localSkills.map((s) => ({
    _id: s.name,
    name: s.name,
    group: s.group,
    proficiency: s.proficiency,
  }));
}
