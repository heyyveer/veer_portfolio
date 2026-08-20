import { searchContent } from "./search";
import {
  identity,
  contact,
  projects,
  experience,
  skills,
  socials,
} from "@/lib/content";

/**
 * Deterministic, content-grounded responder used when no OpenAI key is
 * configured. It selects the best template based on user intent, fills it
 * with real data from `lib/content.ts`, and returns plain text that the
 * route streams char-by-char so the UX matches the OpenAI path.
 */

type Intent =
  | "greeting"
  | "available"
  | "contact"
  | "stack"
  | "experience"
  | "project-deep"
  | "project-list"
  | "default";

function detectIntent(q: string): Intent {
  const s = q.toLowerCase();
  if (/^(hi|hey|hello|yo)\b/.test(s)) return "greeting";
  if (/(available|hire|hiring|freelance|contract|open to work)/.test(s))
    return "available";
  if (/(email|contact|reach|phone|linkedin|github|instagram|socials?)/.test(s))
    return "contact";
  if (/(stack|tech|technolog|tools?|languages?|framework)/.test(s))
    return "stack";
  if (/(experience|work history|roles?|jobs?|career|companies)/.test(s))
    return "experience";
  if (
    /(raadi|prism|webtech|env[- ]?inspector|tell me about|walk me through|deep dive|case study|biggest)/.test(
      s,
    )
  )
    return "project-deep";
  if (/(projects?|builds?|portfolio|shipped|made|built)/.test(s))
    return "project-list";
  return "default";
}

function pickProject(q: string) {
  const hits = searchContent(q, 3).filter((h) => h.kind === "project");
  if (hits.length) return hits[0].item as (typeof projects)[number];
  return projects.find((p) => p.featured) ?? projects[0];
}

export function respond(query: string): string {
  const intent = detectIntent(query);

  switch (intent) {
    case "greeting":
      return [
        `Hey — I'm Soumya's portfolio assistant.`,
        ``,
        `I can answer questions about Soumya's projects, stack, experience,`,
        `or availability. Try: "what did Soumya ship with agentic AI?"`,
      ].join("\n");

    case "available":
      return [
        `Yes — Soumya is currently **${identity.status.toLowerCase()}** out of`,
        `${identity.location} (${identity.timezone}).`,
        ``,
        `For new work, the fastest channel is email: ${contact.email}.`,
        `Response time is typically under 24 hours.`,
        ``,
        `Want a short summary of recent builds before reaching out?`,
      ].join("\n");

    case "contact": {
      const lines = [
        `Soumya's direct channels:`,
        ``,
        `• Email — ${contact.email}`,
        `• Phone — ${contact.phone} (${identity.timezone})`,
      ];
      socials.forEach((s) =>
        lines.push(`• ${s.label} — ${s.handle} (${s.href})`),
      );
      lines.push(``, `Email is best for new project enquiries.`);
      return lines.join("\n");
    }

    case "stack":
      return [
        `Soumya's everyday stack:`,
        ``,
        `• Frontend — React, Next.js 16, TypeScript, Tailwind, Framer Motion`,
        `• Backend — Node.js, Express, NestJS; Java when the JVM is required`,
        `• Data — MongoDB primarily; Postgres + pgvector for retrieval`,
        `• Tooling — Vite, Sanity (CMS), Vercel, Railway`,
        ``,
        `Currently going deeper on: Agentic AI, RAG, CAG, the MCP protocol.`,
        ``,
        `Want a project that shows one of these in production?`,
      ].join("\n");

    case "experience": {
      const lines = [`Four roles, newest first:`, ``];
      experience.forEach((e, i) => {
        lines.push(
          `${i + 1}. ${e.role} — ${e.org} (${e.start} → ${e.end}). ${e.note}`,
        );
      });
      lines.push(
        ``,
        `Current focus: building production MERN at Hyscaler since Dec 2024.`,
      );
      return lines.join("\n");
    }

    case "project-deep": {
      const p = pickProject(query);
      return [
        `${p.code} — **${p.title}** (${p.status})`,
        ``,
        p.summary,
        ``,
        `Built with: ${p.stack.join(", ")}.`,
        `Live: ${p.liveUrl}`,
        ``,
        `Want a comparison with one of the other builds?`,
      ].join("\n");
    }

    case "project-list": {
      const lines = [`Four production builds on record:`, ``];
      projects.forEach((p) => {
        lines.push(`• ${p.code} ${p.title} — ${p.summary} (${p.liveUrl})`);
      });
      lines.push(``, `Ask "tell me about <name>" for a deep-dive on any one.`);
      return lines.join("\n");
    }

    case "default":
    default: {
      const hits = searchContent(query, 4);
      if (hits.length === 0) {
        return [
          `I couldn't find a direct match for that in Soumya's catalogue.`,
          ``,
          `Try asking about a project (Prismworks, SR India Cards, Examys, QrNestGen, Create PTP, Raadiuma Cafe),`,
          `a stack item (React, Node, MongoDB, agentic AI), or`,
          `Soumya's availability for new work.`,
          ``,
          `Or email Soumya directly: ${contact.email}.`,
        ].join("\n");
      }
      const lines = [`Here's what I found in Soumya's catalogue:`, ``];
      for (const h of hits) {
        if (h.kind === "project") {
          const p = h.item as (typeof projects)[number];
          lines.push(`• ${p.code} ${p.title} — ${p.summary}`);
        } else if (h.kind === "experience") {
          const e = h.item as (typeof experience)[number];
          lines.push(
            `• ${e.role} @ ${e.org} (${e.start} → ${e.end}) — ${e.note}`,
          );
        } else if (h.kind === "skill") {
          const s = h.item as (typeof skills)[number];
          lines.push(
            `• Skill: ${s.name} (${s.group}${s.proficiency ? `, ${s.proficiency}%` : ""})`,
          );
        } else if (h.kind === "topic") {
          lines.push(`• R&D topic: ${h.item as string}`);
        }
      }
      lines.push(``, `Want me to deep-dive on any one of these?`);
      return lines.join("\n");
    }
  }
}
