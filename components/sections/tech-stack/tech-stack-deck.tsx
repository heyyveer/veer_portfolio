"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout, Server, BrainCircuit, Database, Wrench, Cloud } from "lucide-react";
import { TechGroup } from "@/lib/section-data";
import { cn } from "@/lib/utils";

export function TechStackDeck({ groups }: { groups: TechGroup[] }) {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const getIconForGroup = (label: string) => {
    switch (label.toLowerCase()) {
      case "frontend": return Layout;
      case "backend": return Server;
      case "ai": return BrainCircuit;
      case "database": return Database;
      case "tooling": return Wrench;
      case "cloud": return Cloud;
      default: return Layout;
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Typography Zoom Out
  const textScale = useTransform(scrollYProgress, [0, 0.35], [3.5, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [100, 0]);

  return (
    <div ref={containerRef} className="hidden lg:block relative h-[600vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center gap-16 overflow-hidden px-12 xl:gap-32">
        {/* Left: Stacked Deck */}
        <div className="relative w-[600px] h-[650px] shrink-0">
          {groups.map((group, i) => {
            // Cards STRICTLY wait until text animation is 100% complete.
            // Text ends at 0.35. Cards start dealing at 0.45.
            const step = 0.55 / groups.length;
            const start = 0.45 + i * step;
            const end = start + step;

            const cardX = useTransform(scrollYProgress, [start, end], [1200, 0]);
            const cardY = useTransform(scrollYProgress, [start, end], [800, 0]);
            const cardScale = useTransform(scrollYProgress, [start, end], [0.8, 1]);

            return (
              <motion.div
                key={group.label}
                className="absolute"
                style={{
                  top: i * 45,
                  left: i * 45,
                  zIndex: hoveredIdx === i ? 50 : i,
                  x: cardX,
                  y: cardY,
                  scale: cardScale,
                }}
              >
                <div
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={cn(
                    "w-[360px] aspect-[4/5] rounded-2xl border border-border/50 bg-gradient-to-br from-card/25 via-card/10 to-card/20 shadow-2xl shadow-black/40 ring-1 ring-inset ring-foreground/10 backdrop-blur-2xl backdrop-saturate-150 flex flex-col justify-between transition-all duration-500 cursor-default",
                    hoveredIdx === i 
                      ? "-translate-y-8 -translate-x-8 shadow-[0_40px_80px_rgba(0,0,0,0.6)] scale-105 border-accent/40 ring-accent/20" 
                      : hoveredIdx !== null && hoveredIdx > i
                        ? "-translate-x-4 -translate-y-4 opacity-50"
                        : hoveredIdx !== null && hoveredIdx < i
                          ? "translate-x-4 translate-y-4 opacity-50"
                          : ""
                  )}
                >
                  {/* Icon instead of Huge Number */}
                  <div className={cn(
                    "px-8 pt-8 transition-colors duration-500",
                    hoveredIdx === i ? "text-accent" : "text-accent/30"
                  )}>
                    {React.createElement(getIconForGroup(group.label), {
                      size: 100,
                      strokeWidth: 1.5,
                      className: "drop-shadow-2xl"
                    })}
                  </div>
                  
                  {/* Bottom Content */}
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {group.items.map(item => (
                        <span 
                          key={item} 
                          className={cn(
                            "px-3 py-1.5 text-[11px] font-mono font-semibold border rounded-full transition-colors duration-300",
                            hoveredIdx === i 
                              ? "border-accent bg-accent/10 text-accent" 
                              : "border-border/60 bg-background/50 text-foreground"
                          )}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-4xl font-display font-black uppercase leading-none tracking-tight">
                      {group.label}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Typography (Lenis Style) */}
        <motion.div 
          className="flex w-fit shrink-0 flex-col items-end origin-right"
          style={{ scale: textScale, y: textY }}
        >
          <h2 className="text-right text-[6rem] xl:text-[7.5rem] font-display font-black uppercase leading-[0.85] tracking-tighter">
            Chosen Tools <br/>
            <span className="text-muted-foreground/40">And Why</span>
          </h2>
          <p className="mt-8 text-right text-xl text-muted-foreground max-w-md font-medium">
            The stack I reach for, grouped by what it solves. Server-first interfaces, scalable data models, and agentic AI integrations.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
