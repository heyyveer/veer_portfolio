"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion/tokens";

/**
 * Connective thread between sections (DESIGN.md §7.9, §10.3) — a hairline that
 * draws in left-to-right as it enters view, capped by the 24deg diagonal slash
 * from the logo notch. Every divider shares the one draw-in animation, so
 * scrolling reads as a single continuous sequence. Purely decorative.
 */
export function SectionThread() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className="mx-auto flex max-w-7xl items-center gap-4 px-6 md:px-10 lg:px-16"
    >
      <motion.span
        className="h-px flex-1 origin-left bg-border"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
        transition={{ duration: DURATION.cinema, ease: EASE.emphasis }}
      />
      <span className="h-3 w-px shrink-0 -skew-x-[24deg] bg-accent/60" />
    </div>
  );
}
