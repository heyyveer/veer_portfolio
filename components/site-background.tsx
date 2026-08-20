"use client";

import LiquidEther from "@/components/sections/hero/liquid-ether";

/**
 * Page-wide ambient background. A single fixed Liquid Ether field sits behind
 * every section so all content scrolls over one continuous, animated surface
 * (one WebGL instance for the whole app, not one per section). A theme-tinted
 * scrim keeps body copy legible over the motion. Non-interactive so it never
 * steals pointer events from content.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <LiquidEther />
      <div className="absolute inset-0 bg-background/72" />
    </div>
  );
}
