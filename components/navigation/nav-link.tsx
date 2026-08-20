"use client";

import NextLink from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Single primary-nav link. The active marker is a shared-`layoutId` accent
 * underline that slides between links as the active section changes (Framer
 * layout animation). Under reduced motion it renders as a static underline.
 */
export function NavLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <NextLink
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative inline-flex items-center rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span>{label}</span>
      {active &&
        (reduce ? (
          <span aria-hidden className="absolute inset-x-3 -bottom-px h-px bg-accent" />
        ) : (
          <motion.span
            layoutId="nav-active-marker"
            aria-hidden
            className="absolute inset-x-3 -bottom-px h-px bg-accent"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        ))}
    </NextLink>
  );
}
