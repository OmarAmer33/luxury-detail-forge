import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import img from "@/assets/detailing.jpg";

export const Route = createFileRoute("/detailing")({
  head: () => ({
    meta: [
      { title: "In-Shop Detailing · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Hand wash, paint correction, interior reset and full detailing services in Springfield, NJ. Showroom-grade results, every time." },
      { property: "og:title", content: "In-Shop Detailing · Top Elite Auto" },
      { property: "og:description", content: "Premium hand detailing and paint correction in Springfield, NJ." },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="In-Shop Detailing"
      title="Reset the car. Restart the relationship."
      subtitle="From a refresh wash to a full multi-day correction and interior overhaul. We bring the car back to a state you forgot it could be in."
      image={img}
      intro="Detailing is more than soap and a buffer. It's a process: lift contamination, correct defects, protect what's been restored. We work by hand, panel by panel, in a controlled environment — never an outdoor wash bay, never a rushed assembly line."
      features={[
        { title: "Paint Correction", body: "Single, two- and three-stage polishing to remove swirls, scratches and oxidation." },
        { title: "Interior Reset", body: "Steam, extraction, leather conditioning and odor neutralization — like new." },
        { title: "Engine & Wheel Detail", body: "Wheel faces, barrels, calipers and engine bay restored and protected." },
      ]}
      includes={[
        "Foam pre-wash and two-bucket hand wash",
        "Wheel, tire and arch deep clean",
        "Iron and tar decontamination",
        "Clay bar treatment",
        "Paint correction (1, 2, or 3-stage)",
        "Interior vacuum, steam and extraction",
        "Leather clean and condition",
        "Sealant or wax topcoat",
      ]}
      process={[
        { step: "01", title: "Assess", body: "Inspect inside and out, then recommend the right package — no upsells." },
        { step: "02", title: "Decontaminate", body: "Strip the paint of bonded contamination before any polishing." },
        { step: "03", title: "Correct", body: "Machine polish defects out of the clear coat under proper lighting." },
        { step: "04", title: "Protect", body: "Finish with sealant, wax, or upgrade to a ceramic coating." },
      ]}
    />
  ),
});
