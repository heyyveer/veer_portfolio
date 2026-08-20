"use client";

import * as React from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useReducedMotion,
  AnimatePresence,
  useMotionValueEvent
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CardHeading, BodyText } from "@/components/ui/typography";
import { InteractiveCard } from "@/components/cards";
import { Badge } from "@/components/ui/badge";
import { TextLink } from "@/components/ui/link";
import { Icon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { openSourceRepos, githubProfile } from "@/lib/section-data";
import type { OpenSourceRepo } from "@/types";
import { cn } from "@/lib/utils";

function RepoMeta({ repo }: { repo: OpenSourceRepo }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent" className="font-mono">{repo.category}</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <CardHeading>{repo.name}</CardHeading>
      </div>
      <p className="text-sm font-medium text-accent">{repo.tagline}</p>
      <BodyText size="sm" tone="muted" className="max-w-[60ch]">
        {repo.purpose}
      </BodyText>
      <div className="flex flex-wrap gap-1.5">
        {repo.tech.map((t) => (
          <Badge key={t} variant="outline" className="font-mono">{t}</Badge>
        ))}
      </div>
    </>
  );
}

function AnimatedValue({ children, id, className }: { children: React.ReactNode, id: string, className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 2, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -2, filter: "blur(2px)" }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TerminalFeature({ repo }: { repo: OpenSourceRepo }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card/25 via-card/10 to-card/20 shadow-2xl shadow-black/40 ring-1 ring-inset ring-foreground/10 backdrop-blur-2xl backdrop-saturate-150">
      {/* Mac Header */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border/40 bg-card/10 px-4">
        <div className="flex gap-1.5">
          <div className="size-3 rounded-full bg-border/50" />
          <div className="size-3 rounded-full bg-border/50" />
          <div className="size-3 rounded-full bg-border/50" />
        </div>
        <AnimatedValue id={repo.name} className="flex-1 text-center font-mono text-xs text-muted-foreground">
          zsh — {repo.name.toLowerCase().replace(/\s+/g, '-')}
        </AnimatedValue>
      </div>
      
      {/* Terminal Content */}
      <div className="flex-1 p-5 font-mono text-sm leading-relaxed text-foreground md:p-6 md:text-base">
        <div className="flex h-full flex-col">
          <div className="mb-6 flex flex-wrap gap-x-2">
            <span className="text-accent">npx</span>
            <span className="text-foreground">get-repo --name=</span>
            <AnimatedValue id={repo.name} className="w-auto">
              <span className="text-muted-foreground">"{repo.name.toLowerCase().replace(/\s+/g, '-')}"</span>
            </AnimatedValue>
          </div>
          
          <div className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-3 sm:grid-cols-[110px_1fr]">
             <span className="text-muted-foreground/70">name</span> 
             <AnimatedValue id={repo.name}>
               <span className="text-foreground">"{repo.name}"</span>
             </AnimatedValue>
             
             <span className="text-muted-foreground/70">category</span> 
             <AnimatedValue id={repo.name}>
               <span className="text-accent">{repo.category}</span>
             </AnimatedValue>
             
             <span className="text-muted-foreground/70">desc</span> 
             <AnimatedValue id={repo.name}>
               <span className="text-muted-foreground">"{repo.tagline}"</span>
             </AnimatedValue>

             <span className="text-muted-foreground/70">tech_stack</span>
             <AnimatedValue id={repo.name}>
               <span className="text-foreground">[{repo.tech.join(", ")}]</span>
             </AnimatedValue>
          </div>
          
          <div className="mt-5">
             <span className="text-muted-foreground/70">features</span>
             <AnimatedValue id={repo.name}>
               <ul className="mt-2 space-y-1.5">
                 {repo.features.map((f, index) => (
                   <li key={index} className="flex gap-3 text-muted-foreground">
                     <span className="text-accent">❯</span> <span>{f}</span>
                   </li>
                 ))}
               </ul>
             </AnimatedValue>
          </div>

          <div className="mt-auto flex items-center gap-3 pt-6">
             <TextLink href={repo.repoUrl} external className="text-accent hover:text-accent/80">
               <span className="border-b border-accent/30 pb-0.5 hover:border-accent">view_source_code</span>
               <Icon icon={ArrowUpRight} size="xs" className="ml-1 inline" />
             </TextLink>
             
             <motion.span 
               animate={{ opacity: [1, 0] }} 
               transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
               className="inline-block h-4 w-2 bg-foreground"
             />
          </div>
        </div>
      </div>
    </div>
  );
}

function DistroGlassCard({ repo, isActive }: { repo: OpenSourceRepo, isActive?: boolean }) {
  return (
    <div className={cn(
      "flex h-full flex-col overflow-hidden rounded-xl border p-0 backdrop-blur-2xl transition-all duration-500",
      isActive 
        ? "border-accent/40 bg-accent/5 shadow-[0_0_30px_rgba(var(--accent),0.1)] ring-1 ring-accent/20" 
        : "border-border/30 bg-card/10 hover:bg-card/15"
    )}>
      {/* Distro Glass Header */}
      <div className={cn(
        "flex h-10 items-center gap-2 border-b px-4 transition-colors", 
        isActive ? "border-accent/20 bg-accent/10" : "border-border/20 bg-muted/20"
      )}>
        <div className="flex gap-1.5">
           <div className="size-2.5 rounded-full bg-border/50" />
           <div className="size-2.5 rounded-full bg-border/50" />
           <div className="size-2.5 rounded-full bg-border/50" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex h-full flex-col gap-5">
          <RepoMeta repo={repo} />
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent transition-colors group-hover:text-foreground">
            View on GitHub
            <Icon icon={ArrowUpRight} size="xs" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function OpenSourceSection() {
  const reduce = useReducedMotion();
  const [isCompact, setIsCompact] = React.useState(false);

  React.useEffect(() => {
    // We use horizontal scroll for screens >= 1024px (lg)
    const check = () => setIsCompact(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (reduce || isCompact) return <OpenSourceStatic />;
  return <OpenSourceDynamic />;
}

function OpenSourceDynamic() {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = React.useState(1000); // Fallback until measured

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  
  const springProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.5 });

  const repos = openSourceRepos;
  const n = repos.length;
  const [active, setActive] = React.useState(0);

  const INTRO_END = 0.22;
  const TRAVEL_START = 0.22;

  React.useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current && containerRef.current) {
        // Total width of the track minus the width of the visible container
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        // The maximum distance we can scroll left before the right edge comes into view.
        // We add 32px to give a nice little padding at the end of the scroll.
        setScrollRange(Math.max(0, trackWidth - containerWidth + 32));
      }
    };
    
    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const progressAfterIntro = Math.max(0, (v - TRAVEL_START) / (1 - TRAVEL_START));
    let idx = Math.floor(progressAfterIntro * n);
    if (idx >= n) idx = n - 1;
    if (idx < 0) idx = 0;
    if (idx !== active) setActive(idx);
  });

  // Exact horizontal travel distance
  const x = useTransform(springProgress, [TRAVEL_START, 1], [0, -scrollRange]);

  // Intro choreo transforms: Start centered & large, move to top as a watermark
  const headerScale = useTransform(springProgress, [0, INTRO_END], [1.5, 1]);
  const headerY = useTransform(springProgress, [0, INTRO_END], ["30vh", "0vh"]);
  const devToolsOpacity = useTransform(springProgress, [0, INTRO_END], [1, 0.06]);
  const textOpacity = useTransform(springProgress, [0, INTRO_END], [1, 0]);
  
  const contentOpacity = useTransform(springProgress, [INTRO_END * 0.7, INTRO_END], [0, 1]);
  const contentY = useTransform(springProgress, [INTRO_END * 0.7, INTRO_END], [40, 0]);
  const contentPointerEvents = useTransform(springProgress, (v) => v > INTRO_END * 0.8 ? "auto" : "none");

  return (
    <section id="open-source" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden">
        
        {/* Header - Starts centered, becomes watermark at the top */}
        <motion.div 
          style={{ y: headerY, scale: headerScale }}
          className="absolute inset-x-0 top-0 z-0 flex flex-col items-center pt-16 text-center md:pt-20 lg:pt-24 will-change-transform"
        >
          <motion.div style={{ opacity: textOpacity }} className="mb-4 flex items-center justify-center gap-3">
             <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
               Open Source
             </span>
             <span className="h-px w-10 bg-border" />
          </motion.div>
          
          <motion.h2 
            style={{ opacity: devToolsOpacity }}
            className="select-none font-display text-[14vw] font-bold uppercase leading-none tracking-tighter text-foreground sm:text-[12vw]"
          >
            Dev Tools
          </motion.h2>
          
          <motion.div style={{ opacity: textOpacity }} className="mx-auto mt-6 max-w-[50ch] text-balance">
            <BodyText tone="muted">
              Developer tools, AI infrastructure, and modern web apps that help developers ship faster and build smarter.
            </BodyText>
          </motion.div>
        </motion.div>

        {/* Content Area revealed after intro */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY, pointerEvents: contentPointerEvents as any }}
          className="absolute inset-0 z-10 flex min-h-0 items-center gap-10 pl-6 pt-[20vh] md:pl-10 lg:pl-16"
        >
          {/* Left: Terminal */}
          <div className="relative h-full max-h-[600px] w-[35vw] min-w-[420px] max-w-xl shrink-0">
             <TerminalFeature repo={repos[active]} />
          </div>

          {/* Right: Scrolling Track */}
          <div ref={containerRef} className="relative h-full max-h-[600px] flex-1 overflow-hidden">
             <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
             
             <motion.div 
               ref={trackRef}
               style={{ x }} 
               className="absolute inset-y-0 left-0 flex items-stretch gap-6 pr-8 w-max"
             >
               {repos.map((repo, i) => (
                  <div key={repo.name} className="w-[400px] shrink-0">
                    <a href={repo.repoUrl} target="_blank" rel="noopener noreferrer" className="group block h-full">
                      <DistroGlassCard repo={repo} isActive={i === active} />
                    </a>
                  </div>
               ))}
               
               {/* Final "View more" */}
               <div className="flex w-[240px] shrink-0 items-center justify-center">
                  <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 text-muted-foreground transition-colors hover:text-foreground">
                    <div className="flex size-16 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                      <Icon icon={ArrowUpRight} size="md" />
                    </div>
                    <span className="font-mono text-sm uppercase tracking-widest text-foreground/70 group-hover:text-foreground">More on GitHub</span>
                  </a>
               </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OpenSourceStatic() {
  const repos = openSourceRepos;

  return (
    <section id="open-source" className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full px-6 md:px-10 lg:px-16">
        <Reveal variant="mask-up" className="flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-3">
             <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
               Open Source
             </span>
             <span className="h-px w-10 bg-border" />
          </div>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tighter text-foreground sm:text-5xl">
            Dev Tools
          </h2>
          <BodyText tone="muted" className="mx-auto mt-6 max-w-[50ch] text-balance">
            Developer tools, AI infrastructure, and modern web apps that help developers ship faster and build smarter.
          </BodyText>
        </Reveal>

        <div className="mt-16 space-y-6">
          <Stagger variant="scale-in" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <StaggerItem key={repo.name}>
                <a href={repo.repoUrl} target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <DistroGlassCard repo={repo} />
                </a>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="pt-4 text-center">
            <TextLink href={githubProfile} external tone="muted" underline="hover">
              See more on GitHub
              <Icon icon={ArrowUpRight} size="xs" />
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}


