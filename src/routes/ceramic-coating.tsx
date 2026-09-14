import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { JsonLd } from "@/components/site/JsonLd";
import { ServiceSeo } from "@/components/site/ServiceSeo";
import img from "@/assets/ceramic.jpg";

const faqs = [
  { q: "How long does ceramic coating last?", a: "Our professional ceramic coatings are rated 2 to 5 years depending on the package — 2-Year starts at $950, 5-Year at $1,200. Longevity depends on proper maintenance." },
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
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "5-Year Ceramic" }, "price": "1200", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Motorcycle Ceramic" }, "price": "350", "priceCurrency": "USD" },
    ],
  },
};

const ceramicTiers = [
  { name: "2-Year Ceramic", price: "$950", note: "Starting" },
  { name: "5-Year Ceramic", price: "$1,200", note: "Starting" },
  { name: "Motorcycle Ceramic", price: "$350", note: "Starting" },
];

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
          { title: "2–5 Year Protection", body: "Professional-grade coatings rated for multiple years of UV, chemical and contamination resistance." },
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
        afterFeatures={
          <section className="border-t border-border surface-dark py-16 md:py-24">
            <div className="container-luxe">
              <div className="mb-10 max-w-2xl">
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
                  Pricing
                </div>
                <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
                  Pick your coating.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Three tiers based on longevity. All coatings include full paint correction, decontamination, and professional application.
                </p>
              </div>
              <div className="border border-border">
                {ceramicTiers.map((tier, i) => (
                  <div
                    key={tier.name}
                    className={`grid grid-cols-[1fr_auto] items-baseline gap-6 p-6 md:p-8 ${i > 0 ? "border-t border-border" : ""} ${i % 2 === 1 ? "bg-[var(--color-onyx-elevated,_#141414)]" : ""}`}
                  >
                    <div>
                      <div className="text-lg font-bold text-foreground">{tier.name}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{tier.note}</div>
                    </div>
                    <div className="text-2xl font-black text-[var(--color-gold)] md:text-3xl whitespace-nowrap">
                      {tier.price}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Final pricing depends on paint condition and correction needed.
              </p>
            </div>
          </section>
        }
      />
    </>
  ),
});
