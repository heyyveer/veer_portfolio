import {
  projects,
  experience,
  skills,
  advancedTopics,
  identity,
  contact,
} from "@/lib/content";

/**
 * Tiny lexical search over the catalogue. Stand-in for pgvector until the
 * embedding pipeline ships. Tokenises the query, scores each entity by
 * term overlap (with title-weight bias), and returns the top matches.
 */
const STOPWORDS = new Set([
  "the","a","an","and","or","of","to","in","on","for","at","is","are","was",
  "were","be","been","being","with","by","this","that","it","its","as","do",
  "does","did","you","your","i","me","my","what","which","who","whom","how",
  "tell","show","give","build","builds","built","make","made","work","please",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s.+#-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

type Hit<T> = { item: T; score: number; kind: string };

export function searchContent(query: string, limit = 5): Hit<unknown>[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const hits: Hit<unknown>[] = [];

  for (const p of projects) {
    const hay = [p.title, p.summary, p.stack.join(" "), p.code]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (p.title.toLowerCase().includes(t)) score += 3;
      else if (hay.includes(t)) score += 1;
    }
    if (score > 0) hits.push({ item: p, score, kind: "project" });
  }

  for (const e of experience) {
    const hay = [e.role, e.org, e.note].join(" ").toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (hay.includes(t)) score += e.current ? 2 : 1;
    }
    if (score > 0) hits.push({ item: e, score, kind: "experience" });
  }

  for (const s of skills) {
    let score = 0;
    const name = s.name.toLowerCase();
    for (const t of terms) {
      if (name === t) score += 2;
      else if (name.includes(t)) score += 1;
    }
    if (score > 0) hits.push({ item: s, score, kind: "skill" });
  }

  for (const t of advancedTopics) {
    if (terms.some((q) => t.toLowerCase().includes(q))) {
      hits.push({ item: t, score: 1, kind: "topic" });
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function buildContext(query: string): string {
  const hits = searchContent(query, 8);

  const lines: string[] = [
    `Subject: ${identity.name} — ${identity.roleLong}`,
    `Location: ${identity.location} (${identity.timezone})`,
    `Status: ${identity.status}`,
    `Tagline: ${identity.tagline}`,
    `Contact: ${contact.email} · ${contact.phone}`,
    "",
  ];

  if (hits.length === 0) {
    lines.push("No specific matches. Use general bio:");
    lines.push(identity.bioShort);
    lines.push(identity.bioLong);
    return lines.join("\n");
  }

  lines.push("Top matches:");
  for (const h of hits) {
    if (h.kind === "project") {
      const p = h.item as (typeof projects)[number];
      lines.push(
        `- [project ${p.code}] ${p.title} — ${p.summary} (stack: ${p.stack.join(", ")}; ${p.liveUrl}; status: ${p.status})`,
      );
    } else if (h.kind === "experience") {
      const e = h.item as (typeof experience)[number];
      lines.push(
        `- [experience] ${e.role} @ ${e.org} (${e.start} → ${e.end}). ${e.note}`,
      );
    } else if (h.kind === "skill") {
      const s = h.item as (typeof skills)[number];
      lines.push(
        `- [skill] ${s.name} (${s.group}, proficiency ${s.proficiency ?? "n/a"}%)`,
      );
    } else if (h.kind === "topic") {
      lines.push(`- [advanced topic] ${h.item as string}`);
    }
  }
  return lines.join("\n");
}
