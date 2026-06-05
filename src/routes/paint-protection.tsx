import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { JsonLd } from "@/components/site/JsonLd";
import img from "@/assets/ppf.jpg";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Paint Protection Film",
  "provider": { "@id": "https://topeliteauto.com/#business" },
  "areaServed": { "@type": "City", "name": "Springfield, NJ" },
};

export const Route = createFileRoute("/paint-protection")({
  head: () => ({
    meta: [
      { title: "Paint Protection Film (PPF) · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Self-healing paint protection film for full vehicles, partial fronts, and high-impact zones. Installed in a clean room in Springfield, NJ." },
      { property: "og:title", content: "Paint Protection Film · Top Elite Auto" },
      { property: "og:description", content: "Self-healing PPF for daily drivers and exotics, installed in Springfield, NJ." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "https://topeliteauto.com/paint-protection" }],
  }),
  component: () => (
    <>
      <JsonLd data={serviceSchema} />
      <ServicePage
        eyebrow="Paint Protection Film"
        title="An invisible shield against the road."
        subtitle="PPF takes the rock chips, road rash and abrasions so your paint never has to. Self-healing, optically clear, and hand-cut for a flawless fit."
        image={img}
        intro="Your car is going to meet pebbles, salt, brake dust and bumper-to-bumper traffic. The only question is whether your paint takes the hit or a film does. We install premium PPF hand-cut as standard — flawless fit, no templates, no computer-cut patterns. Coverage you can see only when you're looking for it."
        features={[
          { title: "Self-Healing Top Layer", body: "Light scratches and swirl marks disappear with heat from the sun or a warm wash." },
          { title: "Optically Clear", body: "Premium films with zero orange peel and a finish that disappears into the paint." },
          { title: "10-Year Warranty", body: "Manufacturer-backed protection against yellowing, cracking and delamination." },
        ]}
        includes={[
          "Partial front, full front, or full vehicle coverage",
          "Wrapped edges where possible — no exposed lines",
          "Door cup, sill and rocker panel options",
          "Hand-cut as standard — flawless fit, no templates, no computer-cut patterns",
          "Custom hand-cuts for exotics and modified vehicles",
          "Post-install inspection and cure period",
        ]}
        process={[
          { step: "01", title: "Plan", body: "Walk you through coverage options and show real installs in person." },
          { step: "02", title: "Prep", body: "Decontaminate and polish before any film touches the paint." },
          { step: "03", title: "Install", body: "Hand-installed in a controlled, dust-free environment." },
          { step: "04", title: "Inspect", body: "Final inspection, cure period and care instructions." },
        ]}
        pricing={{
          tiers: [
            { name: "Paint Protection Film", price: "Quote-based", note: "Varies by coverage area, vehicle and material" },
          ],
          footnote: "Book a consult — we'll walk through coverage options and quote on the spot.",
        }}
      />
    </>
  ),
});
