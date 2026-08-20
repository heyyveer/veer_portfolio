import { getSanityClient } from "./client";

type FetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
};

/**
 * Wrapper around the Sanity client that plugs into Next 16's fetch cache
 * (tags + revalidate). Returns `null` when env is missing so callers can
 * short-circuit to the local fallback.
 */
export async function sanityFetch<T>({
  query,
  params,
  tags,
  revalidate,
}: FetchOptions): Promise<T | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params ?? {}, {
      next: {
        revalidate: revalidate === false ? undefined : revalidate ?? 3600,
        tags,
      },
    });
  } catch (err) {
    console.warn("[sanityFetch] failed, falling back:", err);
    return null;
  }
}
