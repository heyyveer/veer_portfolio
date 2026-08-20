"use client";

import { gsap, useGSAP } from "@/lib/motion/gsap";

/**
 * Hero enhancer (ANIMATION_SYSTEM.md §7, §11). Progressive enhancement only —
 * the server-rendered hero (incl. the LCP headline, which is never touched) is
 * the universal baseline. The scroll choreography now belongs to
 * ContainerScroll (the stats console lays flat as you scroll), so this layer
 * only adds the motion-safe staggered intro: the sub-line, the stat tiles, and
 * the CTAs settle in on load.
 *
 * Document-scoped selectors (#top …) so they resolve against the real hero,
 * not this effect-only node, which renders nothing.
 */
export function HeroMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from("#top [data-hero-sub]", { y: 16, autoAlpha: 0, duration: 0.6 }, 0.2)
        .from("#top [data-metric-cell]", { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.05 }, 0.4)
        .from("#top [data-hero-cta] > *", { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, 0.55);
    });

    return () => mm.revert();
  });

  return null;
}
