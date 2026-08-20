import NextLink from "next/link";
import Image from "next/image";
import { Container } from "./container";
import { Caption } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/link";
import { buttonVariants } from "@/components/ui/button";
import { SECTION_META, CONTACT_ANCHOR } from "@/constants";
import { identity, socials, contact } from "@/lib/content";
import { cn } from "@/lib/utils";

const FOOTER_NAV = SECTION_META.filter((s) => s.id !== "hero");

/**
 * Site footer (COMPONENT_SYSTEM.md §15, WIREFRAMES.md §12): brand, section
 * nav, social channels, a contact CTA, and the signature line. Server
 * Component; no motion.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full px-4 md:px-8 pb-8">
      <div className="mx-auto max-w-[1400px] rounded-[2.5rem] border border-border/50 bg-card/10 backdrop-blur-2xl shadow-xl">
        <div className="px-8 py-12 md:px-16 md:py-16">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            {/* Brand */}
            <div className="space-y-4 md:col-span-4">
              <NextLink href="/" aria-label={`${identity.name} - Home`} className="group flex items-center gap-3">
                <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-background/50 p-1 shadow-sm transition-colors group-hover:bg-card/60">
                  <Image src="/sr_light.png" alt="Logo" width={40} height={40} className="h-full w-full object-contain dark:hidden" />
                  <Image src="/sr_dark.png" alt="Logo" width={40} height={40} className="hidden h-full w-full object-contain dark:block" />
                </div>
                <span className="text-base font-semibold tracking-tight transition-colors group-hover:text-accent">{identity.name}</span>
              </NextLink>
              <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
                {identity.role} building AI-powered products, scalable systems,
                and developer tools.
              </p>
            </div>

            {/* Section nav */}
            <nav aria-label="Footer" className="md:col-span-3">
              <Caption className="mb-5 text-muted-foreground/70">Sections</Caption>
              <ul className="space-y-3 text-sm font-medium">
                {FOOTER_NAV.map((s) => (
                  <li key={s.id}>
                    <TextLink href={s.anchor} tone="muted" underline="hover">
                      {s.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social */}
            <div className="md:col-span-3">
              <Caption className="mb-5 text-muted-foreground/70">Elsewhere</Caption>
              <ul className="space-y-3 text-sm font-medium">
                {socials.map((s) => (
                  <li key={s.label}>
                    <TextLink href={s.href} external tone="muted" underline="hover">
                      {s.label}
                    </TextLink>
                  </li>
                ))}
                <li>
                  <TextLink href={`mailto:${contact.email}`} tone="muted" underline="hover">
                    Email
                  </TextLink>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="md:col-span-2 flex flex-col items-start">
              <Caption className="mb-5 text-muted-foreground/70">Work together</Caption>
              <NextLink
                href={CONTACT_ANCHOR}
                className={cn(buttonVariants({ size: "sm", variant: "secondary" }), "rounded-full px-6 transition-all hover:scale-105")}
              >
                Get in touch
              </NextLink>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-border/30 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono font-medium tracking-wide">
              {identity.signature} · © {year} {identity.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
