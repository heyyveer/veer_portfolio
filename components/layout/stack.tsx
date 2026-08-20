import * as React from "react";
import { cn } from "@/lib/utils";

type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: "col" | "row";
  gap?: 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
};

const gapMap = {
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};
const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};
const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

/**
 * One-dimensional flow with a token gap. Prefer this over ad-hoc flex so
 * spacing stays on the scale (DESIGN.md §5). COMPONENT_SYSTEM.md §3.5.
 */
export function Stack({
  children,
  className,
  direction = "col",
  gap = 4,
  align,
  justify,
  wrap = false,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && "flex-wrap",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
