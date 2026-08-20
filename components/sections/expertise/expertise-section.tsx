"use client";

import * as React from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { BodyText, Caption } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";
import { expertiseAreas } from "@/lib/section-data";
import { cn } from "@/lib/utils";

const HEADING = "AI systems I build, end to end.";
// Scroll timeline: intro zoom-out, then heading reveal, then capability cycle.
const INTRO_END = 0.24;
const HEAD_START = 0.24;
const HEAD_END = 0.4;
const AREAS_START = 0.4;

/**
 * 03 - Expertise. Opens with a giant EXPERTISE word zoomed in; scrolling zooms
 * it out until it settles as a faint background watermark while the content
 * fades in. From there the pinned section is a capability switcher: the heading
 * resolves word by word, a numbered index tracks the active area (sliding
 * accent rail), and a glass panel swaps to its detail. Reduced motion / phones
 * → static stacked list.
 */
export function ExpertiseSection() {
  const reduce = useReducedMotion();
  const [isCompact, setIsCompact] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (reduce || isCompact) return <ExpertiseStatic />;
  return <ExpertiseSwitcher />;
}

function ExpertiseSwitcher() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const areas = expertiseAreas;
  const seg = (1 - AREAS_START) / areas.length;
  const [active, setActive] = React.useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(
      areas.length - 1,
      Math.max(0, Math.floor((v - AREAS_START) / seg)),
    );
    setActive(idx);
  });

  // Intro: the giant word zooms out to watermark size and dims; the content
  // scales/fades in behind it as the zoom completes.
  const wordScale = useTransform(progress, [0, INTRO_END], [3.4, 1]);
  const wordOpacity = useTransform(progress, [0, 0.04, INTRO_END], [0.5, 0.5, 0.07]);
  const contentOpacity = useTransform(progress, [0.12, INTRO_END], [0, 1]);
  const contentScale = useTransform(progress, [0.12, INTRO_END], [0.96, 1]);

  return (
    <section id="expertise" ref={ref} className="relative h-[460vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="signal-glow pointer-events-none absolute left-1/4 top-0 -z-10 h-[55vh] w-[60vh] opacity-50 blur-2xl"
        />
        {/* Zoom-out watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-[5] flex items-center justify-center"
        >
          <motion.span
            style={{ scale: wordScale, opacity: wordOpacity }}
            className="stroke-text select-none font-display text-[15vw] font-bold uppercase leading-none tracking-tight"
          >
            Expertise
          </motion.span>
        </div>
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-10 md:px-10 lg:px-16"
        >
          {/* Left — heading + capability index */}
          <div className="md:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Expertise
              </span>
            </div>
            <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
              <ScrollRevealText text={HEADING} progress={progress} range={[HEAD_START, HEAD_END]} />
            </h2>

            <ul className="mt-8 hidden md:block">
              {areas.map((a, i) => {
                const on = i === active;
                return (
                  <li
                    key={a.id}
                    className={cn(
                      "relative flex items-center gap-4 border-b border-border/40 py-3 transition-colors duration-300",
                      on ? "text-foreground" : "text-muted-foreground/55",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="exp-rail"
                        className="absolute left-0 h-7 w-0.5 rounded bg-accent"
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                      />
                    )}
                    <span className="pl-4 font-display text-lg tracking-tight sm:text-xl">
                      {a.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right — capabilities dealt one by one as a stack of cards */}
          <div className="relative h-[26rem] md:col-span-6 md:col-start-7">
            {areas.map((a, i) => {
              const depth = active - i;
              const future = i > active;
              return (
                <motion.div
                  key={a.id}
                  style={{ zIndex: future ? 0 : 10 + i }}
                  animate={{
                    y: future ? 96 : -Math.max(0, depth) * 16,
                    scale: future ? 0.92 : 1 - Math.max(0, depth) * 0.05,
                    opacity: future ? 0 : Math.max(0, 1 - depth * 0.26),
                  }}
                  transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className="absolute inset-0 flex flex-col justify-center overflow-hidden rounded-3xl border border-border/40 bg-card/15 p-8 shadow-2xl shadow-black/30 backdrop-blur-2xl will-change-transform sm:p-10"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
                  />
                  <div className="flex items-center justify-between">
                    <Caption as="span" className="text-accent">
                      {a.title}
                    </Caption>
                    {a.featured && (
                      <Caption as="span" className="text-muted-foreground">
                        Focus area
                      </Caption>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {a.title}
                  </h3>
                  <BodyText size="lg" className="mt-4 font-medium">
                    {a.keyMessage}
                  </BodyText>
                  <BodyText tone="muted" className="mt-2">
                    {a.support}
                  </BodyText>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {a.proof.map((p) => (
                      <Badge key={p} variant="outline" className="font-mono">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Reduced-motion / phone static fallback — full capability list. */
function ExpertiseStatic() {
  return (
    <section id="expertise" className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10 lg:px-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Expertise
          </span>
        </div>
        <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
          {HEADING}
        </h2>
        <div className="mt-10 space-y-4">
          {expertiseAreas.map((area, i) => (
            <div
              key={area.id}
              className="rounded-2xl border border-border/40 bg-card/10 p-6 backdrop-blur-xl"
            >

              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {area.title}
              </h3>
              <BodyText className="mt-2 font-medium">{area.keyMessage}</BodyText>
              <BodyText size="sm" tone="muted" className="mt-1">
                {area.support}
              </BodyText>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {area.proof.map((p) => (
                  <Badge key={p} variant="outline" className="font-mono">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
