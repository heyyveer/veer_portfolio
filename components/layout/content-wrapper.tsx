import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Reading-width frame for long-form copy (about narrative, case-study body).
 * Caps line length at ~68ch (DESIGN.md §4.4, §3.8). COMPONENT_SYSTEM.md §3.3.
 */
export function ContentWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("w-full max-w-[68ch]", className)}>{children}</div>;
}
