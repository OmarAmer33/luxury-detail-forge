import { createFileRoute, Link } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { JsonLd } from "@/components/site/JsonLd";
import { ServiceSeo } from "@/components/site/ServiceSeo";
import { CtaSection } from "@/components/site/CtaSection";
import img from "@/assets/detailing.jpg";

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

const windshieldTiers = [
  { name: "Standard Film", price: "$160" },
  { name: "Carbon Film", price: "$190" },
  { name: "Ceramic Film", price: "$250" },
];

const frontTwoTiers = [
  { name: "Standard Film", price: "$100" },
  { name: "Carbon Film", price: "$150" },
  { name: "Ceramic Film", price: "$250" },
];

function PriceBlock({
  eyebrow,
  title,
  note,
  tiers,
}: {
  eyebrow: string;
  title: string;
  note?: string;
  tiers: { name: string; price: string }[];
}) {
  return (
    <section className="border-t border-border py-24">
      <div className="container-luxe">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-5 text-4xl md:text-5xl">{title}</h2>
        {note && <p className="mt-5 max-w-2xl text-muted-foreground">{note}</p>}
        <div className="mt-12 grid gap-px bg-border border border-border">
          {tiers.map((t) => (
            <div key={t.name} className="grid grid-cols-[1fr_auto] items-baseline gap-6 bg-background p-6 md:p-8">
              <div className="text-lg font-bold">{t.name}</div>
              <div className="text-xl font-black text-[var(--color-gold)] md:text-2xl whitespace-nowrap">{t.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
        pricing={{
          tiers: [
            { name: "Standard Film", price: "$300", note: "Starting" },
            { name: "Carbon Film", price: "$375", note: "Starting" },
            { name: "Ceramic Film", price: "$500", note: "Starting" },
          ],
          footnote: "Full Vehicle Tint — flat pricing regardless of vehicle size.",
        }}
      />

      <PriceBlock
        eyebrow="Windshield Tint"
        title="Windshield only."
        tiers={windshieldTiers}
      />

      <PriceBlock
        eyebrow="Front Windows Only"
        title="Front two windows."
        note="Two front side windows — for vehicles that come factory-tinted in the rear and need the fronts matched."
        tiers={frontTwoTiers}
      />

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
