import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { JsonLd } from "@/components/site/JsonLd";
import { ServiceSeo } from "@/components/site/ServiceSeo";
import img from "@/assets/detailing.jpg";

const faqs = [
  { q: "How long does a detail take?", a: "A standard maintenance detail runs 2–3 hours. A full multi-stage detail can take a full day. We give you a clear timeline at booking." },
  { q: "Do you offer interior-only detailing?", a: "Yes. The Interior Detail starts at $205 and covers vacuum, steam, hot-water extraction, leather conditioning and odor neutralization." },
  { q: "Do you do paint correction?", a: "Yes — we offer single, two- and three-stage machine polishing to remove swirls, scratches and oxidation, included in higher-tier details and ceramic coating prep." },
  { q: "Is there a size upcharge?", a: "Yes — pricing tiers by vehicle size (Car / SUV-Pickup / 3-Row-XL). All tiers are listed on the page so there are no surprises." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Auto Detailing",
  "provider": { "@id": "https://topeliteauto.com/#business" },
  "areaServed": { "@type": "City", "name": "Springfield, NJ" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Detailing Packages",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Elite Wash — Car" }, "price": "99", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Elite Wash — SUV/Pickup" }, "price": "115", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Elite Wash — 3-Row/XL" }, "price": "140", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Maintenance Detail — Car" }, "price": "180", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Maintenance Detail — SUV/Pickup" }, "price": "210", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Maintenance Detail — 3-Row/XL" }, "price": "240", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Detail — Car" }, "price": "205", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Detail — SUV/Pickup" }, "price": "230", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Detail — 3-Row/XL" }, "price": "255", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exterior Detail — Car" }, "price": "205", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exterior Detail — SUV/Pickup" }, "price": "230", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exterior Detail — 3-Row/XL" }, "price": "255", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Detail — Car" }, "price": "330", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Detail — SUV/Pickup" }, "price": "380", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full Detail — 3-Row/XL" }, "price": "430", "priceCurrency": "USD" },
    ],
  },
};

const detailingMatrix = [
  {
    service: "Elite Wash",
    subtitle: "Foundational wash + finish.",
    car: "$99",
    suvPickup: "$115",
    xl: "$140",
  },
  {
    service: "Maintenance Detail",
    subtitle: "Recurring upkeep between full details.",
    car: "$180",
    suvPickup: "$210",
    xl: "$240",
  },
  {
    service: "Interior Detail",
    subtitle: "Complete interior clean + condition.",
    car: "$205",
    suvPickup: "$230",
    xl: "$255",
  },
  {
    service: "Exterior Detail",
    subtitle: "Complete exterior wash, decon + finish.",
    car: "$205",
    suvPickup: "$230",
    xl: "$255",
  },
  {
    service: "Full Detail",
    subtitle: "Interior + exterior, top to bottom.",
    car: "$330",
    suvPickup: "$380",
    xl: "$430",
  },
];

