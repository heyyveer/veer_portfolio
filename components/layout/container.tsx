import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The centered content frame: max-width 1280px with responsive horizontal
 * padding (DESIGN.md §5.3, §3.8). Used by Section and anywhere the same
 * frame is needed outside a section (nav bar, footer). COMPONENT_SYSTEM.md §3.
 */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16", className)}>
      {children}
    </div>
  );
}
