import { z } from "zod";

/**
 * Single source of truth for runtime env. Reads from process.env once,
 * validates with zod, and exposes `env.<key>` with full typing.
 *
 * Anything marked `.optional()` means the app must degrade gracefully
 * when the key is absent. See lib/data/* for the Sanity fallback path
 * and lib/ai/openai.ts for the AI fallback.
 */
const schema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).optional(),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2025-01-01"),
  SANITY_API_READ_TOKEN: z.string().min(1).optional(),
  SANITY_WEBHOOK_SECRET: z.string().min(1).optional(),

  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_MODEL: z.string().default("gpt-4o-mini"),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  SANITY_WEBHOOK_SECRET: process.env.SANITY_WEBHOOK_SECRET,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
});

if (!parsed.success) {
  console.warn(
    "[env] invalid environment — running in fallback mode:",
    parsed.error.flatten().fieldErrors,
  );
}

const data = parsed.success ? parsed.data : ({} as z.infer<typeof schema>);

export const env = {
  ...data,
  hasSanity: Boolean(
    data.NEXT_PUBLIC_SANITY_PROJECT_ID && data.NEXT_PUBLIC_SANITY_DATASET,
  ),
  hasOpenAI: Boolean(data.OPENAI_API_KEY),
} as const;

export type Env = typeof env;
