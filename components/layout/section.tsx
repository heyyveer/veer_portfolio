import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  /** Vertical rhythm preset (DESIGN.md §5.3). */
  size?: "sm" | "default" | "hero";
  /** Skip the centered max-width frame for edge-to-edge content. */
  fullBleed?: boolean;
};

const padding = {
  sm: "py-12 md:py-16 lg:py-20",
  default: "py-16 md:py-20 lg:py-24",
  hero: "py-20 md:py-28 lg:py-32",
};

/**
 * Section frame: vertical rhythm + the centered max-width container. Purely
 * structural; no decoration. COMPONENT_SYSTEM.md §3.2.
 */
export function Section({
  children,
  className,
  id,
  size = "default",
  fullBleed = false,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={cn(padding[size], className)} {...props}>
      {fullBleed ? children : <Container>{children}</Container>}
    </section>
  );
}
