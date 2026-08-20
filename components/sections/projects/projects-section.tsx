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
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout";
import { SectionHeader, BodyText } from "@/components/ui/typography";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { TextLink } from "@/components/ui/link";
import { Icon } from "@/components/ui/icon";
import { projects } from "@/lib/content";
import { projectImpact } from "@/lib/section-data";
import { cn } from "@/lib/utils";

const formatHost = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const HAS_CASE_STUDY = new Set(["sr-india-cards", "examys"]);
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·-";

// Scroll choreography breakpoints (fractions of the pinned scroll range).
const INTRO_END = 0.14; // glass card finishes zooming out from the corner
const NAMES_IN = 0.22; // project names flap in
const HEAD_END = 0.26; // heading settled → accordion travel begins

type Project = (typeof projects)[number];

/**
 * 05 - Selected Work as a pinned liquid-glass card. The card zooms out from a
 * corner to fill the viewport, the heading reveals on scroll, then as scroll
 * progresses each project accordion opens one by one (one at a time, so the
 * card never exceeds the viewport). Reduced motion / phones fall back to a
 * static vertical stack.
 */
export function ProjectsSection() {
  const reduce = useReducedMotion();
  const [isCompact, setIsCompact] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (reduce || isCompact) return <ProjectsStatic />;
  return <ProjectsBoard />;
}

/* ── Split-flap primitives ─────────────────────────────────────────────── */

function FlapCell({
  target,
  play,
  delay,
}: {
  target: string;
  play: boolean;
  delay: number;
}) {
  const [ch, setCh] = React.useState(" ");

  React.useEffect(() => {
    if (!play) return;
    const steps = 8 + Math.floor(Math.random() * 8);
    let i = 0;
    let spin: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      spin = setInterval(() => {
        i += 1;
        if (i >= steps) {
          setCh(target);
          if (spin) clearInterval(spin);
        } else {
          setCh(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        }
      }, 42);
    }, delay);
    return () => {
      clearTimeout(start);
      if (spin) clearInterval(spin);
    };
  }, [play, target, delay]);

  if (target === " ") return <span className="inline-block w-[0.34em]" />;

  return (
    <span className="relative inline-flex h-[1.18em] min-w-[0.66em] items-center justify-center overflow-hidden rounded-[3px] border border-border bg-card px-[0.1em] leading-none">
      <span
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-background/70"
      />
      {ch}
    </span>
  );
}

function FlapText({
  text,
  play,
  baseDelay = 0,
  charDelay = 50,
  className,
}: {
  text: string;
  play: boolean;
  baseDelay?: number;
  charDelay?: number;
  className?: string;
}) {
  const chars = React.useMemo(() => [...text.toUpperCase()], [text]);
  return (
    <span className={cn("inline-flex flex-wrap gap-[0.1em]", className)} aria-label={text}>
      {chars.map((c, i) => (
        <FlapCell
          key={`${c}-${i}`}
          target={c}
          play={play}
          delay={baseDelay + i * charDelay}
        />
      ))}
    </span>
  );
}

/* ── The pinned glass card ─────────────────────────────────────────────── */

