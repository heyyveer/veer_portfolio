import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Icon wrapper enforcing the iconography rules (DESIGN.md §7, AGENTS.md):
 * lucide-react only, strokeWidth 1.5, inherits currentColor. Pass a label to
 * make it meaningful to screen readers; otherwise it is aria-hidden.
 */
const sizeMap = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const;

export type IconProps = {
  icon: LucideIcon;
  size?: keyof typeof sizeMap;
  className?: string;
  /** Accessible name. When omitted, the icon is decorative (aria-hidden). */
  label?: string;
};

export function Icon({ icon: IconComp, size = "sm", className, label }: IconProps) {
  return (
    <IconComp
      strokeWidth={1.5}
      className={cn(sizeMap[size], "shrink-0", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
