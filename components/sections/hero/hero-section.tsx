import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout";
import {
  DisplayHeading,
  BodyText,
  Caption,
} from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { AvailabilityBadge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import {
  Magnetic,
  ScrollIndicator,
} from "@/components/motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { cn } from "@/lib/utils";
import { HeroMotion } from "./hero-motion";
import {
  identity,
  metrics,
  advancedTopics,
} from "@/lib/content";
import { CONTACT_ANCHOR } from "@/constants";

/**
 * 01 - Hero, themed "Identity Core".
 *
 * Content is driven from lib/content.ts so the same identity
 * is used across the portfolio.
 */
export function HeroSection() {
  return (
    <Section
      id="top"
      size="hero"
      fullBleed
      className="relative isolate w-full overflow-hidden p-0"
    >
      <HeroMotion />

      <div
        data-hero-content
        className="relative z-10"
      >
        {/* Mobile */}
        <div className="md:hidden">
          <div className="flex min-h-[100svh] flex-col justify-center gap-7 px-5 pb-28 pt-24">
            <HeroKicker />

            <HeroHeadline wrap />

            <div className="space-y-3">
              <Caption
                as="span"
                className="text-accent"
              >
                {identity.roleLong}
              </Caption>

              <DisplayHeading
                size="l"
                className="break-words text-[clamp(2rem,9vw,2.75rem)]"
              >
                {identity.name}
              </DisplayHeading>
            </div>

            <HeroIntro className="text-base" />

            <HeroChips />

            <HeroActions />

            <HeroMeta />

            <HeroMetrics className="mt-1" />
          </div>
        </div>

        {/* Tablet & desktop */}
        <div className="hidden md:block">
          <ContainerScroll
            titleComponent={<HeroTitle />}
          >
            <div className="flex h-full flex-col">
              {/* Window chrome */}
              <div className="flex shrink-0 items-center gap-2 border-b border-border/60 bg-background/40 px-4 py-3 sm:px-5">
                <span className="size-3 rounded-full bg-accent/40" />
                <span className="size-3 rounded-full bg-accent/60" />
                <span className="size-3 rounded-full bg-accent" />
              </div>

              {/* Console body */}
              <div className="grid flex-1 items-center gap-8 overflow-y-auto p-6 sm:p-8 md:gap-10 md:p-12 lg:grid-cols-[1.5fr_1fr]">
                <div className="flex flex-col justify-center space-y-5">
                  <Caption
                    as="span"
                    className="text-accent"
                  >
                    {identity.roleLong}
                  </Caption>

                  <DisplayHeading
                    size="l"
                    className="break-words"
                  >
                    {identity.name}
                  </DisplayHeading>

                  <HeroIntro enhance />

                  <HeroChips />

                  <HeroActions
                    enhance
                    className="pt-1"
                  />

                  <HeroMeta className="pt-1" />
                </div>

                <HeroMetrics enhance />
              </div>
            </div>
          </ContainerScroll>
        </div>

        <ScrollIndicator />
      </div>
    </Section>
  );
}

/* -------------------------------------------------- */
/* Hero content atoms                                 */
/* -------------------------------------------------- */

function HeroKicker({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground sm:text-sm",
        className,
      )}
    >
      <span className="mr-2 inline-block origin-[70%_80%] motion-safe:animate-[wave_2.4s_ease-in-out_infinite]">
        👋
      </span>

      Nice to meet you
    </span>
  );
}

function HeroHeadline({
  className,
  wrap = false,
}: {
  className?: string;
  wrap?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex flex-col",
        className,
      )}
    >
      <span
        className={cn(
          "flow-cycle-text font-script pt-2 pb-1 text-[clamp(1.75rem,5.5vw,4.75rem)] font-normal leading-[1.25]",
          !wrap && "whitespace-nowrap",
        )}
      >
        Building Intelligent
      </span>

      <span
        className={cn(
          "stroke-text font-[family-name:var(--font-clash)] text-[clamp(2.25rem,7.5vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-[0.04em]",
          !wrap && "whitespace-nowrap",
        )}
      >
        AI Systems.
      </span>
    </span>
  );
}

/** Centered headline used by ContainerScroll. */
function HeroTitle() {
  return (
    <div className="mx-auto flex w-full flex-col items-center gap-5 px-4">
      <HeroKicker />

      <HeroHeadline
        className="items-center text-center"
      />
    </div>
  );
}

function HeroIntro({
  enhance = false,
  className,
}: {
  enhance?: boolean;
  className?: string;
}) {
  return (
    <BodyText
      {...(enhance
        ? { "data-hero-sub": "" }
        : {})}
      size="lg"
      tone="muted"
      className={cn(
        "max-w-[52ch]",
        className,
      )}
    >
      AI / ML engineer building practical intelligent
      systems across machine learning, deep learning,
      and Generative AI. I turn real-world problems
      into useful, maintainable products.
    </BodyText>
  );
}

function HeroChips({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        className,
      )}
    >
      {advancedTopics.slice(0, 4).map(
        (topic) => (
          <span
            key={topic}
            className="rounded-full border border-border/60 bg-card/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            {topic}
          </span>
        ),
      )}
    </div>
  );
}

function HeroActions({
  enhance = false,
  className,
}: {
  enhance?: boolean;
  className?: string;
}) {
  return (
    <div
      {...(enhance
        ? { "data-hero-cta": "" }
        : {})}
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
        className,
      )}
    >
      <Magnetic className="w-full sm:w-auto">
        <Button
          asChild
          size="lg"
          className="w-full sm:w-auto"
        >
          <a href="#work">
            View work
            <Icon icon={ArrowUpRight} />
          </a>
        </Button>
      </Magnetic>

      <Button
        asChild
        size="lg"
        variant="ghost"
        className="w-full sm:w-auto"
      >
        <a href={CONTACT_ANCHOR}>
          Get in touch
        </a>
      </Button>
    </div>
  );
}

function HeroMeta({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3",
        className,
      )}
    >
      <AvailabilityBadge />

      <Caption as="span">
        {identity.location} · {identity.timezone}
      </Caption>
    </div>
  );
}

function HeroMetrics({
  enhance = false,
  className,
}: {
  enhance?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/50 bg-border/50",
        className,
      )}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          {...(enhance
            ? { "data-metric-cell": "" }
            : {})}
          className="relative bg-card/50 px-4 py-5 sm:px-5"
        >
          <div className="mt-3 font-display text-3xl tracking-tight tnum sm:text-4xl">
            {metric.value}
          </div>

          <Caption
            as="span"
            className="mt-2 block normal-case tracking-[0.14em]"
          >
            {metric.label}
          </Caption>
        </div>
      ))}
    </div>
  );
}