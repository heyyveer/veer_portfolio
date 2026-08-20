import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Feature card (COMPONENT_SYSTEM.md §16): radius-xl with the single accent
 * glow. Used at most once per section for the highlighted item. The glow
 * provides a 1px accent ring, so no separate border (border XOR shadow).
 */
export const FeatureCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl bg-card p-8 text-card-foreground shadow-glow",
      className,
    )}
    {...props}
  />
));
FeatureCard.displayName = "FeatureCard";
