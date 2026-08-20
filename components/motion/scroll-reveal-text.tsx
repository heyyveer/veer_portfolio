"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollRevealTextProps = {
  text: string;
  /** Scroll progress (0..1) that drives the reveal. */
  progress: MotionValue<number>;
  /** Sub-range of `progress` over which all words resolve. */
  range?: [number, number];
  className?: string;
};

/**
 * ReactBits-style scroll reveal: words resolve one after another (dim + blurred
 * to crisp) as the driving scroll progress advances across `range`. The reveal
 * is fed an external progress value so it can be sequenced inside a pinned
 * section rather than relying on the text scrolling through the viewport.
 */
export function ScrollRevealText({
  text,
  progress,
  range = [0, 1],
  className,
}: ScrollRevealTextProps) {
  const words = text.split(" ");
  const [start, end] = range;
  const span = end - start;
  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => {
        const wordStart = start + (i / words.length) * span;
        const wordEnd = start + ((i + 1) / words.length) * span;
        return (
          <Word key={`${word}-${i}`} progress={progress} range={[wordStart, wordEnd]}>
            {word}
          </Word>
        );
      })}
    </span>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, [10, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <span className="mr-[0.25em] inline-block">
      <motion.span style={{ opacity, filter }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}
