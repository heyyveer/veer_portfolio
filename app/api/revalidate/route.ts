import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { env } from "@/lib/env";

/**
 * Sanity webhook receiver.
 *
 * Configure in the studio:
 *   URL:      <site>/api/revalidate
 *   Trigger:  Create / Update / Delete
 *   HTTP:     POST · JSON
 *   Headers:  authorization: Bearer <SANITY_WEBHOOK_SECRET>
 *   Projection: {_type, "slug": slug.current}
 *
 * The handler revalidates only the impacted tags so `revalidatePath('/')`
 * (too broad) is never used. Each `lib/data/*` adapter sets matching tags.
 */
export async function POST(req: Request) {
  if (!env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { ok: false, reason: "webhook secret not configured" },
      { status: 503 },
    );
  }

  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${env.SANITY_WEBHOOK_SECRET}`) {
    return NextResponse.json(
      { ok: false, reason: "unauthorized" },
      { status: 401 },
    );
  }

  const body = (await req.json().catch(() => null)) as {
    _type?: string;
    slug?: string;
  } | null;

  if (!body?._type) {
    return NextResponse.json(
      { ok: false, reason: "missing _type" },
      { status: 400 },
    );
  }

  const tags: string[] = [body._type];
  if (body.slug) tags.push(`${body._type}:${body.slug}`);

  // Next 16's revalidateTag requires a cache-life profile. "default"
  // honors per-fetch revalidate hints; pass { expire: 0 } for a hard
  // invalidation that drops the cached payload immediately.
  for (const tag of tags) revalidateTag(tag, "default");

  return NextResponse.json({ ok: true, revalidated: tags });
}
