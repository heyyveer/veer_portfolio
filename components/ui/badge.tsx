import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge primitive (COMPONENT_SYSTEM.md §17). Pills; mono for tech/skill tags.
 * Status is never color-only - colored variants always carry a text label
 * (and a dot via StatusBadge / AvailabilityBadge).
 *
 * Usage:
 *  - Tech / skill tag:  <Badge variant="outline" className="font-mono">React</Badge>
 *  - Status pill:       <StatusBadge status="live" />
 *  - Availability:      <AvailabilityBadge />
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border text-foreground",
        accent:
          "border-transparent bg-accent/15 text-accent",
        success:
          "border-transparent bg-success/15 text-success",
        warning:
          "border-transparent bg-warning/15 text-warning",
        destructive:
          "border-transparent bg-destructive/15 text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

/* --- StatusBadge: project/repo status, color + dot + label (never color-only) --- */
const STATUS_MAP = {
  live: { variant: "success" as const, label: "Live", dot: "bg-success" },
  shipped: { variant: "accent" as const, label: "Shipped", dot: "bg-accent" },
  wip: { variant: "warning" as const, label: "WIP", dot: "bg-warning" },
  archived: {
    variant: "secondary" as const,
    label: "Archived",
    dot: "bg-muted-foreground",
  },
};

export type StatusBadgeProps = {
  status: keyof typeof STATUS_MAP;
  className?: string;
  /** Override the default label text. */
  label?: string;
};

export function StatusBadge({ status, className, label }: StatusBadgeProps) {
  const s = STATUS_MAP[status];
  return (
    <Badge variant={s.variant} className={cn("font-mono uppercase tracking-[0.12em]", className)}>
      <span className={cn("size-1.5 rounded-full", s.dot)} aria-hidden />
      {label ?? s.label}
    </Badge>
  );
}

/* --- AvailabilityBadge: mint tint + pulse dot (reduced-motion safe via CSS) --- */
export function AvailabilityBadge({
  className,
  label = "Available for work",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <Badge variant="success" className={cn("font-mono uppercase tracking-[0.12em]", className)}>
      <span className="relative grid place-items-center" aria-hidden>
        <span className="size-1.5 rounded-full bg-success" />
        <span className="absolute size-1.5 animate-ping rounded-full bg-success/60" />
      </span>
      {label}
    </Badge>
  );
}

export { badgeVariants };
