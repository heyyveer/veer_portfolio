/**
 * GROQ queries — single source of truth. Tagged cache keys mirror these
 * names (e.g. `tags: ["project"]`) so webhook revalidation can target
 * exact entities.
 */

const NOT_DRAFT = `!(_id in path("drafts.**"))`;

export const PROJECTS_INDEX = /* groq */ `
  *[_type == "project" && ${NOT_DRAFT}]
    | order(featured desc, publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      cover,
      status,
      liveUrl,
      featured,
      "stack": stack[]->{ _id, name, group }
    }
`;

export const PROJECT_BY_SLUG = /* groq */ `
  *[_type == "project" && slug.current == $slug && ${NOT_DRAFT}][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    cover,
    body,
    liveUrl,
    repoUrl,
    status,
    publishedAt,
    "stack": stack[]->{ _id, name, group }
  }
`;

export const EXPERIENCE_LIST = /* groq */ `
  *[_type == "experience" && ${NOT_DRAFT}]
    | order(start desc) {
      _id, role, org, start, end, note, current
    }
`;

export const SKILLS_LIST = /* groq */ `
  *[_type == "skill" && ${NOT_DRAFT}]
    | order(group asc, proficiency desc) {
      _id, name, group, proficiency
    }
`;

export const SITE_SETTINGS = /* groq */ `
  *[_type == "siteSettings"][0] {
    name, role, tagline, bioShort, bioLong,
    location, timezone, availability, email, phone,
    socials[]{ label, handle, href }
  }
`;