export const Route = createFileRoute("/detailing")({
  head: () => ({
    meta: [
      { title: "In-Shop Detailing · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Hand wash, paint correction, interior reset and full detailing in Springfield, NJ. Showroom-grade results, every time." },
      { property: "og:title", content: "In-Shop Detailing · Top Elite Auto" },
      { property: "og:description", content: "Premium hand detailing and paint correction in Springfield, NJ." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://topeliteauto.com/detailing" }],
  }),
  component: Detailing,
});

function Detailing() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <ServiceSeo name="In-Shop Detailing" slug="detailing" faqs={faqs} />
      <ServicePage
        eyebrow="In-Shop Detailing"
        title="Reset the car. Restart the relationship."
        subtitle="From a refresh wash to a full multi-day correction and interior overhaul. We bring the car back to a state you forgot it could be in."
        image={img}
        intro="Detailing is more than soap and a buffer. It's a process: lift contamination, correct defects, protect what's been restored. We work by hand, panel by panel, in a controlled environment — never a rushed assembly line."
        features={[
          { title: "Paint Correction", body: "Single, two- and three-stage polishing to remove swirls, scratches and oxidation." },
          { title: "Interior Reset", body: "Steam, hot-water extraction and odor neutralization — interior comes back like new." },
          { title: "Engine & Wheel Detail", body: "Wheel faces, barrels, calipers and engine bay restored and protected." },
        ]}
        includes={[
          "Foam pre-wash and two-bucket hand wash",
          "Wheel, tire and arch deep clean",
          "Iron and tar decontamination",
          "Clay bar treatment",
          "Interior vacuum, steam and extraction",
          "Leather cleaning",
          "Sealant or wax topcoat",
        ]}
        process={[
          { step: "01", title: "Assess", body: "Inspect inside and out, then recommend the right package — no upsells." },
          { step: "02", title: "Decontaminate", body: "Strip the paint of bonded contamination before any polishing." },
          { step: "03", title: "Correct", body: "Machine polish defects out of the clear coat under proper lighting." },
          { step: "04", title: "Protect", body: "Finish with sealant, wax, or upgrade to a ceramic coating." },
        ]}
        afterFeatures={
          <section className="border-t border-border surface-dark py-16 md:py-24">
            <div className="container-luxe">
              <div className="mb-10 max-w-2xl">
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
                  Pricing
                </div>
                <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
                  Pick your detail.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Five packages, priced by vehicle size. Every detail is done in-shop by hand — no drive-through anything.
                </p>
              </div>

              {/* Desktop table view (md and up) */}
              <div className="hidden overflow-hidden border border-border md:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-onyx-elevated,_#1a1a1a)]">
                      <th className="border-b border-r border-border px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        Package
                      </th>
                      <th className="border-b border-r border-border px-6 py-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        Car
                      </th>
                      <th className="border-b border-r border-border px-6 py-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        SUV / Pickup
                      </th>
                      <th className="border-b border-border px-6 py-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        3-Row / XL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailingMatrix.map((row, i) => (
                      <tr key={row.service} className={i % 2 === 1 ? "bg-[var(--color-onyx-elevated,_#141414)]" : ""}>
                        <td className="border-r border-border px-6 py-6 align-top">
                          <div className="font-bold text-foreground">{row.service}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{row.subtitle}</div>
                        </td>
                        <td className="border-r border-border px-6 py-6 text-center align-middle">
                          <div className="text-2xl font-black text-[var(--color-gold)]">{row.car}</div>
                        </td>
                        <td className="border-r border-border px-6 py-6 text-center align-middle">
                          <div className="text-2xl font-black text-[var(--color-gold)]">{row.suvPickup}</div>
                        </td>
                        <td className="px-6 py-6 text-center align-middle">
                          <div className="text-2xl font-black text-[var(--color-gold)]">{row.xl}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card view (below md) */}
              <div className="space-y-6 md:hidden">
                {detailingMatrix.map((row) => (
                  <div key={row.service} className="border border-border p-5">
                    <div className="mb-4">
                      <div className="font-bold text-foreground">{row.service}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{row.subtitle}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
                      <div className="text-center">
                        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Car</div>
                        <div className="text-xl font-black text-[var(--color-gold)]">{row.car}</div>
                      </div>
                      <div className="text-center">
                        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">SUV/Pickup</div>
                        <div className="text-xl font-black text-[var(--color-gold)]">{row.suvPickup}</div>
                      </div>
                      <div className="text-center">
                        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">3-Row/XL</div>
                        <div className="text-xl font-black text-[var(--color-gold)]">{row.xl}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-muted-foreground">
                Starting prices. For our top-tier 4-hour multi-stage detail, see <a href="/vip-showroom" className="underline hover:text-[var(--color-gold)]">VIP Detail</a>.
              </p>
            </div>
          </section>
        }
      />
    </>
  );
}
