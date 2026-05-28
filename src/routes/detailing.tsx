import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import img from "@/assets/detailing.jpg";

export const Route = createFileRoute("/detailing")({
  head: () => ({
    meta: [
      { title: "In-Shop Detailing · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Hand wash, paint correction, interior reset and full detailing in Springfield, NJ. Showroom-grade results, every time." },
      { property: "og:title", content: "In-Shop Detailing · Top Elite Auto" },
      { property: "og:description", content: "Premium hand detailing and paint correction in Springfield, NJ." },
      { property: "og:image", content: img },
    ],
  }),
  component: Detailing,
});

function Detailing() {
  return (
    <ServicePage
      eyebrow="In-Shop Detailing"
      title="Reset the car. Restart the relationship."
      subtitle="From a refresh wash to a full multi-day correction and interior overhaul. We bring the car back to a state you forgot it could be in."
      image={img}
      intro="Detailing is more than soap and a buffer. It's a process: lift contamination, correct defects, protect what's been restored. We work by hand, panel by panel, in a controlled environment — never a rushed assembly line."
      features={[
        { title: "Paint Correction", body: "Single, two- and three-stage polishing to remove swirls, scratches and oxidation." },
        { title: "Interior Reset", body: "Steam, hot-water extraction and odor neutralization — interior comes back like new." },
        { title: "Engine & Wheel Detail", body: "Wheel faces, barrels, calipers and engine bay restored and protected." },
      ]}
      includes={[
        "Foam pre-wash and two-bucket hand wash",
        "Wheel, tire and arch deep clean",
        "Iron and tar decontamination",
        "Clay bar treatment",
        
        "Interior vacuum, steam and extraction",
        "Leather cleaning",
        "Sealant or wax topcoat",
      ]}
      process={[
        { step: "01", title: "Assess", body: "Inspect inside and out, then recommend the right package — no upsells." },
        { step: "02", title: "Decontaminate", body: "Strip the paint of bonded contamination before any polishing." },
        { step: "03", title: "Correct", body: "Machine polish defects out of the clear coat under proper lighting." },
        { step: "04", title: "Protect", body: "Finish with sealant, wax, or upgrade to a ceramic coating." },
      ]}
      pricing={{
        tiers: [
          { name: "Elite Wash", price: "$99 / $115 / $140", note: "Car / SUV-Pickup / 3-Row-XL" },
          { name: "Maintenance Detail", price: "$180 / $210 / $240", note: "Car / SUV-Pickup / 3-Row-XL" },
          { name: "Interior Detail", price: "$205 / $230 / $255", note: "Car / SUV-Pickup / 3-Row-XL" },
          { name: "Exterior Detail", price: "$205 / $230 / $255", note: "Car / SUV-Pickup / 3-Row-XL" },
          { name: "Full Detail", price: "$330 / $380 / $430", note: "Car / SUV-Pickup / 3-Row-XL" },
        ],
        footnote: "Starting prices. For our top-tier 4-hour multi-stage detail, see VIP Detail.",
      }}
    />
  );
}
