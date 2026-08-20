/**
 * Shared content types. The runtime data contract lives in `lib/content.ts`
 * (the typed catalogue); the core entity types are re-exported here so
 * sections and the eventual Sanity layer share one type source.
 *
 * The new V3 entity shapes (case study, open-source repo, expertise area)
 * are declared here as types only. No data is created in the foundation
 * phase; content migration is a later phase.
 */

export type {
  Skill,
  SkillGroup,
  Experience,
  Project,
  SocialChannel,
} from "@/lib/content";

/** Project status pill values. */
export type ProjectStatus = "live" | "shipped" | "wip" | "archived";

/** One capability card in the Expertise section (CONTENT_STRATEGY.md §8). */
export type ExpertiseArea = {
  id: string;
  title: string;
  keyMessage: string;
  support: string;
  /** Representative technologies shown as proof. */
  proof: string[];
  /** Largest/highlighted card in the bento. */
  featured?: boolean;
};

/** A published or contributed-to repository (CONTENT_STRATEGY.md §12). */
export type OpenSourceRepo = {
  name: string;
  /** Bold one-line descriptor. */
  tagline: string;
  /** What it is and the problem it solves. */
  purpose: string;
  /** Grouping label, e.g. "AI Infrastructure". */
  category: string;
  /** Technologies used. */
  tech: string[];
  /** Key capabilities. */
  features: string[];
  repoUrl: string;
  /** Package page (npm) if published. */
  pkgUrl?: string;
  featured?: boolean;
};

/** One scene block in a long-form case study (CONTENT_STRATEGY.md §11). */
export type CaseStudyBlock = {
  kind:
    | "overview"
    | "problem"
    | "research"
    | "architecture"
    | "implementation"
    | "challenges"
    | "results"
    | "learnings";
  heading: string;
  body: string;
};

/** A full case study (detail route). */
export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
  blocks: CaseStudyBlock[];
};
