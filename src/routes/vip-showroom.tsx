import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaSection } from "@/components/site/CtaSection";
import { PageHero } from "@/components/site/PageHero";
import showroom from "@/assets/showroom.jpg";
import { Check, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/vip-showroom")({
  head: () => ({
    meta: [
      { title: "VIP Detail · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Our top-tier ~4-hour multi-stage premium detail. Full decon, hand wash, deep interior, engine bay, light correction and premium sealant. Starting at $515." },
      { property: "og:title", content: "VIP Detail · Top Tier · Top Elite Auto" },
      { property: "og:description", content: "Top-tier multi-stage premium detail in Springfield, NJ. Starting at $515." },
      { property: "og:image", content: showroom },
    ],
  }),
  component: VIP,
});

function VIP() {
  const includes = [
    "Full multi-stage decontamination",
    "Hand wash, two-bucket method",
    "Clay bar treatment",
    "Iron and tar fallout remover",
    "Deep interior clean — vacuum, steam, vent detail",
    "Leather conditioning",
    "Engine bay clean and dress",
    "Light paint correction",
    "Premium sealant application",
    "Tire and wheel detail",
  ];

  return (
    <>
      <PageHero
        eyebrow="VIP Detail · Top Tier"
        title="The full reset."
        subtitle="Our top-tier in-shop detail. Roughly four hours of multi-stage work — exterior, interior, engine bay, wheels — done by hand, panel by panel, until the car looks like it just rolled off the showroom floor."
        image={showroom}
      />

      <section className="container-luxe grid gap-16 py-24 md:grid-cols-[1fr_1.4fr] md:gap-24">
        <div>
          <h2 className="text-3xl gold-underline md:text-4xl">The standard.</h2>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            VIP isn't a wash. It's not a detail package with an upcharge tacked
            on. It's a deliberate, multi-stage process that takes about four
            hours and resets the car to a state most owners forgot it could
            reach.
          </p>
          <p className="text-foreground">
            Every panel hand-washed. Every contaminant lifted. Every interior
            surface steamed, conditioned and protected. Engine bay included.
            Wheels included. No upsells, no surprises.
          </p>
        </div>
      </section>

      <section className="border-y border-border surface-dark py-24">
        <div className="container-luxe grid gap-16 md:grid-cols-2">
          <div>
            <span className="eyebrow">What's included</span>
            <h2 className="mt-5 text-4xl md:text-5xl">Everything in one visit.</h2>
            <p className="mt-6 text-muted-foreground">
              The full process, on every VIP appointment. No tiered upsells,
              no "premium" version hiding behind a paywall.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 text-sm text-muted-foreground">
              <Clock size={16} className="text-[var(--color-gold)]" />
              Approx. 4 hours · By appointment
            </div>
          </div>
          <ul className="space-y-4">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-4 border-b border-border pb-4">
                <Check className="mt-1 shrink-0 text-[var(--color-gold)]" size={18} />
                <span className="text-base text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-luxe py-24">
        <span className="eyebrow">Pricing</span>
        <h2 className="mt-5 text-4xl md:text-5xl">Starting at.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="border border-border surface-dark p-8">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Cars</div>
            <div className="mt-4 text-5xl font-black text-[var(--color-gold)]">$515</div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Starting · ~4 hours</div>
          </div>
          <div className="border border-border surface-dark p-8">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">SUVs &amp; Trucks</div>
            <div className="mt-4 text-5xl font-black text-[var(--color-gold)]">$665</div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Starting · ~4 hours</div>
          </div>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Final pricing depends on size, condition and any add-ons.
        </p>
        <Link
          to="/book"
          className="mt-10 inline-flex items-center gap-3 bg-[var(--color-gold)] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-primary-foreground)] transition-all hover:bg-[var(--color-gold-soft)]"
        >
          Reserve a VIP Slot <ArrowRight size={16} />
        </Link>
      </section>

      <CtaSection
        eyebrow="Reserve"
        title="Book your VIP detail."
        body="Slots are limited — VIP appointments take half a day. Tell us about the car and we'll lock in a time."
      />
    </>
  );
}
