"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion/tokens";
import { REVEAL_VARIANTS, type RevealVariant } from "@/lib/motion/variants";

type RevealTag = "div" | "ol" | "ul" | "section" | "header" | "article";

const MOTION_TAGS = {
  div: motion.div,
  ol: motion.ol,
  ul: motion.ul,
  section: motion.section,
  header: motion.header,
  article: motion.article,
} as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Element to render (preserves semantics, e.g. "ol"). */
  as?: RevealTag;
  /** Stagger this single reveal by N seconds. */
  delay?: number;
  /** Entrance shape (DESIGN.md §8.6). All variants share the same timing. */
  variant?: RevealVariant;
  /** Travel distance override (px) for the fade-up variant only. */
  y?: number;
  /** Animate only on first entry. Default false: re-runs on every scroll pass. */
  once?: boolean;
};

/**
 * On-scroll entrance (ANIMATION_SYSTEM.md §8.8). Framer `whileInView`,
 * transform/opacity/clip only. By default it is bidirectional — content
 * reveals as it enters and settles back to hidden as it leaves, so scrolling
 * up "un-reveals" each section for a continuous, scrubbed feel; pass
 * `once` to lock it after the first entry. The `variant` picks the entrance
 * shape; every variant resolves through the shared DURATION/EASE tokens so the
 * page feels like one directed sequence. Collapses to a plain element under
 * reduced motion. Server sections render this client wrapper around their
 * content.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  variant = "fade-up",
  y,
  once = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return React.createElement(as, { className }, children);
  }
  const Tag = MOTION_TAGS[as];
  const { hidden, show } = REVEAL_VARIANTS[variant];
  const initial =
    y != null && variant === "fade-up" ? { ...hidden, y } : hidden;
  return (
    <Tag
      className={className}
      initial={initial}
      whileInView={show}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: DURATION.slow, ease: EASE.emphasis, delay }}
    >
      {children}
    </Tag>
  );
}
