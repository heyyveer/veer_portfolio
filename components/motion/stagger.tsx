"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { DURATION, EASE, STAGGER } from "@/lib/motion/tokens";
import { REVEAL_VARIANTS, type RevealVariant } from "@/lib/motion/variants";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

/** Items inherit their entrance shape from the parent Stagger's variant. */
const StaggerCtx = React.createContext<RevealVariant>("fade-up");

/**
 * Staggered group entrance (ANIMATION_SYSTEM.md §8.8): children cascade in as
 * the group enters the viewport, stepped by STAGGER, and cascade back out as
 * it leaves so scrolling up reverses the sequence. Pass `once` to lock it
 * after the first pass. The `variant` sets the shape every child shares — same
 * vocabulary as Reveal, so a staggered grid reads as part of the same
 * connected sequence. No-op under reduced motion. Children must be
 * `StaggerItem`s.
 */
export function Stagger({
  children,
  className,
  variant = "fade-up",
  once = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <StaggerCtx.Provider value={variant}>
      <motion.div
        className={className}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-10% 0px -10% 0px" }}
      >
        {children}
      </motion.div>
    </StaggerCtx.Provider>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const variant = React.useContext(StaggerCtx);
  if (reduce) return <div className={className}>{children}</div>;
  const { hidden, show } = REVEAL_VARIANTS[variant];
  const item: Variants = {
    hidden,
    show: { ...show, transition: { duration: DURATION.slow, ease: EASE.emphasis } },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
