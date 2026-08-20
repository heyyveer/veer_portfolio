"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route-level crossfade (ANIMATION_SYSTEM.md §8.6): opacity-only, 240ms. The
 * template remounts on navigation, so main content fades in on each route.
 * No-op under reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.24, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {children}
    </motion.div>
  );
}
