import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/sections/case-study/case-study-layout";
import { CASE_STUDY_SLUGS, getCaseStudy } from "@/lib/case-studies";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const path = `/case-studies/${slug}`;
  return {
    title: cs.title,
    description: cs.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: cs.title,
      description: cs.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  return <CaseStudyLayout caseStudy={cs} />;
}
