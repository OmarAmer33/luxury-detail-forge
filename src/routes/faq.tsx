import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CtaSection } from "@/components/site/CtaSection";
import { JsonLd } from "@/components/site/JsonLd";
import detailing from "@/assets/detailing.jpg";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Auto Detailing, Ceramic Coating & PPF · Top Elite Auto" },
      { name: "description", content: "Answers to common questions about ceramic coating, paint protection film, car wraps, window tint and detailing at Top Elite Auto in Springfield, NJ." },
      { property: "og:title", content: "FAQ — Top Elite Auto" },
      { property: "og:description", content: "Common questions about ceramic coating, PPF, wraps and detailing in Springfield, NJ." },
    ],
    links: [{ rel: "canonical", href: "https://topeliteauto.com/faq" }],
  }),
  component: FAQ,
});

const faqs = [
  {
    q: "How long does ceramic coating last?",
    a: "Our professional-grade ceramic coatings are rated for 2 to 9 years depending on the package you choose. The 2-Year Ceramic starts at $950 and the 5-Year Ceramic starts at $1,000. Longevity depends on maintenance — we provide full aftercare instructions.",
  },
  {
    q: "What is paint protection film (PPF) and do I need it?",
    a: "PPF is a clear, self-healing urethane film applied to painted surfaces to absorb rock chips, road rash and minor abrasions. If you drive on highways, park in public lots, or simply want to preserve your paint's factory finish, PPF is the most effective protection available. We offer partial front, full front and full vehicle coverage.",
  },
  {
    q: "How much does a full car wrap cost?",
    a: "Full vehicle wraps are quote-based because pricing depends on vehicle size, film selection and any necessary paint correction beforehand. We use only premium cast films from 3M and Avery Dennison. Book a free consult and we'll walk through finishes and quote on the spot.",
  },
  {
    q: "What is included in the VIP Detail?",
    a: "Our top-tier VIP Detail is roughly a 4-hour multi-stage process that includes full decontamination, hand wash, clay bar treatment, iron and tar removal, deep interior cleaning with steam, leather conditioning, engine bay clean and dress, light paint correction, premium sealant and tire/wheel detail. Starting at $600 for cars and $750 for SUVs/trucks.",
  },
  {
    q: "Do you offer paint correction?",
    a: "Yes — paint correction is included as part of our ceramic coating and VIP Detail packages. We machine-polish to remove swirls, scratches and oxidation before applying any coating or sealant. Standalone paint correction is available by request.",
  },
  {
    q: "What window tint options do you offer?",
    a: "We offer three film tiers: Standard Film (clean look, solid privacy), Carbon Film (better heat rejection, no fade) and Ceramic Film (maximum heat and UV rejection, zero signal interference). All are flat-priced regardless of vehicle size and carry a lifetime warranty on materials.",
  },
  {
    q: "How long does a typical appointment take?",
    a: "It depends on the service. A standard detail may take 2–3 hours. Ceramic coatings require the vehicle to stay with us until fully cured. The VIP Detail takes roughly 4 hours. PPF and wraps can take 1–3 days depending on coverage. We'll give you a clear timeline when you book.",
  },
  {
    q: "Do I need to make an appointment?",
    a: "Yes — we work by appointment so every vehicle gets the time and attention it deserves. You can book online through our booking form or call/text us at 908.293.3934. We typically respond within one business day.",
  },
  {
    q: "What areas do you serve?",
    a: "We're located at 3 Dundar Rd in Springfield, NJ and serve clients throughout Union County and surrounding areas including Summit, Millburn, Short Hills, Maplewood, Cranford, Westfield, Union, Mountainside, Berkeley Heights, New Providence and Chatham.",
  },
  {
    q: "Do you offer motorcycle services?",
    a: "Yes — we offer motorcycle ceramic coating starting at $350. Contact us for other motorcycle detailing or protection services.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We understand plans change. Please give us at least 24 hours notice if you need to reschedule or cancel so we can offer your slot to another client. Repeated same-day cancellations may require a deposit for future bookings.",
  },
  {
    q: "Can you remove a previous ceramic coating or wrap?",
    a: "Yes — we safely remove old coatings and vinyl wraps without damaging the underlying paint. We often perform this as prep before applying a new coating or wrap, and we can assess paint condition underneath during the process.",
  },
];

const faqPageJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a,
    },
  })),
};

function FAQ() {
  return (
    <>
      <JsonLd data={faqPageJson} />
      <PageHero
        eyebrow="FAQ"
        title="Questions worth asking."
        subtitle="Straight answers about ceramic coating, PPF, wraps, tint and detailing — no upsell theater."
        image={detailing}
      />

      <section className="container-luxe py-24">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-border pb-10">
                <h2 className="text-xl font-bold leading-snug md:text-2xl">
                  {f.q}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 border border-border surface-dark p-8 md:p-12">
            <h3 className="text-2xl font-bold">Still have questions?</h3>
            <p className="mt-3 text-muted-foreground">
              Call or text us directly — we reply within one business day.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="tel:9082933934"
                className="inline-flex items-center gap-3 bg-[var(--color-gold)] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-primary-foreground)] transition-all hover:bg-[var(--color-gold-soft)]"
              >
                Call 908.293.3934
              </a>
              <Link
                to="/book"
                className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-foreground transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                Book an appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection eyebrow="Ready when you are" title="Let's talk about your car." />
    </>
  );
}
