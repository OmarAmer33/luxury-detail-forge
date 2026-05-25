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
  { name: "Bryan Correia", quote: "Top Elite is hands-down the best detailing shop I've ever used. My car looks absolutely flawless — the paint shines like new, the interior is spotless, and every little detail was handled with care. If you want your car treated like a luxury vehicle, even if it isn't one, Top Elite Auto is the place to go.", source: "Google review · Local Guide" },
  { name: "Tim Sweidan", quote: "I brought my Mustang in for a paint enhancement and a 1-year ceramic coating, and I couldn't be happier with the results. The paint looks incredibly glossy and smooth — honestly better than when I bought the car. Attention to detail was top-notch, and the car was treated with real care from start to finish. If you're on the fence about getting your vehicle detailed or coated, this is 100% worth it.", source: "Google review" },
  { name: "Daniel Duran", quote: "Excellent job! I normally don't leave reviews, but this one is well deserved. I first had one of my cars detailed with a ceramic coating, and the results were so impressive that I had to bring my second vehicle in to have it done as well. Both cars look amazing, and the attention to detail really shows. The team is very professional, easy to work with, and clearly take pride in what they do. I'll definitely be going back when it's time to have my cars done again.", source: "Google review" },
  { name: "Ardy Kalezic", quote: "Derek and his team always come through! They keep all my cars spotless — professionalism and perfection every time. \"Attention to detail\" doesn't even begin to describe their work.", source: "Google review" },
  { name: "D'Angelo Daniel", quote: "The results are simply stunning. The paint is deep and glossy, the interior smells fresh, and every crack, crevice, and wheel well was immaculate. You can see the extra time and care he puts into the process that makes this a 1 of 1 place to go to. Trust and believe me, you won't be disappointed.", source: "Google review" },
  { name: "melinda zito", quote: "I wanted to have my car detailed before turning it in to make a new purchase. I did not want to be nickeled and dimed by the dealership on their offer. I believe I got back 10 fold of the cost to have the car made to look as close to right off the lot as possible. Derrick was so great. Very professional and thorough. Will be using him again when my new car needs a detailing.", source: "Google review" },
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
            <div className="mt-2 flex items-center gap-1 text-[var(--color-star-gold)]">
              {[0,1,2,3,4].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
          </div>
          <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Across Google · Yelp · Facebook
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <article key={i} className="border border-border surface-dark p-8">
              <div className="flex gap-1 text-[var(--color-star-gold)]">
                {[0,1,2,3,4].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">{r.quote}</p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-bold">{r.name}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.source}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaSection eyebrow="Become the next review" title="Your car. Our standard. Let's go." />
    </>
  );
}