function ProjectsBoard() {
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

  const n = projects.length;
  const [active, setActive] = React.useState(-1); // open accordion index
  const [namesIn, setNamesIn] = React.useState(false);
  const prevActive = React.useRef(-1);
  const namesRef = React.useRef(false);

  useMotionValueEvent(progress, "change", (v) => {
    const show = v >= NAMES_IN;
    if (show !== namesRef.current) {
      namesRef.current = show;
      setNamesIn(show);
    }
    let idx = -1;
    if (v >= HEAD_END) {
      const t = (v - HEAD_END) / (1 - HEAD_END);
      idx = Math.min(n - 1, Math.floor(t * n));
    }
    if (idx !== prevActive.current) {
      prevActive.current = idx;
      setActive(idx);
    }
  });

  // The card zooms out from a corner, then the heading reveals.
  const cardScale = useTransform(progress, [0, INTRO_END], [0.32, 1]);
  const cardOpacity = useTransform(progress, [0, INTRO_END * 0.5], [0, 1]);
  const headOpacity = useTransform(progress, [INTRO_END, HEAD_END], [0, 1]);
  const headScale = useTransform(progress, [INTRO_END, HEAD_END], [1.4, 1]);

  return (
    <section id="work" ref={ref} className="relative h-[560vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden p-3 md:p-6">
        {/* Ambient light behind the panel — gives the glass something to refract */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[24%] top-[22%] h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute bottom-[16%] right-[8%] h-80 w-80 rounded-full bg-foreground/10 blur-3xl" />
          <div className="absolute left-[18%] top-[55%] h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        </div>
        <div className="flex h-full w-full items-stretch gap-4 md:gap-8">
          {/* Heading — a vertical watermark on the left, zooms out on scroll */}
          <motion.div
            style={{ opacity: headOpacity, scale: headScale, originX: 0, originY: 0.5 }}
            className="relative flex shrink-0 items-center justify-center will-change-transform"
          >
            <h2 className="sr-only">Work — builds that shipped.</h2>
            <span
              aria-hidden
              className="select-none font-display text-[15vh] font-bold uppercase leading-none tracking-tight text-foreground/15 [writing-mode:vertical-rl] [transform:rotate(180deg)] sm:text-[19vh]"
            >
              Work
            </span>
          </motion.div>

          {/* The glass card — holds only the works */}
          <motion.div
            style={{
              scale: cardScale,
              opacity: cardOpacity,
              transformOrigin: "0% 0%",
            }}
            className="relative flex max-h-full flex-1 flex-col self-center overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card/25 via-card/10 to-card/20 p-6 shadow-2xl shadow-black/40 ring-1 ring-inset ring-foreground/10 backdrop-blur-2xl backdrop-saturate-150 will-change-transform md:p-8 lg:p-10"
          >
            {/* Specular top edge + corner sheen — the glass catches light */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-foreground/[0.08] blur-2xl"
            />

            {/* The board — accordions open one by one as scroll progresses */}
            <ol className="relative flex flex-col border-t border-border/60">
              {projects.map((project, i) => (
                <BoardRow
                  key={project.slug}
                  project={project}
                  isOpen={active === i}
                  play={namesIn}
                  onSelect={() => {
                    prevActive.current = i;
                    setActive(i);
                  }}
                />
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BoardRow({
  project,
  isOpen,
  play,
  onSelect,
}: {
  project: Project;
  isOpen: boolean;
  play: boolean;
  onSelect: () => void;
}) {
  return (
    <li className="border-b border-border/60">
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={isOpen}
        className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-5 text-left md:gap-8 md:py-7"
      >
        <FlapText
          text={project.title}
          play={play}
          className={cn(
            "font-mono text-lg font-semibold tracking-tight transition-colors sm:text-xl md:text-2xl",
            isOpen ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
          )}
        />

        <span className="flex items-center gap-4">
          <FlapText
            text={project.status}
            play={play}
            baseDelay={project.title.length * 50 + 120}
            charDelay={40}
            className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-accent sm:inline-flex"
          />
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="text-muted-foreground transition-colors group-hover:text-foreground"
          >
            <Icon icon={ArrowUpRight} size="sm" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="overflow-hidden"
          >
            <ProjectDetail project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12, ease: [0.2, 0.65, 0.3, 0.9] }}
      className="grid items-center gap-6 pb-6 pt-1 md:grid-cols-[1.3fr_1fr] md:gap-10 md:pb-8"
    >
      <div className="space-y-4">
        {projectImpact[project.slug] && (
          <BodyText className="max-w-[48ch] font-medium">
            {projectImpact[project.slug]}
          </BodyText>
        )}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <Badge key={t} variant="outline" className="font-mono">
              {t}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <TextLink href={project.liveUrl} external underline="hover">
            View live
            <Icon icon={ArrowUpRight} size="xs" />
          </TextLink>
          {HAS_CASE_STUDY.has(project.slug) && (
            <TextLink
              href={`/case-studies/${project.slug}`}
              tone="muted"
              underline="hover"
            >
              Read case study
            </TextLink>
          )}
        </div>
      </div>

      <div className="relative hidden aspect-[16/10] max-h-[26vh] overflow-hidden rounded-xl border border-border/60 bg-muted/40 md:block">
        {project.allowIframe !== false ? (
          <iframe
            src={project.liveUrl}
            className="absolute inset-0 w-[400%] h-[400%] scale-[0.25] origin-top-left border-0 pointer-events-none"
            title={project.title}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {formatHost(project.liveUrl)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/** Reduced-motion / phone static fallback — vertical stack of project cards. */
function ProjectsStatic() {
  return (
    <section id="work" className="overflow-hidden py-16 md:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow="Selected Work"
          title="Builds that shipped."
          lead="Production work across full stack, agentic AI, and developer tooling. Each links to the live build."
        />

        <div className="mt-12 flex flex-col gap-16 lg:mt-16">
          {projects.map((project) => (
            <article key={project.slug}>
              <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-10">
                <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-border bg-muted">
                  {project.allowIframe !== false ? (
                    <iframe
                      src={project.liveUrl}
                      className="absolute inset-0 w-[400%] h-[400%] scale-[0.25] origin-top-left border-0 pointer-events-none"
                      title={project.title}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {project.code} · {formatHost(project.liveUrl)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <StatusBadge status={project.status} />
                  <h3 className="font-display text-3xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  {projectImpact[project.slug] && (
                    <BodyText className="max-w-[52ch] font-medium">
                      {projectImpact[project.slug]}
                    </BodyText>
                  )}
                  <BodyText size="sm" tone="muted" className="max-w-[52ch]">
                    {project.summary}
                  </BodyText>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((t) => (
                      <Badge key={t} variant="outline" className="font-mono">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <TextLink href={project.liveUrl} external underline="hover">
                      View live
                      <Icon icon={ArrowUpRight} size="xs" />
                    </TextLink>
                    {HAS_CASE_STUDY.has(project.slug) && (
                      <TextLink
                        href={`/case-studies/${project.slug}`}
                        tone="muted"
                        underline="hover"
                      >
                        Read case study
                      </TextLink>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
