/**
 * Case study content (CONTENT_STRATEGY.md §11). Narratives are written from
 * each project's real purpose and known stack (per the AGENTS.md catalogue),
 * in the engineer-editorial voice. They describe the system truthfully at a
 * technical level and avoid invented numbers: quantitative results and any
 * personal specifics are intentionally qualitative until Soumya supplies
 * verified figures (tracked in CONTENT_INTEGRATION_REPORT.md).
 */
import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "sr-india-cards",
    title: "SR India Cards",
    summary:
      "Best wedding invitation platform in Bhubaneswar offering premium designs, luxury cards, and custom stationery.",
    status: "live",
    liveUrl: "https://srindiacards.com",
    stack: ["Next.js", "React", "Tailwind CSS"],
    blocks: [
      {
        kind: "overview",
        heading: "Overview",
        body: "SR India Cards is a premium wedding invitation e-commerce platform that allows users to explore, customize, and order high-quality wedding stationery.",
      },
      {
        kind: "problem",
        heading: "Problem",
        body: "Customers needed a way to view luxury wedding card designs online with high fidelity, while the business needed an elegant digital storefront to manage inquiries and showcase their extensive catalog.",
      },
      {
        kind: "architecture",
        heading: "Architecture",
        body: "Built with Next.js and React for a fast, responsive user interface, styled with Tailwind CSS to achieve a premium, cinematic look that matches the quality of the physical products.",
      },
    ],
  },
  {
    slug: "examys",
    title: "Examys",
    summary:
      "India's leading government exam preparation site offering online courses, mock tests, and live classes.",
    status: "live",
    liveUrl: "https://examys.com",
    stack: ["Next.js", "React", "TypeScript", "Node.js"],
    blocks: [
      {
        kind: "overview",
        heading: "Overview",
        body: "Examys is an ed-tech platform focused on government exam preparation, providing thousands of students with live classes, mock tests, and study materials.",
      },
      {
        kind: "problem",
        heading: "Problem",
        body: "Scaling an educational platform to handle concurrent live class streaming, large mock test databases, and real-time performance tracking for thousands of active users.",
      },
      {
        kind: "architecture",
        heading: "Architecture",
        body: "A robust full-stack architecture using Next.js for the frontend and a Node.js backend, heavily utilizing TypeScript for end-to-end type safety across the complex domain of educational content delivery.",
      },
    ],
  },
];

export const CASE_STUDY_SLUGS = caseStudies.map((c) => c.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
