import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Typography components. Enforce the fluid type scale (DESIGN.md §4,
 * COMPONENT_SYSTEM.md §18) so sizes never drift to ad-hoc values. Sizes read
 * from the `--text-*` theme tokens defined in globals.css.
 *
 * Voice of the system: Geist for display/heading, Inter for body, Instrument
 * Serif for the single editorial Quote per section, Geist Mono for Caption.
 */

/* --- Display (h1) — hero + major openers; one per page --- */
const displayHeading = cva(
  "font-display font-semibold text-balance text-foreground",
  {
    variants: { size: { xl: "text-display-xl", l: "text-display-l" } },
    defaultVariants: { size: "xl" },
  },
);

export type DisplayHeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof displayHeading>;

export function DisplayHeading({
  className,
  size,
  ...props
}: DisplayHeadingProps) {
  return <h1 className={cn(displayHeading({ size }), className)} {...props} />;
}

/* --- Section heading (h2) --- */
const sectionHeading = cva(
  "font-display font-semibold text-balance text-foreground",
  {
    variants: { size: { h1: "text-h1", h2: "text-h2" } },
    defaultVariants: { size: "h2" },
  },
);

export type SectionHeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof sectionHeading>;

export function SectionHeading({
  className,
  size,
  ...props
}: SectionHeadingProps) {
  return <h2 className={cn(sectionHeading({ size }), className)} {...props} />;
}

/* --- Card heading (h3) --- */
const cardHeading = cva("font-display font-semibold text-foreground", {
  variants: { size: { h3: "text-h3", h4: "text-h4" } },
  defaultVariants: { size: "h3" },
});

export type CardHeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof cardHeading>;

export function CardHeading({ className, size, ...props }: CardHeadingProps) {
  return <h3 className={cn(cardHeading({ size }), className)} {...props} />;
}

/* --- Body text (p) — capped at 68ch by the reading frame --- */
const bodyText = cva("text-pretty text-foreground", {
  variants: {
    size: {
      default: "text-base leading-relaxed",
      lg: "text-body-lg leading-relaxed",
      sm: "text-sm leading-normal",
    },
    tone: { default: "", muted: "text-muted-foreground" },
  },
  defaultVariants: { size: "default", tone: "default" },
});

export type BodyTextProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof bodyText>;

export function BodyText({ className, size, tone, ...props }: BodyTextProps) {
  return <p className={cn(bodyText({ size, tone }), className)} {...props} />;
}

/* --- Caption — the only uppercase text in the product (mono eyebrow) --- */
export type CaptionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "span" | "p";
};

export function Caption({ className, as = "p", ...props }: CaptionProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/* --- Label (form labels) --- */
export type LabelTextProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function LabelText({ className, ...props }: LabelTextProps) {
  return (
    <label
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  );
}

/* --- Quote — serif editorial accent; one per section --- */
export type QuoteProps = React.HTMLAttributes<HTMLQuoteElement>;

export function Quote({ className, ...props }: QuoteProps) {
  return (
    <blockquote
      className={cn(
        "font-serif-editorial text-editorial text-balance text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/* --- Prose — long-form body (case study / about), tnum on numerals --- */
export type ProseProps = React.HTMLAttributes<HTMLDivElement>;

export function Prose({ className, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        "max-w-[68ch] space-y-5 text-base leading-relaxed text-foreground tnum",
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold [&_h3]:font-display [&_h3]:text-h3",
        className,
      )}
      {...props}
    />
  );
}

/* --- SectionHeader — eyebrow (index + label) + heading + optional lead --- */
export type SectionHeaderProps = {
  /** Eyebrow label, e.g. "Expertise". */
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Heading scale; defaults to h2. */
  size?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  size = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("space-y-4", className)}>
      {eyebrow && (
        <Caption>
          {eyebrow}
        </Caption>
      )}
      <SectionHeading size={size}>{title}</SectionHeading>
      {lead && (
        <BodyText size="lg" tone="muted" className="max-w-[60ch]">
          {lead}
        </BodyText>
      )}
    </header>
  );
}
