import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/site/JsonLd";
import { CtaSection } from "@/components/site/CtaSection";
import { PageHero } from "@/components/site/PageHero";
import img from "@/assets/wraps.jpg";

const URL = "https://topeliteauto.com/blog/choosing-car-wrap-finishes";
const PUBLISHED = "2026-06-05";

const articleJson = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Matte vs Satin vs Gloss: How to Choose a Car Wrap Finish",
  description:
    "A practical guide to choosing between matte, satin and gloss vinyl wrap finishes — covering durability, maintenance, fading and which finish suits your car best.",
  image: `https://topeliteauto.com${img}`,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { "@type": "Organization", name: "Top Elite Auto" },
  publisher: { "@id": "https://topeliteauto.com/#business" },
  mainEntityOfPage: URL,
};

const breadcrumbJson = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://topeliteauto.com/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://topeliteauto.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Choosing a Car Wrap Finish",
      item: URL,
    },
  ],
};

export const Route = createFileRoute("/blog/choosing-car-wrap-finishes")({
  head: () => ({
    meta: [
      { title: "Matte vs Satin vs Gloss: Choosing a Car Wrap Finish · Top Elite Auto" },
      {
        name: "description",
        content:
          "How to choose between matte, satin and gloss vinyl wrap finishes — durability, maintenance, fade resistance and which finish fits your car. Springfield, NJ wrap shop.",
      },
      { property: "og:title", content: "Matte vs Satin vs Gloss: Choosing a Car Wrap Finish" },
      {
        property: "og:description",
        content:
          "A practical guide from Springfield, NJ wrap installers — durability, washing, fade resistance and how to pick the right vinyl finish.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: WrapFinishesGuide,
});

function WrapFinishesGuide() {
  return (
    <>
      <JsonLd data={articleJson} />
      <JsonLd data={breadcrumbJson} />

      <PageHero
        eyebrow="Guide · Vinyl Wraps"
        title="Matte vs Satin vs Gloss: choosing a car wrap finish."
        subtitle="Three finishes that look completely different, age differently, and wash differently. Here's how a Springfield, NJ wrap shop helps clients pick the right one."
        image={img}
      />

      <article className="container-luxe prose-luxe py-24">
        <div className="mx-auto max-w-3xl space-y-10 text-lg leading-relaxed text-muted-foreground">
          <p>
            A vinyl wrap is one of the biggest visual decisions you can make on
            a car. The color matters, but the <strong className="text-foreground">finish</strong>{" "}
            matters just as much — it changes how light reads off the panel,
            how the wrap ages, and how much work it is to keep clean. Below is
            the same conversation we have with clients before any wrap goes on
            at our Springfield, NJ shop.
          </p>

          <section>
            <h2 className="gold-underline mt-0 text-3xl text-foreground">Gloss</h2>
            <p className="mt-5">
              Gloss is the closest match to factory paint. Light reflects in a
              clean line, colors look deepest, and minor imperfections in the
              underlying paint are easier to hide. It's also the most forgiving
              finish to wash — soap and water lift dirt easily and bug splatter
              comes off without much effort.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-6">
              <li><strong className="text-foreground">Best for:</strong> clients who want a paint-like look or are color-changing into a hue OEMs don't offer.</li>
              <li><strong className="text-foreground">Durability:</strong> 5–7 years on premium cast film with normal care.</li>
              <li><strong className="text-foreground">Maintenance:</strong> easiest. Hand wash, gentle pH-neutral soap, microfiber dry.</li>
            </ul>
          </section>

          <section>
            <h2 className="gold-underline text-3xl text-foreground">Satin</h2>
            <p className="mt-5">
              Satin is the middle ground — softer than gloss, sharper than
              matte. Light scatters slightly, which gives the car a more
              "premium" or moody look that photographs well in any condition.
              Satin hides minor swirls from washing better than gloss but is
              less forgiving than matte if you're sloppy with detergents or
              gas-pump spills.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-6">
              <li><strong className="text-foreground">Best for:</strong> clients who want a high-end factory-spec look (think AMG, Audi Exclusive) without going fully matte.</li>
              <li><strong className="text-foreground">Durability:</strong> 5–7 years on cast film; less staining than matte.</li>
              <li><strong className="text-foreground">Maintenance:</strong> hand wash only. No automatic car washes, no wax, no traditional polish — those will gloss the finish unevenly.</li>
            </ul>
          </section>

          <section>
            <h2 className="gold-underline text-3xl text-foreground">Matte</h2>
            <p className="mt-5">
              Matte makes the strongest visual statement. Light is absorbed
              instead of reflected, so the car looks blacked-out, technical,
              almost stealth. The trade-off is upkeep: matte films stain more
              easily from fuel, bug splatter, bird droppings and tar, and any
              cross-contamination (touching a polished surface, using the wrong
              detergent) can permanently shine the finish.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-6">
              <li><strong className="text-foreground">Best for:</strong> clients chasing a bold, modern look and willing to commit to careful upkeep.</li>
              <li><strong className="text-foreground">Durability:</strong> 5–7 years, but cosmetic staining can shorten the look-clean window.</li>
              <li><strong className="text-foreground">Maintenance:</strong> highest. Address contaminants within hours, not days. We give every matte client a full aftercare plan and matte-safe sealant option.</li>
            </ul>
          </section>

          <section>
            <h2 className="gold-underline text-3xl text-foreground">Quick comparison</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse border border-border text-sm text-foreground/90">
                <thead className="bg-muted/40 text-left text-foreground">
                  <tr>
                    <th className="border border-border p-3 font-semibold">Finish</th>
                    <th className="border border-border p-3 font-semibold">Look</th>
                    <th className="border border-border p-3 font-semibold">Maintenance</th>
                    <th className="border border-border p-3 font-semibold">Stain resistance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-semibold">Gloss</td>
                    <td className="border border-border p-3">Paint-like, deepest color</td>
                    <td className="border border-border p-3">Easiest</td>
                    <td className="border border-border p-3">Best</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-semibold">Satin</td>
                    <td className="border border-border p-3">Premium, soft sheen</td>
                    <td className="border border-border p-3">Moderate</td>
                    <td className="border border-border p-3">Good</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-semibold">Matte</td>
                    <td className="border border-border p-3">Stealth, bold</td>
                    <td className="border border-border p-3">Highest</td>
                    <td className="border border-border p-3">Most prone to staining</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="gold-underline text-3xl text-foreground">How to decide</h2>
            <p className="mt-5">
              If you commute daily, park in public lots and want minimum
              hassle, choose <strong className="text-foreground">gloss</strong>.
              If you want a premium, modern look and you're already a hand-wash
              person, <strong className="text-foreground">satin</strong> is the
              safest sweet spot. If you want the boldest possible statement and
              you're committed to a real care routine, go{" "}
              <strong className="text-foreground">matte</strong> — and pair it
              with our matte-safe ceramic coating to lock out fuel, bug acids
              and bird droppings.
            </p>
            <p>
              We bring sample swatches outside in real daylight before every
              wrap so you see how each finish actually behaves on your panels —
              not just under a showroom bulb.
            </p>
          </section>

          <div className="border-t border-border pt-10">
            <Link
              to="/car-wraps"
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] hover:text-foreground"
            >
              See our car-wraps service →
            </Link>
          </div>
        </div>
      </article>

      <CtaSection
        eyebrow="Book a wrap consult"
        title="Want to see the finishes in person?"
        body="Stop by our Springfield, NJ shop and we'll show you matte, satin and gloss samples on your car under real daylight before you commit."
      />
    </>
  );
}
