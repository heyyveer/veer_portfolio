"use client";

import * as React from "react";

/**
 * Tracks which section ID is currently most-visible in the viewport, using
 * IntersectionObserver with a threshold table so transitions feel responsive
 * without thrashing on small scrolls. `topOffset` is forwarded to rootMargin
 * so a fixed header does not block the section beneath it from registering.
 *
 * Consumed by the navigation active-section indicator (rebuilt in a later
 * phase); kept here as foundation infrastructure.
 */
export function useActiveSection(
  ids: readonly string[],
  options: { topOffset?: number } = {},
): string | null {
  const { topOffset = 80 } = options;
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const ratios = new Map<string, number>();
    const elements: HTMLElement[] = [];

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        elements.push(el);
        ratios.set(id, 0);
      }
    }
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, r] of ratios) {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        setActive(bestId);
      },
      {
        rootMargin: `-${topOffset}px 0px -55% 0px`,
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, topOffset]);

  return active;
}
