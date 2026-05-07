import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import img from "@/assets/ppf.jpg";

export const Route = createFileRoute("/paint-protection")({
  head: () => ({
    meta: [
      { title: "Paint Protection Film (PPF) · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Self-healing paint protection film for full vehicles, partial fronts, and high-impact zones. Installed in a clean room in Springfield, NJ." },
      { property: "og:title", content: "Paint Protection Film · Top Elite Auto" },
      { property: "og:description", content: "Self-healing PPF for daily drivers and exotics, installed in Springfield, NJ." },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Paint Protection Film"
      title="An invisible shield against the road."
      subtitle="PPF takes the rock chips, road rash and abrasions so your paint never has to. Self-healing, optically clear, and installed with surgical precision."
      image={img}
      intro="Your car is going to meet pebbles, salt, brake dust and bumper-to-bumper traffic. The only question is whether your paint takes the hit or a film does. We install premium PPF with seamless edges and minimal seams — coverage you can see only when you're looking for it."
      features={[
        { title: "Self-Healing Top Layer", body: "Light scratches and swirl marks disappear with heat from the sun or a warm wash." },
        { title: "Optically Clear", body: "Premium films with zero orange peel and a finish that disappears into the paint." },
        { title: "10-Year Warranty", body: "Manufacturer-backed protection against yellowing, cracking and delamination." },
      ]}
      includes={[
        "Partial front, full front, or full vehicle coverage",
        "Wrapped edges where possible — no exposed lines",
        "Headlight and fog light protection",
        "Door cup, sill and rocker panel options",
        "Computer-cut patterns from latest vehicle templates",
        "Custom hand-cuts for exotics and modified vehicles",
        "Post-install inspection and cure period",
      ]}
      process={[
        { step: "01", title: "Plan", body: "Walk you through coverage options and show real installs in person." },
        { step: "02", title: "Prep", body: "Decontaminate and polish before any film touches the paint." },
        { step: "03", title: "Install", body: "Hand-installed in a controlled, dust-free environment." },
        { step: "04", title: "Inspect", body: "Final inspection, cure period and care instructions." },
      ]}
    />
  ),
});
