/**
 * Motion token source of truth — ANIMATION_SYSTEM.md §5 to §6.
 *
 * Values only. No animation engine is imported here. Framer Motion consumes
 * DURATION/EASE; GSAP consumes GSAP_EASE. Both are wired in the animation
 * phase; in the foundation these are inert constants the future motion layer
 * imports so timings stay centralized and never drift.
 */

/** Clock durations, in seconds (Framer + non-scrubbed GSAP tweens). */
export const DURATION = {
  instant: 0.1,
  fast: 0.18,
  base: 0.32,
  slow: 0.56,
  cinema: 0.9,
} as const;

/** Framer Motion cubic-bezier easings. */
export const EASE = {
  standard: [0.2, 0.65, 0.3, 0.9],
  emphasis: [0.16, 1, 0.3, 1],
  exit: [0.4, 0, 1, 1],
  inout: [0.65, 0, 0.35, 1],
} as const;

/** GSAP-named equivalents of the same curves. */
export const GSAP_EASE = {
  standard: "power2.out",
  emphasis: "expo.out",
  exit: "power2.in",
  inout: "power2.inOut",
} as const;

/** Stagger step between children, in seconds (cap 8 visible). */
export const STAGGER = 0.06;

/** Scroll-distance budget for pinned set pieces, in vh (GSAP phase). */
export const PIN_VH = {
  hero: 80,
  experience: 140,
  techStack: 120,
} as const;

export type DurationToken = keyof typeof DURATION;
export type EaseToken = keyof typeof EASE;
