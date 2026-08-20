import { sanityFetch } from "@/lib/sanity/live";
import { SITE_SETTINGS } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/sanity/types";
import { identity, contact, socials } from "@/lib/content";

export async function getSiteSettings(): Promise<SiteSettings> {
  const remote = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS,
    tags: ["siteSettings"],
  });
  if (remote) return remote;
  return {
    name: identity.name,
    role: identity.role,
    tagline: identity.tagline,
    bioShort: identity.bioShort,
    bioLong: identity.bioLong,
    location: identity.location,
    timezone: identity.timezone,
    availability: identity.status === "Available for work",
    email: contact.email,
    phone: contact.phone,
    socials: socials.map((s) => ({ label: s.label, handle: s.handle, href: s.href })),
  };
}
