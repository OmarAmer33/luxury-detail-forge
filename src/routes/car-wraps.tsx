import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import img from "@/assets/wraps.jpg";

export const Route = createFileRoute("/car-wraps")({
  head: () => ({
    meta: [
      { title: "Car Wraps · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Color change wraps, satin and matte finishes, accents and commercial wraps. Premium 3M and Avery films installed in Springfield, NJ." },
      { property: "og:title", content: "Car Wraps · Top Elite Auto" },
      { property: "og:description", content: "Color change, satin, matte and commercial vinyl wraps in Springfield, NJ." },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Vinyl Wraps"
      title="A new car, without the new car."
      subtitle="Full color change, partial accents and commercial wraps in premium cast vinyl. Reversible, protective, and built to look factory."
      image={img}
      intro="A wrap is a serious commitment to design — it should look intentional, not improvised. We use only premium cast films from 3M and Avery, plan every panel before we cut, and finish every edge so the wrap looks like it came from the factory. No lifting, no tucking corners, no excuses."
      features={[
        { title: "Premium Films Only", body: "3M 2080, Avery Dennison and KPMF — long-lasting and removable without paint damage." },
        { title: "Color Change", body: "Hundreds of finishes: gloss, satin, matte, metallic, chrome and color-shift." },
        { title: "Underlying Protection", body: "Wraps shield original paint, preserving resale value when removed." },
      ]}
      includes={[
        "Full vehicle color change wraps",
        "Partial wraps and accent pieces (roof, hood, mirrors)",
        "Chrome delete and trim blackout",
        "Commercial fleet and branding wraps",
        "Pre-wrap paint correction available",
        "Wrap removal and surface restoration",
        "Care kit and finish-specific wash instructions",
      ]}
      process={[
        { step: "01", title: "Design", body: "Pick films in person, see them under shop and outdoor lighting." },
        { step: "02", title: "Prep", body: "Decontaminate and polish so the wrap adheres flawlessly." },
        { step: "03", title: "Wrap", body: "Hand-installed in a controlled, dust-free environment." },
        { step: "04", title: "Finish", body: "Edges sealed, knifeless cuts inspected, post-heat applied." },
      ]}
      pricing={{
        tiers: [
          { name: "Vinyl Wrap", price: "Quote-based", note: "Varies by coverage area, vehicle and material" },
        ],
        footnote: "Book a consult — we'll walk through finishes and quote on the spot.",
      }}
    />
  ),
});
