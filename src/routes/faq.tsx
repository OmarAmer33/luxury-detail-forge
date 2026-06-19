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

const sections = [
  {
    title: "Services & Education",
    anchor: "services",
    faqs: [
      {
        q: "Ceramic Coating vs. Wax — what's the difference?",
        a: "Wax is a traditional paint protectant that sits on top of your vehicle's surface and lasts anywhere from a few weeks to a few months depending on weather and washing frequency. It gives your car a warm, glossy shine but offers minimal protection against UV rays, chemicals, or environmental contaminants. Ceramic coating is a professional-grade liquid polymer that chemically bonds to your vehicle's clear coat, creating a semi-permanent layer of protection. Unlike wax, it doesn't wash away. A properly applied ceramic coating lasts 2 to 5 years, repels water and dirt, resists UV damage, and maintains a deep, glossy finish with far less maintenance. For real long-term protection, ceramic coating is the clear upgrade.",
      },
      {
        q: "PPF vs. Ceramic Coating — which one do you need?",
        a: "PPF and ceramic coating serve different purposes. PPF is a thick, transparent urethane film applied directly to your paint, designed to absorb physical impacts — rock chips, road debris, minor scratches, and key marks. It's the best option for protecting high-impact areas like your hood, bumper, mirrors, and rocker panels. Ceramic coating is a chemical barrier that bonds to your paint and protects against UV rays, chemical stains, water spots, and everyday contamination. It enhances gloss and makes the surface easier to clean — but it won't absorb a rock chip the way PPF will. You don't have to choose. Many of our clients do both: PPF for impact protection, ceramic coating on top for hydrophobic gloss and UV defense. That combo is the ultimate paint protection.",
      },
      {
        q: "What is paint correction and do you need it?",
        a: "Paint correction is a multi-step machine polishing process used to remove surface defects from your vehicle's clear coat — swirl marks, light scratches, water spots, oxidation, and buffer trails. These are imperfections that dull your paint and make it look worn even on a clean car. We use professional-grade machine polishers and compounds to carefully level the clear coat and restore optical clarity. The result is a finish that looks deeper, glossier, and closer to how it looked when it left the factory.",
      },
      {
        q: "How long does ceramic coating last?",
        a: "Our professional-grade ceramic coatings are rated for 2 to 5 years depending on the package. The 2-Year Ceramic starts at $950 and the 5-Year Ceramic starts at $1,200. Longevity depends on maintenance — we provide full aftercare instructions at pickup.",
      },
      {
        q: "What is paint protection film (PPF) and do I need it?",
        a: "PPF is a clear, self-healing urethane film applied to painted surfaces to absorb rock chips, road debris, minor scratches, and key marks. It's the best protection available for high-impact areas — hood, bumper, mirrors, and rocker panels. Every panel is hand-cut on the vehicle for a flawless fit — no templates, no computer-cut patterns. Coverage is quote-based depending on the panels you want protected. Many clients pair PPF with a ceramic coating on top for the ultimate paint protection combo.",
      },
      {
        q: "What is included in the VIP Detail?",
        a: "Our top-tier VIP Detail is roughly a 4-hour multi-stage process that includes full decontamination, hand wash, clay bar treatment, iron and tar removal, deep interior cleaning with steam, engine bay clean and dress, light paint correction, premium sealant, and tire and wheel detail. Starting at $600 for cars and $750 for SUVs and trucks.",
      },
      {
        q: "What window tint options do you offer?",
        a: "We offer three film tiers — Standard Film for a clean look and solid privacy, Carbon Film for better heat rejection and zero fade, and Ceramic Film for maximum heat and UV rejection with zero signal interference. All are flat-priced regardless of vehicle size and carry a lifetime warranty on materials.",
      },
      {
        q: "How much does a full car wrap cost?",
        a: "Full vehicle wraps are quote-based because pricing depends on vehicle size, film selection, and any necessary paint correction beforehand. We use only premium cast films from 3M and Avery Dennison. Book a free consult and we'll walk through finishes and quote on the spot.",
      },
      {
        q: "Can you remove a previous ceramic coating or wrap?",
        a: "Yes. We safely remove old coatings and vinyl wraps without damaging the underlying paint. We often perform this as prep before applying a new coating or wrap, and we can assess paint condition underneath during the process.",
      },
    ],
  },
  {
    title: "Washing & Maintenance",
    anchor: "washing",
    faqs: [
      {
        q: "Can I take my car through an automatic car wash after ceramic coating?",
        a: "Avoid automatic car washes — especially brush-style ones. The brushes and harsh chemicals degrade your ceramic coating over time and introduce new swirl marks. Stick to hand washing or touchless car washes to preserve your investment.",
      },
      {
        q: "What's the two-bucket wash method?",
        a: "The two-bucket method is the safest way to hand wash your vehicle. One bucket holds your clean soapy water, the other holds plain rinse water. After each panel, you rinse your wash mitt in the rinse bucket before reloading it with soap. This prevents dirt and debris from being dragged back across your paint — the number one cause of swirl marks.",
      },
      {
        q: "How do I remove water spots from my paint?",
        a: "Light water spots can sometimes be removed with a dedicated water spot remover or a diluted white vinegar solution. More severe or etched water spots may require paint correction to fully eliminate. The best prevention is drying your vehicle thoroughly after every wash.",
      },
      {
        q: "What products should I use to maintain my detail at home?",
        a: "Use a pH-neutral car wash soap, a microfiber wash mitt, and microfiber drying towels. If your vehicle has a ceramic coating, use a ceramic-safe spray detailer as a booster between washes. Avoid dish soap or all-purpose cleaners on your paint — they strip protective layers.",
      },
      {
        q: "How often should I wash my car?",
        a: "Every two weeks is the general recommendation. If you drive frequently, park outside, or live near the coast, weekly washes will help prevent contaminant buildup that can damage your paint over time.",
      },
    ],
  },
  {
    title: "Paint & Exterior",
    anchor: "paint",
    faqs: [
      {
        q: "What causes swirl marks on my paint?",
        a: "Swirl marks are fine scratches in your clear coat caused by improper washing techniques, dirty towels, automatic car washes, and even wiping your car down with a dry cloth. Dark-colored vehicles show them most prominently.",
      },
      {
        q: "Can scratches be removed without repainting?",
        a: "It depends on the depth of the scratch. If the scratch hasn't penetrated through the clear coat down to the base coat or metal, paint correction can significantly reduce or fully remove it. Deep scratches that expose bare metal or primer typically require touch-up paint or a body shop visit.",
      },
      {
        q: "What's the difference between single-stage and multi-stage paint correction?",
        a: "Single-stage correction involves one round of polishing, typically used for light swirls and surface contamination. Multi-stage correction involves multiple rounds using progressively finer compounds and polishes to address heavier defects and maximize paint clarity. The right approach depends on the condition of your paint.",
      },
      {
        q: "Does color matter when it comes to paint care?",
        a: "Absolutely. Dark colors like black, navy, and dark grey show swirl marks, water spots, and dust far more easily than lighter colors. They require more careful washing techniques and benefit greatly from paint correction and ceramic coating to stay looking sharp.",
      },
      {
        q: "What is clear coat and why does it matter?",
        a: "Clear coat is the transparent protective layer applied over your vehicle's base color coat. It's what gives your paint its gloss and shields the color underneath from UV rays, chemicals, and environmental damage. Most paint correction and protection work is done at the clear coat level — which is why protecting and maintaining it is so important.",
      },
    ],
  },
  {
    title: "Interior",
    anchor: "interior",
    faqs: [
      {
        q: "What's included in an interior detail?",
        a: "A full interior detail typically includes vacuuming all surfaces, steam cleaning or shampooing carpets and floor mats, cleaning and conditioning all plastic and vinyl surfaces, cleaning glass, wiping down vents and crevices, and treating leather if applicable. At Top Elite Auto we go through every inch of the cabin.",
      },
      {
        q: "Can you remove pet hair from my interior?",
        a: "Yes. Pet hair removal is part of our interior detail process. Depending on how embedded the hair is, it may require specialized tools and extra time — but we get it done.",
      },
      {
        q: "How do you clean leather seats without damaging them?",
        a: "We use pH-balanced leather cleaners applied with soft brushes to lift dirt from the grain without stripping the leather. Leather conditioning is offered as an add-on to restore moisture and prevent cracking or fading — ask us if you'd like it included with your detail.",
      },
      {
        q: "Can you remove smoke smell from a car?",
        a: "In most cases, yes. Smoke odor removal requires a deep interior detail combined with an ozone treatment or odor eliminator that neutralizes the smell at the source rather than masking it. Severe cases may need multiple treatments.",
      },
      {
        q: "What's the difference between cleaning and conditioning leather?",
        a: "Cleaning removes dirt, oils, and surface grime from the leather. Conditioning replenishes the moisture and nutrients in the leather to keep it soft, supple, and resistant to cracking. You need both — conditioning alone over dirty leather just seals the dirt in.",
      },
    ],
  },
  {
    title: "Vehicle Specific",
    anchor: "vehicle",
    faqs: [
      {
        q: "Do you detail trucks and SUVs the same as cars?",
        a: "The process is the same but the scope is larger. Trucks and SUVs have more surface area, larger interiors, and often more textured trim and bed areas to address. Pricing reflects the additional time and product required.",
      },
      {
        q: "Can new cars benefit from detailing?",
        a: "Absolutely. New vehicles often come from the dealership with transport scratches, contamination, and in some cases poor dealer prep work already on the paint. Paint correction and ceramic coating on a new car protects your investment from day one and ensures the paint stays in peak condition for years.",
      },
      {
        q: "Do you work on luxury and exotic vehicles?",
        a: "Yes. We regularly work on high-end vehicles including luxury SUVs, sports cars, and exotics. These vehicles require extra care, premium products, and experienced hands — all of which Top Elite Auto provides.",
      },
      {
        q: "Can you detail a leased vehicle?",
        a: "Yes, and it's actually a smart move. Keeping a leased vehicle in excellent condition helps you avoid excess wear and damage charges at lease return. Paint correction and interior detailing before turn-in can save you money.",
      },
    ],
  },
  {
    title: "Before & After Your Appointment",
    anchor: "appointment",
    faqs: [
      {
        q: "Should I clean my car before bringing it in?",
        a: "No need. That's what we're here for. Just bring it in as-is and we'll take care of everything.",
      },
      {
        q: "How long will my vehicle be at the shop?",
        a: "It depends on the services booked. A basic detail may take 2 to 4 hours. A full paint correction with ceramic coating can take 1 to 2 days. We'll give you a clear timeframe when you book so you can plan accordingly.",
      },
      {
        q: "What should I remove from my car before dropping it off?",
        a: "We recommend removing any personal valuables, car seats, and any items in the trunk or cargo area you'd prefer not to have moved. Everything else we'll handle.",
      },
      {
        q: "How do I maintain my results after my appointment?",
        a: "Wash regularly using the two-bucket method or a touchless car wash, dry thoroughly after every wash, use a ceramic boost spray if your vehicle was coated, and avoid parking under trees or near construction when possible. We'll walk you through a full aftercare routine at pickup.",
      },
    ],
  },
  {
    title: "Booking & Policies",
    anchor: "booking",
    faqs: [
      {
        q: "Do I need to make an appointment?",
        a: "Yes — we work by appointment so every vehicle gets the time and attention it deserves. You can book online through our booking form or call/text us at 908.293.3934. We typically respond within one business day.",
      },
      {
        q: "What is your cancellation policy?",
        a: "We understand plans change. Please give us at least 24 hours notice if you need to reschedule or cancel so we can offer your slot to another client. Repeated same-day cancellations may require a deposit for future bookings.",
      },
      {
        q: "What areas do you serve?",
        a: "We're located at 3 Dundar Rd in Springfield, NJ and serve clients throughout Union County and surrounding areas including Summit, Millburn, Short Hills, Maplewood, Cranford, Westfield, Union, Mountainside, Berkeley Heights, New Providence, and Chatham.",
      },
      {
        q: "Do you offer motorcycle services?",
        a: "Yes — we offer motorcycle ceramic coating starting at $350. Contact us for other motorcycle detailing or protection services.",
      },
    ],
  },
];

const allFaqs = sections.flatMap((s) => s.faqs);

const faqPageJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": allFaqs.map((f) => ({
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
          <nav
            aria-label="FAQ sections"
            className="mb-16 border border-border surface-dark p-6"
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Jump to a section
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.anchor}>
                  <a
                    href={`#${s.anchor}`}
                    className="text-foreground/80 transition-colors hover:text-[var(--color-gold)]"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-20">
            {sections.map((section) => (
              <section key={section.anchor} aria-labelledby={section.anchor}>
                <h2
                  id={section.anchor}
                  className="scroll-mt-32 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] gold-underline"
                >
                  {section.title}
                </h2>
                <div className="mt-8 space-y-10">
                  {section.faqs.map((f, i) => (
                    <div key={i} className="border-b border-border pb-8">
                      <h3 className="text-xl font-bold leading-snug md:text-2xl">
                        {f.q}
                      </h3>
                      <p className="mt-4 leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
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
