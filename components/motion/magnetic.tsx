"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  /** Fraction of cursor offset applied (0-1). */
  strength?: number;
  /** Max travel in px. */
  max?: number;
};

/**
 * Magnetic pull for a primary CTA (ANIMATION_SYSTEM.md §18.1). Desktop +
 * fine-pointer only; disabled under reduced motion (renders a plain inline
 * wrapper). Travel is clamped and spring-damped (no overshoot).
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  max = 8,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    setEnabled(
      typeof window !== "undefined" &&
        window.matchMedia("(pointer: fine)").matches &&
        !reduce,
    );
  }, [reduce]);

  if (!enabled) {
    return <span className={cn("inline-flex", className)}>{children}</span>;
  }

  const clamp = (v: number) => Math.max(-max, Math.min(max, v));
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}
