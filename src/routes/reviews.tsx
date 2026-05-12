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

const PLACEHOLDER = "[ Quote from Google review · pending content pass ]";

const reviews = [
  { name: "Sarah Mejia", quote: PLACEHOLDER },
  { name: "Racsaida Morel", quote: PLACEHOLDER },
  { name: "Diana Franco", quote: PLACEHOLDER },
  { name: "Vincent Gonzalez", quote: PLACEHOLDER },
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
              <p className="mt-5 text-base leading-relaxed text-foreground/90">{r.quote}</p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-bold">{r.name}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Google review</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaSection eyebrow="Become the next review" title="Your car. Our standard. Let's go." />
    </>
  );
}
