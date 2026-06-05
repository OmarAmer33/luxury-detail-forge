import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { JsonLd } from "@/components/site/JsonLd";
import { ServiceSeo } from "@/components/site/ServiceSeo";
import img from "@/assets/ceramic.jpg";

const faqs = [
  { q: "How long does ceramic coating last?", a: "Our professional ceramic coatings are rated 2 to 9 years depending on the package — 2-Year starts at $950, 5-Year at $1,000. Longevity depends on proper maintenance." },
  { q: "Does ceramic coating replace waxing?", a: "Yes. A coating chemically bonds to the clear coat and replaces sealant or wax for years at a time. No more quarterly waxing." },
  { q: "Do you correct paint before coating?", a: "Always. Every coating package includes multi-stage paint correction so swirls and defects are removed before the coating locks them in." },
  { q: "Where are you located?", a: "Top Elite Auto is at 3 Dundar Rd, Springfield, NJ 07081, serving Union County and the surrounding NJ towns." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Ceramic Coating",
  "provider": { "@id": "https://topeliteauto.com/#business" },
  "areaServed": { "@type": "City", "name": "Springfield, NJ" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Ceramic Coating Packages",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "2-Year Ceramic" }, "price": "950", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "5-Year Ceramic" }, "price": "1000", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Motorcycle Ceramic" }, "price": "350", "priceCurrency": "USD" },
    ],
  },
};

export const Route = createFileRoute("/ceramic-coating")({
  head: () => ({
    meta: [
      { title: "Ceramic Coating · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Premium ceramic coatings in Springfield, NJ. Long-term gloss, hydrophobic protection, and chemical resistance — installed properly the first time." },
      { property: "og:title", content: "Ceramic Coating · Top Elite Auto" },
      { property: "og:description", content: "Premium ceramic coatings installed by hand in Springfield, NJ." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://topeliteauto.com/ceramic-coating" }],
  }),
  component: () => (
    <>
      <JsonLd data={serviceSchema} />
      <ServiceSeo name="Ceramic Coating" slug="ceramic-coating" faqs={faqs} />
      <ServicePage
        eyebrow="Ceramic Coating"
        title="A finish that earns second looks."
        subtitle="Multi-year ceramic protection bonded to your paint. Deeper gloss, easier washes, and serious defense against the things that ruin a finish."
        image={img}
        intro="A ceramic coating is only as good as the prep underneath it. We decontaminate, machine-polish, and inspect under multiple light sources before a single drop of coating goes on. The result is a finish that looks better than the day the car left the factory — and stays that way."
        features={[
          { title: "5–9 Year Protection", body: "Professional-grade coatings rated for years of UV, chemical and contamination resistance." },
          { title: "Hydrophobic Surface", body: "Water sheets off. Bug guts, sap and bird droppings rinse away instead of etching in." },
          { title: "Show-Car Gloss", body: "A deeper, slicker, mirror-like finish you can feel with your fingertips." },
        ]}
        includes={[
          "Foam pre-wash and decontamination",
          "Iron and tar fallout removal",
          "Clay bar treatment",
          "Multi-stage paint correction",
          "Panel-wipe and coating prep",
          "Premium ceramic coating application",
          "Wheel face and trim coating add-ons available",
        ]}
        process={[
          { step: "01", title: "Inspect", body: "Walkaround under multiple lighting conditions to map every defect." },
          { step: "02", title: "Correct", body: "Machine polish to remove swirls, scratches and oxidation." },
          { step: "03", title: "Coat", body: "Apply ceramic in a controlled environment, panel by panel." },
          { step: "04", title: "Cure", body: "Vehicle stays with us until the coating is fully cured and inspected." },
        ]}
        pricing={{
          tiers: [
            { name: "2-Year Ceramic", price: "$950", note: "Starting" },
            { name: "5-Year Ceramic", price: "$1,000", note: "Starting" },
            { name: "Motorcycle Ceramic", price: "$350", note: "Starting" },
          ],
          footnote: "Final pricing depends on paint condition and correction needed.",
        }}
      />
    </>
  ),
});
