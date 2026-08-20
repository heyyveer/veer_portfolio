"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { BodyText, Quote } from "@/components/ui/typography";
import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";
import { identity, advancedTopics } from "@/lib/content";

const HEADING = "I build intelligent systems that solve real problems.";

type Entry = { label: string; node: React.ReactNode };

/**
 * 02 - About, as an editorial "dossier".
 */
export function AboutSection() {
  const reduce = useReducedMotion();
  const [isCompact, setIsCompact] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (reduce || isCompact) return <AboutStatic />;
  return <AboutScroll />;
}

function AboutScroll() {
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

  const entries = dossierEntries();
  const ITEM_START = 0.34;
  const ITEM_END = 0.78;
  const step = (ITEM_END - ITEM_START) / entries.length;

  return (
    <section id="about" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Giant outlined watermark */}
        <span
          aria-hidden
          className="stroke-text pointer-events-none absolute -left-[1vw] bottom-[2vh] select-none font-display text-[26vw] font-bold uppercase leading-none opacity-[0.07]"
        >
          About
        </span>

        {/* Accent wash */}
        <div
          aria-hidden
          className="signal-glow pointer-events-none absolute right-0 top-0 -z-10 h-[50vh] w-[55vh] opacity-50 blur-2xl"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-10 md:px-10 lg:px-16">
          {/* Left */}
          <div className="md:col-span-5">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Identity / Dossier
              </span>
            </div>

            <h2 className="font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              <ScrollRevealText
                text={HEADING}
                progress={progress}
                range={[0, 0.32]}
              />
            </h2>

            <div className="mt-8 hidden items-center gap-3 md:flex">
              <span className="grid size-9 place-items-center rounded-md border border-border bg-card/40 font-mono text-[11px] tracking-wider">
                {identity.initials}
              </span>

              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                {identity.role} · {identity.location}
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-6 md:col-start-7">
            <div className="space-y-6">
              {entries.map((entry, i) => {
                const s = ITEM_START + i * step;
                const e = Math.min(1, s + step * 1.5);

                return (
                  <RevealItem
                    key={entry.label}
                    progress={progress}
                    range={[s, e]}
                  >
                    <DossierEntry entry={entry} />
                  </RevealItem>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DossierEntry({ entry }: { entry: Entry }) {
  return (
    <div className="border-t border-border/60 pt-4">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {entry.label}
        </span>

        <span
          aria-hidden
          className="ml-auto h-3 w-px -skew-x-[24deg] bg-accent/60"
        />
      </div>

      <div className="mt-3">{entry.node}</div>
    </div>
  );
}

function RevealItem({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const x = useTransform(progress, range, [-32, 0]);
  const blur = useTransform(progress, range, [6, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{ opacity, x, filter }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

function dossierEntries(): Entry[] {
  return [
    {
      label: "Intro",
      node: (
        <BodyText size="lg">
          I&apos;m Veer Tiwari, an AI / ML engineer focused on building
          practical intelligent systems across machine learning, deep
          learning, NLP, computer vision, and Generative AI.
        </BodyText>
      ),
    },

    {
      label: "Now",
      node: (
        <dl className="space-y-2 text-sm">
          {(
            [
              ["Building", "AI / ML & Generative AI projects"],
              ["Focus", "RAG, NLP, Deep Learning, AI systems"],
              ["Education", "B.Tech CSE — Data Science"],
              ["Status", identity.status],
            ] as [string, string][]
          ).map(([k, v]) => (
            <div
              key={k}
              className="flex items-baseline justify-between gap-4"
            >
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-mono">{v}</dd>
            </div>
          ))}
        </dl>
      ),
    },

    {
      label: "Focus",
      node: (
        <div className="flex flex-wrap gap-2">
          {advancedTopics.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-border/60 bg-card/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
      ),
    },

    {
      label: "Ethos",
      node: (
        <Quote className="border-none p-0 text-foreground/90">
          I focus on understanding the problem first, then choose the
          simplest technology that can solve it well.
        </Quote>
      ),
    },
  ];
}

/** Reduced-motion / phone static fallback — same dossier, no pin. */
function AboutStatic() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <span
        aria-hidden
        className="stroke-text pointer-events-none absolute -left-[1vw] bottom-0 select-none font-display text-[30vw] font-bold uppercase leading-none opacity-[0.06]"
      >
        About
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10 lg:px-16">
        <div className="md:col-span-5">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Identity / Dossier
            </span>
          </div>

          <h2 className="font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl">
            {HEADING}
          </h2>
        </div>

        <div className="space-y-6 md:col-span-6 md:col-start-7">
          {dossierEntries().map((entry) => (
            <DossierEntry key={entry.label} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}