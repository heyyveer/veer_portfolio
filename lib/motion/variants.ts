/**
 * Shared reveal vocabulary — DESIGN.md §8.6 (transition patterns).
 *
 * Every section enters with a DIFFERENT shape (blur, mask-wipe, slide, scale)
 * but every shape resolves through the SAME easing + duration tokens. That
 * shared rhythm is what makes the distinct entrances read as one connected
 * sequence rather than unrelated effects. Reveal and Stagger both consume this
 * map so the language can never drift.
 *
 * Values only (no engine import beyond the Target type) — lib stays JSX-free.
 */
import type { Target } from "framer-motion";

export type RevealVariant =
  | "fade-up"
  | "blur-up"
  | "mask-up"
  | "slide-left"
  | "slide-right"
  | "scale-in";

type VariantPair = { hidden: Target; show: Target };

export const REVEAL_VARIANTS: Record<RevealVariant, VariantPair> = {
  /** Workhorse section entry. */
  "fade-up": { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } },
  /** Cinematic, calm — hero/about/contact openers. */
  "blur-up": {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  /** Editorial headline wipe (clip-path inset). */
  "mask-up": {
    hidden: { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
    show: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
  },
  /** Directional — enters from the right (trajectory/work rhythm). */
  "slide-left": { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  /** Directional — enters from the left. */
  "slide-right": { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  /** Assembling — cards/bento settling into place. */
  "scale-in": {
    hidden: { opacity: 0, scale: 0.96, y: 12 },
    show: { opacity: 1, scale: 1, y: 0 },
  },
};
