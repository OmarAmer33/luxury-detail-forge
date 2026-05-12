import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import img from "@/assets/detailing.jpg";

export const Route = createFileRoute("/detailing")({
  head: () => ({
    meta: [
      { title: "In-Shop Detailing · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Hand wash, paint correction, interior reset, full detailing and window tint in Springfield, NJ. Showroom-grade results, every time." },
      { property: "og:title", content: "In-Shop Detailing · Top Elite Auto" },
      { property: "og:description", content: "Premium hand detailing, paint correction and window tint in Springfield, NJ." },
      { property: "og:image", content: img },
    ],
  }),
  component: Detailing,
});

const tintRows: { name: string; price: string }[] = [
  { name: "Front Windshield Only", price: "$150" },
  { name: "Standard Sedan / Coupe", price: "$290" },
  { name: "Standard SUV", price: "$415" },
  { name: "Ceramic Coupe", price: "$560 (windshield $660)" },
  { name: "Ceramic Sedan", price: "$575 (windshield $760)" },
  { name: "Ceramic SUV (with windshield)", price: "$815" },
  { name: "Box Truck — 5% Ceramic", price: "$400" },
];

function Detailing() {
  return (
    <>
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
        pricing={{
          tiers: [
            { name: "Elite Wash", price: "$115 / $115 / $140", note: "Car / SUV-Pickup / 3-Row-XL" },
            { name: "Maintenance Detail", price: "$180 / $210 / $240", note: "Car / SUV-Pickup / 3-Row-XL" },
            { name: "Interior Detail", price: "$205 / $230 / $255", note: "Car / SUV-Pickup / 3-Row-XL" },
            { name: "Exterior Detail", price: "$205 / $230 / $255", note: "Car / SUV-Pickup / 3-Row-XL" },
            { name: "Full Detail", price: "$330 / $380 / $430", note: "Car / SUV-Pickup / 3-Row-XL" },
          ],
          footnote: "Starting prices. For our top-tier 4-hour multi-stage detail, see VIP Detail.",
        }}
      />

      <section className="border-t border-border surface-dark py-24">
        <div className="container-luxe">
          <span className="eyebrow">Window Tint</span>
          <h2 className="mt-5 text-4xl md:text-5xl">Tint, done right.</h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Standard or ceramic films, cut precisely and installed without
            bubbles, lifting or peeling edges. Pricing below is starting —
            varies by vehicle and film tier.
          </p>
          <div className="mt-12 grid gap-px border border-border bg-border">
            {tintRows.map((t) => (
              <div key={t.name} className="grid grid-cols-[1fr_auto] items-baseline gap-6 surface-dark p-6 md:p-8">
                <div className="text-lg font-bold">{t.name}</div>
                <div className="text-lg font-black text-[var(--color-gold)] md:text-xl whitespace-nowrap">{t.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
