import {
  HeroSection,
  AboutSection,
  ExpertiseSection,
  ExperienceSection,
  ProjectsSection,
  OpenSourceSection,
  TechStackSection,
  ContactSection,
} from "@/components/sections";
import { SectionThread } from "@/components/motion";

/**
 * Home - the single-page narrative. Server Component composing the eight acts in
 * order. Each section enters with its own reveal variant; the SectionThread
 * hairline dividers (DESIGN.md §10.3) stitch the acts into one continuous
 * scroll sequence.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionThread />
      <AboutSection />
      <SectionThread />
      <ExpertiseSection />
      <SectionThread />
      <ExperienceSection />
      <SectionThread />
      <ProjectsSection />
      <SectionThread />
      <OpenSourceSection />
      <SectionThread />
      <TechStackSection />
      <ContactSection />
    </>
  );
}
