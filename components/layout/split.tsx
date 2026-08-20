import * as React from "react";
import { cn } from "@/lib/utils";

type SplitProps = {
  children: React.ReactNode;
  className?: string;
  /** Reverse column order on desktop (alternating project rows). */
  reverse?: boolean;
};

/**
 * Two-column layout (content + aside, project showcase rows). Stacks to a
 * single column below `lg`. COMPONENT_SYSTEM.md §3.6.
 */
export function Split({ children, className, reverse = false }: SplitProps) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-2 lg:gap-12",
        reverse && "lg:[&>*:first-child]:order-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
