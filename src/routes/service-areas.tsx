import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CtaSection } from "@/components/site/CtaSection";
import { JsonLd } from "@/components/site/JsonLd";
import { MapPin, ArrowRight } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";

export const Route = createFileRoute("/service-areas")({
  head: () => ({
    meta: [
      { title: "Service Areas — Auto Detailing & Ceramic Coating · Top Elite Auto" },
      { name: "description", content: "Top Elite Auto serves Springfield, NJ and surrounding towns including Summit, Millburn, Short Hills, Maplewood, Cranford, Westfield, Union and more. Premium detailing, ceramic coating and PPF." },
      { property: "og:title", content: "Service Areas — Top Elite Auto" },
      { property: "og:description", content: "Premium auto detailing, ceramic coating and PPF serving Springfield, NJ and surrounding Union County towns." },
    ],
  }),
  component: ServiceAreas,
});

const primaryTowns = [
  { name: "Springfield", state: "NJ", note: "Home base" },
  { name: "Summit", state: "NJ", note: "10 min" },
  { name: "Millburn", state: "NJ", note: "10 min" },
  { name: "Short Hills", state: "NJ", note: "10 min" },
  { name: "Maplewood", state: "NJ", note: "10 min" },
  { name: "Cranford", state: "NJ", note: "15 min" },
  { name: "Westfield", state: "NJ", note: "15 min" },
  { name: "Union", state: "NJ", note: "15 min" },
  { name: "Mountainside", state: "NJ", note: "15 min" },
  { name: "Berkeley Heights", state: "NJ", note: "15 min" },
  { name: "New Providence", state: "NJ", note: "15 min" },
  { name: "Chatham", state: "NJ", note: "20 min" },
];

const nearbyTowns = [
  "Livingston", "Florham Park", "Madison", "Scotch Plains", "Fanwood",
  "Garwood", "Kenilworth", "Roselle Park", "Hillside", "Elizabeth",
  "Linden", "Rahway", "Clark", "Winfield",
];

const areaJson = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Top Elite Auto",
  "@id": "https://topeliteauto.com/#business",
  "url": "https://topeliteauto.com",
  "telephone": "+1-908-293-3934",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3 Dundar Rd",
    "addressLocality": "Springfield",
    "addressRegion": "NJ",
    "postalCode": "07081",
    "addressCountry": "US",
  },
  "areaServed": [
    ...primaryTowns.map((t) => ({
      "@type": "City",
      "name": t.name + ", " + t.state,
    })),
    ...nearbyTowns.map((t) => ({
      "@type": "City",
      "name": t + ", NJ",
    })),
  ],
};

function ServiceAreas() {
  return (
    <>
      <JsonLd data={areaJson} />
      <PageHero
        eyebrow="Service Areas"
        title="Springfield — and everywhere close to it."
        subtitle="We're based at 3 Dundar Rd in Springfield, NJ. Most of our clients are within a 15-minute drive, and we welcome owners from across Union County and beyond."
        image={heroCar}
      />

      <section className="container-luxe py-24">
        <span className="eyebrow">Where we work</span>
        <h2 className="mt-5 text-4xl md:text-5xl">Towns we serve.</h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Most of our clients drop off from nearby towns. If you're outside this
          radius, call us — we've had cars come from much farther for the right
          work.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {primaryTowns.map((town) => (
            <div
              key={town.name}
              className="flex items-start gap-4 border border-border p-6"
            >
              <MapPin size={18} className="mt-1 shrink-0 text-[var(--color-gold)]" />
              <div>
                <div className="text-base font-bold">
                  {town.name}, {town.state}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {town.note}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-lg font-bold uppercase tracking-wider">Also nearby</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {nearbyTowns.map((town) => (
              <span
                key={town}
                className="border border-border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
              >
                {town}, NJ
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            { label: "Ceramic Coating", to: "/ceramic-coating" },
            { label: "Paint Protection Film", to: "/paint-protection" },
            { label: "Car Wraps", to: "/car-wraps" },
            { label: "In-Shop Detailing", to: "/detailing" },
            { label: "Window Tint", to: "/window-tint" },
            { label: "VIP Detail", to: "/vip-showroom" },
          ].map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group flex items-center justify-between border border-border p-6 transition-colors hover:border-[var(--color-gold)]"
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em]">
                {s.label}
              </span>
              <ArrowRight
                size={14}
                className="text-muted-foreground transition-colors group-hover:text-[var(--color-gold)]"
              />
            </Link>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Not local?"
        title="We welcome cars from anywhere."
        body="If you're within driving distance of Springfield, NJ, it's worth the trip."
      />
    </>
  );
}
