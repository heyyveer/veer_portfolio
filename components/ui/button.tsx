import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button primitive. One component, cva variants (COMPONENT_SYSTEM.md §5).
 * Do not create ButtonPrimary/etc. wrappers - use `variant`. One primary
 * per viewport; `cta` is reserved for the Contact section. Icon-only buttons
 * (size="icon") must pass an aria-label.
 *
 * Hover/press/focus are CSS-only here; richer motion (magnetic, underline
 * draw) is layered in the animation phase.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,box-shadow,opacity] outline-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:opacity-90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-muted",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        outline:
          "border border-border bg-transparent hover:border-accent/40 hover:bg-secondary",
        text: "px-0 text-foreground underline-offset-4 hover:underline",
        link: "px-0 text-accent underline-offset-4 hover:underline",
        cta: "bg-accent text-accent-foreground shadow-glow hover:brightness-110",
        accent: "bg-accent text-accent-foreground shadow-glow hover:brightness-110",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        default: "h-10 px-5",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
