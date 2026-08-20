import { Section } from "@/components/layout";
import { SectionHeader, CardHeading, BodyText } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { techGroups } from "@/lib/section-data";
import { TechStackDeck } from "./tech-stack-deck";

/**
 * 07 - Tech Stack. Grouped by domain with a one-line rationale each.
 * The desktop view features a stacked deck of glassmorphic cards 
 * inspired by the Lenis aesthetic. Mobile uses a clean static grid.
 */
export function TechStackSection() {
  return (
    <Section id="stack" fullBleed>
      <div className="container mx-auto px-6 lg:hidden">
        <Reveal variant="slide-left">
          <SectionHeader
            eyebrow="Tech Stack"
            title="Chosen tools, and why."
            lead="The stack I reach for, grouped by what it solves."
          />
        </Reveal>
      </div>

      {/* Desktop View: Stacked Deck (Lenis Style) */}
      <TechStackDeck groups={techGroups} />

      {/* Mobile View: Static Grid */}
      <div className="container mx-auto px-6 mt-12 lg:hidden">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {techGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-lg border border-border bg-card p-6"
          >
            <CardHeading size="h4">{group.label}</CardHeading>
            <BodyText size="sm" tone="muted" className="mt-2">
              {group.rationale}
            </BodyText>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge key={item} variant="outline" className="font-mono">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
    </Section>
  );
}
