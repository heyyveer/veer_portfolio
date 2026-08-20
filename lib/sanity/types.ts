/**
 * Hand-authored types mirroring the GROQ projections in queries.ts.
 * When the studio is generated, `sanity.types.ts` would supersede this
 * file — until then we keep them in sync manually.
 */

export type SanityImage = {
  _type: "image";
  alt: string;
  asset: { _ref: string };
};

export type ProjectListItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  cover?: SanityImage;
  status: "live" | "shipped" | "wip" | "archived";
  liveUrl?: string;
  featured: boolean;
  stack: Array<{
    _id: string;
    name: string;
    group: string;
  }>;
};

export type ProjectDetail = ProjectListItem & {
  body?: unknown;
  repoUrl?: string;
  publishedAt: string;
};

export type ExperienceItem = {
  _id: string;
  role: string;
  org: string;
  start: string;
  end: string;
  note: string;
  current?: boolean;
};

export type SkillItem = {
  _id: string;
  name: string;
  group:
    | "AI / ML"
    | "Generative AI"
    | "Deep Learning"
    | "Programming"
    | "Frameworks"
    | "Data"
    | "Tools";
  proficiency: number | null;
};

export type SiteSettings = {
  name: string;
  role: string;
  tagline: string;
  bioShort: string;
  bioLong: string;
  location: string;
  timezone: string;
  availability: boolean;
  email: string;
  phone: string;
  socials: Array<{
    label: string;
    handle: string;
    href: string;
  }>;
};
