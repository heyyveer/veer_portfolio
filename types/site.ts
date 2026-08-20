/**
 * Structural site types: navigation, section metadata, SEO. These describe
 * the shell, not content.
 */

/** A navigation link. `index` is the mono section index ("03"). */
export type NavItem = {
  id: string;
  label: string;
  href: string;
};

/** One of the nine home-page sections (WIREFRAMES.md, DESIGN.md §9). */
export type SectionId =
  | "hero"
  | "about"
  | "expertise"
  | "experience"
  | "projects"
  | "case-studies"
  | "open-source"
  | "tech-stack"
  | "contact";

/** Metadata for a home-page section. */
export type SectionMeta = {
  id: SectionId;
  /** Short label (nav + headings). */
  label: string;
  /** In-page anchor target. */
  anchor: string;
};

/** Per-route SEO metadata shape. */
export type SeoMeta = {
  title: string;
  description: string;
  path: string;
};
