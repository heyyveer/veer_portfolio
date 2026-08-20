import * as React from "react";
import NextLink from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Text link (COMPONENT_SYSTEM.md §11.2, §18.2). Inline links keep a
 * persistent underline; nav-style links draw the accent underline on hover
 * (CSS-only via an ::after element). Internal hrefs use next/link; external
 * hrefs render a plain anchor with safe rel.
 */
const textLink = cva(
  "inline-flex items-center gap-1 rounded-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      tone: {
        default: "text-foreground hover:text-accent",
        muted: "text-muted-foreground hover:text-foreground",
        accent: "text-accent",
      },
      underline: {
        always: "underline underline-offset-4 decoration-accent",
        hover:
          "relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100",
        none: "",
      },
    },
    defaultVariants: { tone: "default", underline: "hover" },
  },
);

export type TextLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof textLink> & {
    href: string;
    /** Render a plain anchor with target/rel for off-site links. */
    external?: boolean;
  };

export function TextLink({
  href,
  external = false,
  tone,
  underline,
  className,
  children,
  ...props
}: TextLinkProps) {
  const classes = cn(textLink({ tone, underline }), className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...props}>
      {children}
    </NextLink>
  );
}

export { textLink };
