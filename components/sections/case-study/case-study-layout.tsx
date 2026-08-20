import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout";
import {
  DisplayHeading,
  BodyText,
  Caption,
  Prose,
} from "@/components/ui/typography";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/link";
import { Icon } from "@/components/ui/icon";
import { caseStudies } from "@/lib/case-studies";
import { CONTACT_ANCHOR } from "@/constants";
import type { CaseStudy } from "@/types";

/**
 * Long-form case study layout.
 *
 * The layout is intentionally content-agnostic:
 * all project-specific information comes from `caseStudy`.
 */
export function CaseStudyLayout({ caseStudy }: { caseStudy: CaseStudy }) {
  const idx = caseStudies.findIndex((c) => c.slug === caseStudy.slug);
  const prev = idx > 0 ? caseStudies[idx - 1] : undefined;
  const next =
    idx < caseStudies.length - 1 ? caseStudies[idx + 1] : undefined;

  return (
    <article>
      {/* Cover */}
      <Section size="hero" className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="signal-glow pointer-events-none absolute inset-x-0 top-0 h-1/2"
        />

        <TextLink
          href="/"
          tone="muted"
          underline="hover"
          className="mb-8"
        >
          <Icon icon={ArrowLeft} size="xs" />
          Back to home
        </TextLink>

        <Caption className="mt-6">Case Study</Caption>

        <DisplayHeading size="l" className="mt-4 max-w-[18ch]">
          {caseStudy.title}
        </DisplayHeading>

        <BodyText size="lg" tone="muted" className="mt-4 max-w-[60ch]">
          {caseStudy.summary}
        </BodyText>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusBadge status={caseStudy.status} />

          {caseStudy.stack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="font-mono"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {caseStudy.liveUrl && (
            <TextLink
              href={caseStudy.liveUrl}
              external
              underline="hover"
            >
              View live
              <Icon icon={ArrowUpRight} size="xs" />
            </TextLink>
          )}

          {caseStudy.repoUrl && (
            <TextLink
              href={caseStudy.repoUrl}
              external
              tone="muted"
              underline="hover"
            >
              Source
            </TextLink>
          )}
        </div>
      </Section>

      {/* Body + scene-index rail */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[160px_1fr] lg:gap-16">
          <nav aria-label="Sections" className="hidden lg:block">
            <ol className="sticky top-24 space-y-2">
              {caseStudy.blocks.map((block) => (
                <li key={block.kind}>
                  <a
                    href={`#cs-${block.kind}`}
                    className="flex gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{block.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-14">
            {caseStudy.blocks.map((block) => (
              <section
                key={block.kind}
                id={`cs-${block.kind}`}
                className="scroll-mt-24"
              >
                <Caption>{block.heading}</Caption>

                <h2 className="mt-3 font-display text-h3">
                  {block.heading}
                </h2>

                <Prose className="mt-4">
                  <p>{block.body}</p>
                </Prose>
              </section>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer navigation */}
      <Section size="sm" className="border-t border-border">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-6">
            {prev && (
              <TextLink
                href={`/case-studies/${prev.slug}`}
                tone="muted"
                underline="hover"
              >
                <Icon icon={ArrowLeft} size="xs" />
                {prev.title}
              </TextLink>
            )}

            {next && (
              <TextLink
                href={`/case-studies/${next.slug}`}
                tone="muted"
                underline="hover"
              >
                {next.title}
                <Icon icon={ArrowUpRight} size="xs" />
              </TextLink>
            )}
          </div>

          <Button asChild>
            <a href={`/${CONTACT_ANCHOR}`}>Get in touch</a>
          </Button>
        </div>
      </Section>
    </article>
  );
}