import { JsonLd } from "./JsonLd";

const BASE = "https://topeliteauto.com";

export interface ServiceSeoProps {
  /** Display name of the service (e.g. "Ceramic Coating") */
  name: string;
  /** Path segment, no leading slash (e.g. "ceramic-coating") */
  slug: string;
  /** Short FAQ entries for FAQPage schema (3–5 Q&As recommended) */
  faqs?: { q: string; a: string }[];
}

/**
 * Emits BreadcrumbList + (optional) FAQPage JSON-LD for a service page.
 * Service schema itself is emitted separately by each route file.
 */
export function ServiceSeo({ name, slug, faqs }: ServiceSeoProps) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE}/#services` },
      { "@type": "ListItem", position: 3, name, item: `${BASE}/${slug}` },
    ],
  };

  const faqJson = faqs && faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={breadcrumb} />
      {faqJson && <JsonLd data={faqJson} />}
    </>
  );
}
