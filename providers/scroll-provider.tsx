"use client";

import * as React from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";

type LenisContextValue = {
  lenis: Lenis | null;
};

const LenisContext = React.createContext<LenisContextValue>({ lenis: null });

type ScrollListener = (state: {
  scroll: number;
  limit: number;
  velocity: number;
  progress: number;
}) => void;

const listeners = new Set<ScrollListener>();

/**
 * Single smooth-scroll authority for the whole app (Lenis).
 *
 * FOUNDATION SCOPE: Lenis only. The GSAP + ScrollTrigger sync (driving Lenis
 * from gsap.ticker for one shared RAF loop, plus ScrollTrigger.update) lands
 * in the animation phase per ANIMATION_SYSTEM.md §10.1. The RAF loop and
 * listener registry below are already shaped to accept that integration
 * without an API change.
 *
 * Honors prefers-reduced-motion: smoothing is skipped, context stays null,
 * and dependents fall back to native scroll.
 */
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    setLenis(instance);

    const onScroll = (l: Lenis) => {
      // Keep ScrollTrigger in sync with Lenis (single source of scroll).
      ScrollTrigger.update();
      const state = {
        scroll: l.scroll,
        limit: l.limit || 1,
        velocity: l.velocity,
        progress: l.progress,
      };
      for (const fn of listeners) fn(state);
    };
    instance.on("scroll", onScroll);

    // Drive Lenis from GSAP's ticker so the whole app shares one RAF loop.
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Recalculate pinned/scrubbed triggers after layout settles + on resize.
    ScrollTrigger.refresh();
    let resizeId: number;
    const onResize = () => {
      window.clearTimeout(resizeId);
      resizeId = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    window.addEventListener("resize", onResize);

    // Section snap — each section settles to the top of the viewport as it
    // comes through, so the next section reveals one at a time. `proximity`
    // (not `mandatory`) so sections taller than the viewport stay readable.
    const snap = new Snap(instance, {
      type: "proximity",
      distanceThreshold: "20%",
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("#main section"),
    );
    for (const el of sections) snap.addElement(el, { align: ["start"] });

    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      
      e.preventDefault();
      if (id === "#top") {
        instance.scrollTo(0);
        return;
      }

      const el = document.querySelector(id) as HTMLElement;
      if (!el) return;
      
      let offset = -72;
      // For scroll-jacking sections, scroll to the bottom so animations are fully revealed
      if (el.offsetHeight > window.innerHeight * 1.5) {
        offset = el.offsetHeight - window.innerHeight;
      }
      
      instance.scrollTo(el, { offset });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onAnchorClick);
      instance.off("scroll", onScroll);
      snap.destroy();
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
  );
}

export function useLenis() {
  return React.useContext(LenisContext).lenis;
}

/**
 * Subscribe to Lenis scroll events. Falls back to a passive window scroll
 * listener when Lenis is unavailable (reduced motion / pre-mount), providing
 * a computed `progress` in [0, 1].
 */
export function useLenisScroll(callback: ScrollListener) {
  const lenis = useLenis();
  const ref = React.useRef(callback);
  ref.current = callback;

  React.useEffect(() => {
    const fn: ScrollListener = (s) => ref.current(s);

    if (lenis) {
      listeners.add(fn);
      const limit = lenis.limit || 1;
      ref.current({
        scroll: lenis.scroll,
        limit,
        velocity: 0,
        progress: lenis.scroll / limit,
      });
      return () => {
        listeners.delete(fn);
      };
    }

    const onScroll = () => {
      const scroll = window.scrollY;
      const limit =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      ref.current({
        scroll,
        limit,
        velocity: 0,
        progress: Math.min(1, Math.max(0, scroll / limit)),
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [lenis]);
}
