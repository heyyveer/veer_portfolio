"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useReducedMotionSafe } from "@/hooks";

/**
 * A user-friendly scroll indicator placed at the bottom of the hero section.
 * Fades out as the user scrolls down.
 */
export function ScrollIndicator() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotionSafe();
  
  // Fade out quickly as the user starts scrolling
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);

  if (reduce) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown className="size-4 text-muted-foreground" />
      </motion.div>
    </motion.div>
  );
}
