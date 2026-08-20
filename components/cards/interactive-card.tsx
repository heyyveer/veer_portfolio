import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Interactive card shell (COMPONENT_SYSTEM.md §16). Adds the resting->hover
 * affordance: lift + shadow-lg + accent border, plus a `group` so inner media
 * can scale. Motion is CSS-only here (transform/opacity); Framer polish is
 * layered in the animation phase. Wrap the whole card in a single link at the
 * call site for a card-link.
 */
export const InteractiveCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "group overflow-hidden transition-[transform,box-shadow,border-color] duration-200 ease-out",
      "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg",
      "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
      className,
    )}
    {...props}
  />
));
InteractiveCard.displayName = "InteractiveCard";
