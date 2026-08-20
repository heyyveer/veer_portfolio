"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { BodyText, Caption } from "@/components/ui/typography";
import { experience } from "@/lib/content";
import { cn } from "@/lib/utils";

const HEADING = "A focused path into AI engineering.";
const DESCRIPTION =
  "Building my foundation through engineering experience, machine learning, and hands-on AI systems.";

const INTRO_END = 0.22;
const TRAVEL_START = INTRO_END;

// Oldest → newest
const STATIONS = [...experience].reverse();

const yearOf = (s: string) => Number(s.split(" ").pop());

/**
 * 04 - Experience, as a year odometer.
 *
 * A giant year rolls through the timeline while the active
 * experience entry changes with scroll progress.
 */
export function ExperienceSection() {
  const reduce = useReducedMotion();
  const [isCompact, setIsCompact] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  if (reduce || isCompact) return <ExperienceStatic />;

  return <ExperienceOdometer />;
}

function ExperienceOdometer() {
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

  const n = STATIONS.length;

  const [active, setActive] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const [settled, setSettled] = React.useState(false);

  const prevActive = React.useRef(0);
  const settledRef = React.useRef(false);

  const year = yearOf(STATIONS[active].start);

  useMotionValueEvent(progress, "change", (v) => {
    const t = Math.min(
      1,
      Math.max(0, (v - TRAVEL_START) / (1 - TRAVEL_START)),
    );

    const idx = Math.min(
      n - 1,
      Math.round(t * (n - 1)),
    );

    if (idx !== prevActive.current) {
      setDir(idx > prevActive.current ? 1 : -1);
      prevActive.current = idx;
      setActive(idx);
    }

    const isSettled = v >= INTRO_END * 0.9;

    if (isSettled !== settledRef.current) {
      settledRef.current = isSettled;
      setSettled(isSettled);
    }
  });

  const role = STATIONS[active];

  const titleScale = useTransform(
    progress,
    [0, INTRO_END],
    [3, 1],
  );

  const titleY = useTransform(
    progress,
    [0, INTRO_END],
    [0, -205],
  );

  const reveal = useTransform(
    progress,
    [INTRO_END * 0.55, INTRO_END],
    [0, 1],
  );

  const watermarkOpacity = useTransform(
    progress,
    [INTRO_END * 0.55, INTRO_END],
    [0, 0.07],
  );

  return (
    <section
      id="experience"
      ref={ref}
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Rolling year */}
        <motion.div
          aria-hidden
          style={{ opacity: watermarkOpacity }}
          className="pointer-events-none absolute inset-0 -z-[5] flex items-center justify-center overflow-hidden"
        >
          <div className="relative h-[1em] overflow-hidden font-display text-[34vw] font-bold leading-none tracking-tight tnum text-foreground sm:text-[28vw]">
            <AnimatePresence
              mode="popLayout"
              initial={false}
            >
              <motion.span
                key={year}
                initial={{
                  y: dir > 0 ? "100%" : "-100%",
                }}
                animate={{ y: "0%" }}
                exit={{
                  y: dir > 0 ? "-100%" : "100%",
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
                className="block will-change-transform"
              >
                {year}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div
          style={{
            scale: titleScale,
            y: titleY,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Experience
            </span>
          </div>

          <h2
            className={cn(
              "font-display text-3xl font-semibold leading-[1.0] tracking-tight transition-colors duration-300 sm:text-4xl",
              settled
                ? "text-muted-foreground"
                : "text-foreground",
            )}
          >
            Trajectory
          </h2>

          <BodyText
            tone="muted"
            className="mx-auto mt-3 max-w-[42ch]"
          >
            {DESCRIPTION}
          </BodyText>
        </motion.div>

        {/* Experience content */}
        <motion.div
          style={{ opacity: reveal }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="relative min-h-[14rem] w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{
                  opacity: 0,
                  y: dir > 0 ? 24 : -24,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: dir > 0 ? -24 : 24,
                  filter: "blur(8px)",
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
                className="will-change-transform"
              >
                <Caption as="span" className="text-accent">
                  {role.start} → {role.end}
                  {role.current ? " · Now" : ""}
                </Caption>

                <h3 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  {role.role}
                </h3>

                <p className="mt-3 font-mono text-sm uppercase tracking-[0.18em] text-accent">
                  {role.org}
                </p>

                <BodyText
                  size="lg"
                  tone="muted"
                  className="mx-auto mt-4 max-w-[55ch]"
                >
                  {role.note}
                </BodyText>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-2.5">
            {STATIONS.map((s, i) => (
              <span
                key={`${s.org}-${s.start}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active
                    ? "w-7 bg-accent"
                    : "w-1.5 bg-border",
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Reduced-motion / phone static fallback */
function ExperienceStatic() {
  return (
    <section
      id="experience"
      className="py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-3xl px-6 md:px-10 lg:px-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Trajectory
          </span>
        </div>

        <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
          {HEADING}
        </h2>

        <ol className="mt-10 space-y-px border-l border-border pl-6">
          {experience.map((role) => (
            <li
              key={`${role.org}-${role.start}`}
              className="relative py-6"
            >
              <span
                aria-hidden
                className="absolute -left-[1.5rem] top-7 size-2.5 -translate-x-1/2 rounded-full border border-border bg-card"
              >
                {role.current && (
                  <span className="absolute inset-0 rounded-full bg-accent" />
                )}
              </span>

              <Caption
                as="span"
                className="normal-case tracking-[0.16em]"
              >
                <time>{role.start}</time>
                {" → "}
                <time>{role.end}</time>
              </Caption>

              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                {role.role}
              </h3>

              <p className="mt-1 text-sm font-medium text-accent">
                {role.org}
              </p>

              <BodyText
                size="sm"
                tone="muted"
                className="mt-2 max-w-[60ch]"
              >
                {role.note}
              </BodyText>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}