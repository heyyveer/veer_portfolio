import { identity, socials, contact } from "@/lib/content";
import { SITE_URL } from "@/constants";

/**
 * Person structured data.
 *
 * Provides search engines with a machine-readable representation
 * of Veer Tiwari's professional identity.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",

    name: identity.name,

    alternateName: identity.signature,

    url: SITE_URL,

    jobTitle: "AI / ML Engineer",

    description:
      "AI / ML Engineer focused on Machine Learning, Deep Learning, Generative AI, NLP, Computer Vision, and RAG systems.",

    email: `mailto:${contact.email}`,

    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },

    knowsAbout: [
      "Machine Learning",
      "Deep Learning",
      "Generative AI",
      "Natural Language Processing",
      "Computer Vision",
      "Retrieval-Augmented Generation",
      "Python",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
    ],

    sameAs: socials.map((social) => social.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}