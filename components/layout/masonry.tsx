import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-columns masonry for irregular galleries / bento grids. Uses native CSS
 * columns (no JS masonry) to avoid layout thrash and CLS. Source order equals
 * reading order. COMPONENT_SYSTEM.md §3.7.
 */
export function Masonry({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "columns-1 gap-4 sm:columns-2 md:gap-6 lg:columns-3 lg:gap-8 [&>*]:mb-4 [&>*]:break-inside-avoid md:[&>*]:mb-6 lg:[&>*]:mb-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
