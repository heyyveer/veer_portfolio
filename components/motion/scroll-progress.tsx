"use client";

import { useReducedMotionSafe } from "@/hooks";
import { useLenisScroll } from "@/providers/scroll-provider";
import * as React from "react";

/**
 * Fixed accent progress bar pinned across the very top of the viewport, above
 * the navbar (ANIMATION_SYSTEM.md §10.6). Scales on the X axis with Lenis
 * scroll progress, driven entirely through inline `transform` (Tailwind's
 * `scale-x-*` utility sets the separate `scale` property in v4, which would
 * override the transform and pin the bar to zero width). Under reduced motion
 * it shows a static full-width rail.
 */
export function ScrollProgress() {
  const reduce = useReducedMotionSafe();
  const ref = React.useRef<HTMLDivElement>(null);

  useLenisScroll(({ progress }) => {
    if (!reduce && ref.current) {
      ref.current.style.transform = `scaleX(${progress})`;
    }
  });

  return (
    <div
      aria-hidden
      ref={ref}
      style={{ transform: reduce ? "scaleX(1)" : "scaleX(0)" }}
      className="scroll-progress-bar fixed inset-x-0 top-0 z-[90] h-1 origin-left"
    />
  );
}
