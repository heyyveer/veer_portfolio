# Veer Tiwari — Portfolio

A content-driven personal portfolio built as a single-page scroll narrative, with a
Sanity-backed content layer and an AI assistant surface for project Q&A.

**Live:** [Portfolio](https://veer-portfolio-nu.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Content Layer](#content-layer)
- [AI Assistant](#ai-assistant)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)

---

## Overview

The home page is one continuous narrative composed of eight sections, in order:

| #   | Section     | Anchor         |
| --- | ----------- | -------------- |
| 1   | Hero        | `#top`         |
| 2   | About       | `#about`       |
| 3   | Expertise   | `#expertise`   |
| 4   | Experience  | `#experience`  |
| 5   | Projects    | `#work`        |
| 6   | Open Source | `#open-source` |
| 7   | Tech Stack  | `#stack`       |
| 8   | Contact     | `#contact`     |

Section order and anchors are declared once in `constants/site.ts` (`SECTION_META`)
and consumed by the page, the nav, and the active-section observer.

Long-form project write-ups live at `/case-studies/[slug]`, sourced from
`lib/case-studies.ts`.

Design principles, motion tokens, and the color/type systems are specified in
[`DESIGN.md`](./DESIGN.md). Engineering rules are in [`AGENTS.md`](./AGENTS.md).

---

## Tech Stack

**Framework**

- Next.js `16.2` (App Router, React Server Components, Turbopack)
- React `19.2`
- TypeScript `^5` (`strict: true`)

**Styling & UI**

- Tailwind CSS `v4` — tokens declared with `@theme` in `app/globals.css`
- shadcn/ui primitives (`components/ui/`) over Radix UI
- `class-variance-authority` + `clsx` + `tailwind-merge` for variants
- `next-themes` for dark/light token switching
- `lucide-react` icons
- Fonts: Clash Display + Telma (self-hosted via `next/font/local`),
  Instrument Serif (Google), Geist Mono

**Motion**

- Framer Motion `12` — declarative reveals, stagger, parallax
- GSAP `3` + `@gsap/react` — scroll-driven sequences
- Lenis — smooth scrolling
- Three.js — hero `liquid-ether` background

**Content**

- Sanity `v3` schemas (`studio/`), consumed through `next-sanity` and
  `@sanity/client`
- `zod` validation at every external boundary (`lib/env.ts`, Sanity payloads)

**AI**

- OpenAI SDK, default model `gpt-4o-mini`, with a deterministic local
  fallback responder

**Testing**

- Vitest + Testing Library (jsdom) for unit/component
- Playwright + `@axe-core/playwright` for E2E and accessibility

---

## Getting Started

Requires Node.js `>=20` (developed on `v24`). The repo ships a
`package-lock.json`, so use npm.

```bash
git clone 
cd Portfolio
npm install
cp .env.example .env.local   # optional — the site runs without keys
npm run dev
```

Open http://localhost:3000.

The app boots with **no environment variables set**. See
[Content Layer](#content-layer) for what falls back to what.

---

## Environment Variables

Copy `.env.example` to `.env.local`. Every key is optional; `lib/env.ts`
validates with zod and logs a warning rather than crashing, then flips the app
into fallback mode.

| Key                              | Scope  | Purpose                                          |
| -------------------------------- | ------ | ------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | client | Sanity project. Absent → static content fallback |
| `NEXT_PUBLIC_SANITY_DATASET`     | client | Dataset name (default `production`)              |
| `NEXT_PUBLIC_SANITY_API_VERSION` | client | GROQ API date (default `2025-01-01`)             |
| `SANITY_API_READ_TOKEN`          | server | Read token for drafts / private datasets         |
| `SANITY_WEBHOOK_SECRET`          | server | Bearer secret for `POST /api/revalidate`         |
| `OPENAI_API_KEY`                 | server | Enables the OpenAI chat path                     |
| `OPENAI_MODEL`                   | server | Chat model (default `gpt-4o-mini`)               |

`env.hasSanity` and `env.hasOpenAI` are the derived flags the app branches on.
Never import server keys into a Client Component.

---

## Scripts

```bash
npm run dev     # next dev
npm run build   # next build  → static export into out/
npm run start   # next start
npm run lint    # eslint
```

**Test runners are configured but not yet wired to npm scripts.**
`vitest.config.ts` expects specs in `tests/**/*.{test,spec}.{ts,tsx}` with a
`tests/setup.ts` setup file and a 70% line-coverage threshold on `lib/**` and
`components/sections/**`. That directory does not exist yet, and there is no
Playwright config. Adding either means creating `tests/` and the matching
`test` / `test:e2e` scripts.

---

## Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # AI assistant, SSE streaming
│   │   └── revalidate/route.ts    # Sanity webhook → revalidateTag
│   ├── case-studies/[slug]/       # long-form project narratives
│   ├── assets/                    # self-hosted font files
│   ├── layout.tsx                 # fonts, providers, header/footer shell
│   ├── template.tsx               # per-navigation transition wrapper
│   ├── page.tsx                   # home — composes the eight sections
│   ├── globals.css                # Tailwind v4 + design tokens
│   ├── opengraph-image.tsx        # generated OG image
│   ├── robots.ts / sitemap.ts     # metadata routes
│
├── components/
│   ├── ui/                        # shadcn primitives — own them, keep edits minimal
│   ├── layout/                    # container, grid, split, stack, section, footer
│   ├── navigation/                # header, nav bar, drawer, links
│   ├── motion/                    # reveal, stagger, parallax, magnetic, threads
│   ├── sections/                  # one folder per home-page act
│   ├── cards/                     # feature, story, interactive cards
│   ├── assistant/                 # chat panel, message, use-chat hook
│   └── shared/                    # theme toggle
│
├── lib/
│   ├── ai/                        # openai client, prompts, search, fallback responder
│   ├── sanity/                    # client, image url, GROQ queries, live, types
│   ├── data/                      # per-entity fetchers with revalidation tags
│   ├── motion/                    # gsap setup, motion tokens, shared variants
│   ├── content.ts                 # canonical content snapshot (fallback + seed)
│   ├── case-studies.ts            # case-study source data
│   ├── env.ts                     # zod-validated env loader
│   └── utils.ts                   # cn() and small pure helpers
│
├── studio/
│   ├── sanity.config.ts
│   └── schemas/
│       ├── documents/             # project, post, experience, skill, siteSettings
│       └── objects/               # blockContent, imageWithAlt, link, seo
│
├── constants/                     # section meta, nav items, SEO defaults
├── hooks/                         # active-section, media-query, reduced-motion
├── providers/                     # theme + scroll (Lenis) providers
├── types/                         # shared content and site types
├── public/                        # static svg + logo assets
├── AGENTS.md                      # engineering rules (authoritative)
├── DESIGN.md                      # design system (authoritative)
└── next.config.ts
```

Conventions worth knowing before editing:

- Server Components by default. `"use client"` only for state, effects, browser
  APIs, event handlers, or motion — and push it to the smallest leaf.
- `lib/` contains no JSX. If a file imports React, it belongs in `components/`.
- Shared primitives go in `components/ui/`; domain composites in
  `components/sections/`. Do not mix the two.
- Absolute imports via `@/*`. Named exports for components, except Next file
  conventions (`page.tsx`, `layout.tsx`) which require defaults.
- No hardcoded hex values in components — read tokens from `app/globals.css`.

---

## Content Layer

Content is CMS-first with a static fallback, so the site renders correctly with
zero configuration.

```
Sanity configured?  ──yes──▶  lib/data/*  ──▶  GROQ via next-sanity (tagged)
        │
        no
        ▼
   lib/content.ts  (canonical snapshot: identity, skills, experience, projects)
```

`lib/content.ts` mirrors the live portfolio at
[Portfolio](https://veer-portfolio-nu.vercel.app/) and is the seed payload for populating Sanity.
Treat the live site as the source of truth for content: never invent
biographical facts, project descriptions, dates, or contact details.

**Document types** (`studio/schemas/documents/`): `project`, `post`,
`experience`, `skill`, `siteSettings`.
**Objects** (`studio/schemas/objects/`): `blockContent`, `imageWithAlt`, `link`,
`seo`. Every image field requires a sibling `alt`.

**Revalidation.** Each fetcher in `lib/data/` sets a cache tag —
`project`, `project:<slug>`, `experience`, `skill`, `siteSettings`. A Sanity
webhook posts to `/api/revalidate` with `authorization: Bearer
$SANITY_WEBHOOK_SECRET` and a `{_type, "slug": slug.current}` projection; the
handler calls `revalidateTag` for the impacted tags only. `revalidatePath("/")`
is deliberately never used.

**The Studio itself is not mounted in this app.** `studio/` holds the config and
schemas, but there is no `app/studio/[[...tool]]` route and `sanity` is not a
dependency here — the studio is expected to run/deploy separately.

---

## AI Assistant

`POST /api/chat` accepts `{ message, history }` and returns a
`text/event-stream` of `delta` events followed by `done`.

Two paths, chosen by `env.hasOpenAI`:

- **OpenAI** — `lib/ai/openai.ts` client, system prompt from
  `lib/ai/prompts.ts`, retrieval context from `lib/ai/search.ts`.
- **Local fallback** — `lib/ai/responder.ts` returns a deterministic answer,
  streamed in small bursts so the UX matches the OpenAI path. This is what runs
  with no API key.

API keys stay server-side; the client only ever calls `/api/chat`.

**Current status:** the chat surface in `components/assistant/`
(`AssistantRoot`, `ChatPanel`, `useChat`) is implemented but not yet mounted in
`app/layout.tsx`, so it is not reachable in the UI. Rendering `AssistantRoot`
in the layout is what turns it on.

---

## Deployment

`next.config.ts` sets `output: "export"` with `images.unoptimized`, targeting
Cloudflare Pages. `npm run build` emits a fully static site into `out/`.

```bash
npm run build     # → out/
```

**Static export drops the route handlers.** `out/` contains no `api/`
directory, so on this build `POST /api/chat` and `POST /api/revalidate` are not
served — the assistant and the Sanity webhook only work under a runtime
(`next start`, Vercel, or a Node/edge host). Removing `output: "export"` is the
change required to ship both on the same origin.

The production site currently runs on Vercel at
[Portfolio](https://veer-portfolio-nu.vercel.app/)

---

## Documentation

| File                       | What it covers                                          |
| -------------------------- | ------------------------------------------------------- |
| [`AGENTS.md`](./AGENTS.md) | Engineering rules, layout contracts, forbidden patterns |
| [`DESIGN.md`](./DESIGN.md) | Brand, color, type, spacing, grid, motion, a11y, perf   |
| [`CLAUDE.md`](./CLAUDE.md) | Entry point for AI agents (re-exports `AGENTS.md`)      |

Authority order when documents conflict:
`AGENTS.md > DESIGN.md > live portfolio > Next.js docs > schemas > README`.

---

## Contributing

- Branches: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`, `docs/<slug>`.
- Commits: imperative subject, 72 characters or fewer; body explains _why_.
- Run `npm run lint` and `npm run build` before opening a PR.
- Squash-merge to `main`. `main` stays deployable. No force-pushes to shared
  branches.
- Read `AGENTS.md` before non-trivial changes, and `DESIGN.md` before any UI
  change.

### Performance & accessibility budget

| Metric                   | Target           |
| ------------------------ | ---------------- |
| Lighthouse Performance   | ≥ 95 (mobile)    |
| Lighthouse Accessibility | ≥ 95             |
| LCP                      | ≤ 2.0s (4G)      |
| CLS                      | ≤ 0.05           |
| Total JS shipped         | ≤ 200 KB gzipped |

Every motion wrapper must respect `prefers-reduced-motion` via
`useReducedMotion()` / `hooks/use-reduced-motion-safe.ts` and degrade to a fade
or no-op.

---

## License

No license file is present. All rights reserved — personal portfolio content
and branding are not licensed for reuse.
