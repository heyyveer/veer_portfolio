import * as React from "react";
import { Card } from "@/components/ui/card";
import { Caption, CardHeading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * Story card (COMPONENT_SYSTEM.md §16): editorial shell with an optional mono
 * eyebrow and a serif sub-head over prose content. Used by timeline items and
 * case-study blocks. Structural only; no motion.
 */
export type StoryCardProps = React.HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title?: React.ReactNode;
};

export const StoryCard = React.forwardRef<HTMLDivElement, StoryCardProps>(
  ({ className, eyebrow, title, children, ...props }, ref) => (
    <Card ref={ref} className={cn("p-6 md:p-8", className)} {...props}>
      {eyebrow && <Caption className="mb-3">{eyebrow}</Caption>}
      {title && (
        <CardHeading className="font-serif-editorial">{title}</CardHeading>
      )}
      {children && <div className={cn(title && "mt-4")}>{children}</div>}
    </Card>
  ),
);
StoryCard.displayName = "StoryCard";
