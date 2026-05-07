import { createFileRoute } from "@tanstack/react-router";
import { CtaSection } from "@/components/site/CtaSection";
import { PageHero } from "@/components/site/PageHero";
import results from "@/assets/results.jpg";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews & Results · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Real owners, real cars, real results. See what Top Elite Auto clients across New Jersey say about our work." },
      { property: "og:title", content: "Reviews & Results · Top Elite Auto" },
      { property: "og:description", content: "Reviews from real Top Elite Auto clients across New Jersey." },
      { property: "og:image", content: results },
    ],
  }),
  component: Reviews,
});

const reviews = [
  { name: "Marcus T.", car: "Porsche 911 GT3", quote: "Best ceramic coating job I've had on any car. Period. The prep work alone is something other shops skip — these guys obsess over it." },
  { name: "Alessandra R.", car: "Range Rover Autobiography", quote: "They treat the car like it's theirs. Walked me through every step. No upsells, no nonsense, just craftsmanship." },
  { name: "David K.", car: "BMW M5 Competition", quote: "Wrapped in satin black. Flawless edges, perfect alignment. Genuinely looks like it came from the factory that way." },
  { name: "Priya S.", car: "Tesla Model S Plaid", quote: "Full front PPF and ceramic. Not a single bubble, edge or flaw. Worth every dollar to know my paint is safe." },
  { name: "Jonathan V.", car: "Mercedes G63", quote: "Picked it up looking better than the day I bought it. Interior was pristine, paint was glass." },
  { name: "Carla M.", car: "Audi RS6 Avant", quote: "Honest pricing, no upsells, and they actually answer the phone. Rare combo. Will be back." },
];

function Reviews() {
  return (
    <>
      <PageHero
        eyebrow="Reviews & Results"
        title="Owners don't whisper about good work."
        subtitle="Real owners, real cars, real results. Here's what people across New Jersey say after we hand back the keys."
        image={results}
      />

      <section className="container-luxe py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="text-6xl font-black text-[var(--color-gold)]">5.0</div>
            <div className="mt-2 flex items-center gap-1 text-[var(--color-gold)]">
              {[0,1,2,3,4].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
          </div>
          <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Across Google · Yelp · Facebook
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.name} className="border border-border bg-[var(--color-onyx)] p-8">
              <div className="flex gap-1 text-[var(--color-gold)]">
                {[0,1,2,3,4].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">"{r.quote}"</p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-bold">{r.name}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.car}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaSection eyebrow="Become the next review" title="Your car. Our standard. Let's go." />
    </>
  );
}
