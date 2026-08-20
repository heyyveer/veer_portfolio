"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { useLenisScroll } from "@/providers/scroll-provider";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: React.ReactNode;
  /** Range of vertical travel in px across the element's visible window. */
  amount?: number;
  /** When true, parallax tracks page scroll instead of element-in-view. */
  global?: boolean;
  className?: string;
};

/**
 * Lenis-driven parallax wrapper. By default the wrapper translates its
 * children across an `amount` range as the element passes through the
 * viewport, producing the slight depth shift that makes editorial
 * pages feel premium.
 *
 * `global` switches the input from element-relative progress to the
 * page scroll progress — useful for background layers (atmosphere,
 * grain) that should drift across the whole page life.
 */
export function Parallax({
  children,
  amount = 60,
  global = false,
  className,
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  useLenisScroll(({ progress }) => {
    const el = ref.current;
    if (!el || reduce) return;

    let p = progress;
    if (!global) {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const span = rect.height + vh;
      const traveled = vh - rect.top;
      p = Math.min(1, Math.max(0, traveled / span));
    }

    const y = (p - 0.5) * amount * 2;
    el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
  });

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ transform: "translate3d(0,0,0)" }}
    >
      {children}
    </div>
  );
}
