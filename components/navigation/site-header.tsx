import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { NavBar } from "./nav-bar";
import { NavDrawer } from "./nav-drawer";
import { CONTACT_ANCHOR } from "@/constants";
import { identity } from "@/lib/content";

/**
 * Site header: sticky glass navigation bar.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 w-full px-4 sm:top-6 sm:px-6">
      <div className="glass mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-2xl border border-border/50 px-3 shadow-[0_0_40px_rgba(0,0,0,0.1)] ring-1 ring-inset ring-foreground/10 transition-all sm:h-16 sm:px-4 md:px-5">
        <div className="flex h-16 w-full items-center justify-between gap-3">

          {/* VT Monogram + Name */}
          <NextLink
            href="/"
            aria-label={`${identity.name} - Home`}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="flex size-9 items-center justify-center rounded-lg border border-border/50 bg-card/30 font-display text-sm font-bold tracking-tight shadow-sm backdrop-blur-md transition-colors group-hover:bg-card/60">
              VT
            </div>

            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-tight transition-colors group-hover:text-accent">
                {identity.name}
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
                {identity.signature}
              </span>
            </span>
          </NextLink>

          <NavBar />

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />

            <Button
              asChild
              size="sm"
              className="hidden rounded-full px-5 font-medium shadow-md transition-transform hover:scale-105 active:scale-95 lg:inline-flex"
            >
              <a href={CONTACT_ANCHOR}>
                Get in touch
              </a>
            </Button>

            <NavDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
