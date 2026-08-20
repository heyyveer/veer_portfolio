import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The `<main>` landmark wrapper. Flexes to fill the space between the sticky
 * header and the footer. The skip-to-content link and the header/footer are
 * composed around it in the root layout. COMPONENT_SYSTEM.md §3.1.
 */
export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main id="main" className={cn("flex-1", className)}>
      {children}
    </main>
  );
}
