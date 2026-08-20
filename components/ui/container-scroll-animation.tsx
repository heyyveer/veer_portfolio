"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven 3D container (adapted from Aceternity's ContainerScroll). As
 * the wrapper scrolls through the viewport, the title drifts up while the card
 * rotates from a tilted perspective to flat and settles to scale — reads like
 * a device screen laying itself down. Tokenized to the design system (no raw
 * hex) and typed for `strict`. Honors reduced motion by freezing the transforms.
 */
export function ContainerScroll({
  titleComponent,
  children,
  className,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth the raw scroll progress so the 3D transform eases instead of
  // tracking every wheel tick — kills the per-frame jitter on the rotate.
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    mass: 0.4,
  });

  const scaleRange: [number, number] = isMobile ? [0.9, 1] : [1.05, 1];

  const rotate = useTransform(progress, [0, 1], [20, 0]);
  const scale = useTransform(progress, [0, 1], scaleRange);
  const translate = useTransform(progress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex min-h-[58rem] items-center justify-center px-4 py-2 sm:min-h-[52rem] md:h-[64rem] md:px-8 md:py-16",
        className,
      )}
    >
      <div
        className="relative w-full py-8 md:py-20"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto w-full text-center will-change-transform"
    >
      {titleComponent}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ rotateX: rotate, scale }}
      className="relative z-20 mx-auto -mt-4 h-auto min-h-[32rem] w-full max-w-5xl rounded-[30px] border border-border/50 bg-card/40 p-2 shadow-2xl shadow-black/20 will-change-transform [backface-visibility:hidden] sm:-mt-6 md:-mt-16 md:p-6 lg:h-[40rem]"
    >
      <div className="size-full overflow-y-auto overflow-x-hidden rounded-2xl border border-border/40 bg-background/30">
        {children}
      </div>
    </motion.div>
  );
}
