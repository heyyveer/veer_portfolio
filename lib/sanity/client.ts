import { createClient, type SanityClient } from "@sanity/client";
import { env } from "@/lib/env";

let _client: SanityClient | null = null;

/**
 * Lazily-instantiated Sanity client. Returns null when env is incomplete,
 * letting callers fall back to local seed data via lib/data/*.
 */
export function getSanityClient(): SanityClient | null {
  if (!env.hasSanity) return null;
  if (_client) return _client;
  _client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: true,
    token: env.SANITY_API_READ_TOKEN,
    perspective: "published",
  });
  return _client;
}
