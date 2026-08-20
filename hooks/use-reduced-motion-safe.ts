"use client";

import * as React from "react";

/**
 * SSR-safe reduced-motion reader. Returns `true` when the user prefers
 * reduced motion. Every motion surface gates on this (ANIMATION_SYSTEM.md
 * §20.1); the foundation provides the hook so later phases share one source.
 *
 * Starts `false` on the server / first paint, then resolves on mount and
 * tracks changes to the media query.
 */
export function useReducedMotionSafe(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
