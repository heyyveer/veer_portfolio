import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The responsive 12-column grid (4 / 8 / 12 with gutters 16 / 24 / 32).
 * DESIGN.md §6, COMPONENT_SYSTEM.md §3.4. Children set their own col spans.
 */
export function Grid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-6 lg:grid-cols-12 lg:gap-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
