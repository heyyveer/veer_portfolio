import imageUrlBuilder, {
  type SanityImageSource,
} from "@sanity/image-url";
import { env } from "@/lib/env";

const builder = env.hasSanity
  ? imageUrlBuilder({
      projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: env.NEXT_PUBLIC_SANITY_DATASET!,
    })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error(
      "urlFor() called but Sanity env is not configured. Use the local placeholder image instead.",
    );
  }
  return builder.image(source).auto("format").fit("max");
}
