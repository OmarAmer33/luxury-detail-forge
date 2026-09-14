import { createFileRoute, Link } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { JsonLd } from "@/components/site/JsonLd";
import { ServiceSeo } from "@/components/site/ServiceSeo";
import { CtaSection } from "@/components/site/CtaSection";
import img from "@/assets/window-tint.jpg";

const faqs = [
  { q: "What's the difference between standard, carbon and ceramic film?", a: "Standard gives the look and privacy. Carbon adds better heat rejection and won't fade purple. Ceramic gives the most heat and UV rejection, zero signal interference and is the no-compromise pick." },
  { q: "Is window tint legal in New Jersey?", a: "NJ allows tint on rear and rear-side windows at any VLT, but front side windows and the windshield are restricted (medical exemption required). We'll guide you to a legal install." },
  { q: "Do you charge by vehicle size?", a: "No. Window tint is flat-priced regardless of vehicle size — same price for a coupe, sedan or SUV." },
  { q: "Is there a warranty?", a: "Yes — lifetime warranty on materials against bubbling, peeling and color shift, as long as you own the vehicle." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Window Tint",
  "provider": { "@id": "https://topeliteauto.com/#business" },
  "areaServed": { "@type": "City", "name": "Springfield, NJ" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Window Tint Packages",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Standard Film — Full Vehicle" }, "price": "300", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Carbon Film — Full Vehicle" }, "price": "375", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Film — Full Vehicle" }, "price": "500", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Standard Film — Windshield" }, "price": "160", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Carbon Film — Windshield" }, "price": "190", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Film — Windshield" }, "price": "250", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Standard Film — Front Windows Only" }, "price": "100", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Carbon Film — Front Windows Only" }, "price": "150", "priceCurrency": "USD" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Film — Front Windows Only" }, "price": "250", "priceCurrency": "USD" },
    ],
  },
};

export const Route = createFileRoute("/window-tint")({
  head: () => ({
    meta: [
      { title: "Window Tint · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Standard, carbon and ceramic window tint in Springfield, NJ. Flat pricing, no vehicle-size upcharge, lifetime warranty on materials." },
      { property: "og:title", content: "Window Tint · Top Elite Auto" },
      { property: "og:description", content: "Heat-rejecting window tint installed by a certified pro in Springfield, NJ." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://topeliteauto.com/window-tint" }],
  }),
  component: WindowTint,
});

const pricingMatrix = [
  {
    service: "Full Vehicle Tint",
    subtitle: "All windows, flat pricing regardless of size.",
    standard: "$300",
    carbon: "$375",
    ceramic: "$500",
  },
  {
    service: "Windshield Tint",
    subtitle: "Front windshield only.",
    standard: "$160",
    carbon: "$190",
    ceramic: "$250",
  },
  {
    service: "Front Windows Only",
    subtitle: "Two front side windows — for factory-tinted rears.",
    standard: "$100",
    carbon: "$150",
    ceramic: "$250",
  },
];

function WindowTint() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <ServiceSeo name="Window Tint" slug="window-tint" faqs={faqs} />
      <ServicePage
        eyebrow="Window Tint"
        title="Heat-rejecting tint, done right."
        subtitle="Three film tiers, flat pricing, no surprise upcharges by vehicle size. Standard, carbon, and ceramic film — installed by a certified pro."
        image={img}
        intro="Tint isn't just about looks — it's heat rejection, UV protection, and privacy. We offer three film types to match how serious you are. Standard for the look. Carbon for the upgrade. Ceramic for the no-compromise pick: maximum heat rejection, won't fade, won't interfere with phone signal."
        features={[
          { title: "Standard Film", body: "Clean look, solid privacy. The right call when appearance is the priority." },
          { title: "Carbon Film", body: "Deeper color stability and better heat rejection. Won't fade purple over time." },
          { title: "Ceramic Film", body: "Maximum heat rejection, UV block and clarity. No signal interference, no fade." },
        ]}
        includes={[
          "Free pre-tint consultation",
          "Professional installation by a certified tint specialist",
          "Edge-to-edge precision cut",
          "Lifetime warranty on materials (against bubbling, peeling, color shift)",
          "Same flat pricing regardless of vehicle size — no SUV upcharge, no coupe discount",
        ]}
        process={[
          { step: "01", title: "Consult", body: "We'll talk through the three film tiers and help you pick what fits your goals and budget." },
          { step: "02", title: "Prep", body: "Windows cleaned and prepped, debris-free." },
          { step: "03", title: "Install", body: "Hand-cut, precision-installed by a certified specialist." },
          { step: "04", title: "Cure", body: "Tint cures over 1–7 days depending on weather; we'll give you aftercare instructions." },
        ]}
      />

      <section className="border-t border-border surface-dark py-16 md:py-24">
        <div className="container-luxe">
          <div className="mb-10 max-w-2xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
              Pricing
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              All tint pricing in one place.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Flat rates regardless of vehicle size — same price for a coupe, sedan, or SUV. Lifetime warranty on materials, every tier.
            </p>
          </div>

          {/* Desktop table view (md and up) */}
          <div className="hidden overflow-hidden border border-border md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--color-onyx-elevated,_#1a1a1a)]">
                  <th className="border-b border-r border-border px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Service
                  </th>
                  <th className="border-b border-r border-border px-6 py-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Standard Film
                  </th>
                  <th className="border-b border-r border-border px-6 py-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Carbon Film
                  </th>
                  <th className="border-b border-border px-6 py-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Ceramic Film
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingMatrix.map((row, i) => (
                  <tr key={row.service} className={i % 2 === 1 ? "bg-[var(--color-onyx-elevated,_#141414)]" : ""}>
                    <td className="border-r border-border px-6 py-6 align-top">
                      <div className="font-bold text-foreground">{row.service}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{row.subtitle}</div>
                    </td>
                    <td className="border-r border-border px-6 py-6 text-center align-middle">
                      <div className="text-2xl font-black text-[var(--color-gold)]">{row.standard}</div>
                    </td>
                    <td className="border-r border-border px-6 py-6 text-center align-middle">
                      <div className="text-2xl font-black text-[var(--color-gold)]">{row.carbon}</div>
                    </td>
                    <td className="px-6 py-6 text-center align-middle">
                      <div className="text-2xl font-black text-[var(--color-gold)]">{row.ceramic}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card view (below md) */}
          <div className="space-y-6 md:hidden">
            {pricingMatrix.map((row) => (
              <div key={row.service} className="border border-border p-5">
                <div className="mb-4">
                  <div className="font-bold text-foreground">{row.service}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{row.subtitle}</div>
                </div>
                <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
                  <div className="text-center">
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Standard</div>
                    <div className="text-xl font-black text-[var(--color-gold)]">{row.standard}</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Carbon</div>
                    <div className="text-xl font-black text-[var(--color-gold)]">{row.carbon}</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Ceramic</div>
                    <div className="text-xl font-black text-[var(--color-gold)]">{row.ceramic}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Prices are starting rates. Some vehicles with complex glass profiles may require an in-person quote.
          </p>
        </div>
      </section>

      <section className="border-t border-border surface-dark py-16">
        <div className="container-luxe">
          <Link
            to="/book"
            className="inline-flex items-center justify-center gap-3 bg-[var(--color-gold)] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-primary-foreground)] transition-all hover:bg-[var(--color-gold-soft)]"
          >
            Book your tint
          </Link>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
