import type { NavItem, SectionMeta } from "@/types/site";

/**
 * The eight home-page sections in narrative order (WIREFRAMES.md §2,
 * DESIGN.md §9). `index` is the mono eyebrow; `anchor` is the in-page id.
 */
export const SECTION_META: readonly SectionMeta[] = [
  { id: "hero", label: "Intro", anchor: "#top" },
  { id: "about", label: "About", anchor: "#about" },
  { id: "expertise", label: "Expertise", anchor: "#expertise" },
  { id: "experience", label: "Experience", anchor: "#experience" },
  { id: "projects", label: "Work", anchor: "#work" },
  { id: "open-source", label: "Open Source", anchor: "#open-source" },
  { id: "tech-stack", label: "Stack", anchor: "#stack" },
  { id: "contact", label: "Contact", anchor: "#contact" },
] as const;

/**
 * Primary nav links. A curated subset of sections (WIREFRAMES.md §13): the
 * full list lives in the mobile drawer; the bar shows the high-intent
 * anchors. The contact CTA is rendered separately as a button.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "work", label: "Work", href: "#work" },
  { id: "open-source", label: "Open Source", href: "#open-source" },
  { id: "stack", label: "Stack", href: "#stack" },
] as const;

/** Anchor the primary contact CTA targets. */
export const CONTACT_ANCHOR = "#contact";
