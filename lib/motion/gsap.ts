"use client";

/**
 * Single place that registers GSAP plugins. Import `gsap` and `ScrollTrigger`
 * from here so registration happens exactly once (ANIMATION_SYSTEM.md §10.1).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
