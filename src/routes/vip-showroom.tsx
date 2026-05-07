import { createFileRoute } from "@tanstack/react-router";
import { CtaSection } from "@/components/site/CtaSection";
import { PageHero } from "@/components/site/PageHero";
import showroom from "@/assets/showroom.jpg";
import { Check } from "lucide-react";

export const Route = createFileRoute("/vip-showroom")({
  head: () => ({
    meta: [
      { title: "VIP Showroom · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "A private, climate-controlled showroom for collectors. Storage, display and concierge detailing — by appointment only." },
      { property: "og:title", content: "VIP Showroom · Top Elite Auto" },
      { property: "og:description", content: "Private climate-controlled showroom for collectors in Springfield, NJ." },
      { property: "og:image", content: showroom },
    ],
  }),
  component: VIP,
});

function VIP() {
  const perks = [
    "24/7 monitored security and access control",
    "Climate and humidity controlled environment",
    "Battery tenders and tire pressure maintenance",
    "Concierge wash and detail before every pickup",
    "Private appointments and showings",
    "Transport coordination and white-glove delivery",
  ];
  return (
    <>
      <PageHero
        eyebrow="VIP Showroom"
        title="A private space for the cars you actually love."
        subtitle="Storage isn't the right word. Stewardship is. Our climate-controlled showroom is built for collectors who care how their vehicles are kept between drives."
        image={showroom}
      />

      <section className="container-luxe grid gap-16 py-24 md:grid-cols-2">
        <div>
          <span className="eyebrow">Membership</span>
          <h2 className="mt-5 text-4xl md:text-5xl">By appointment. By referral.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            The VIP Showroom is intentionally small. We curate every member to
            keep service personal and the floor uncrowded.
          </p>
          <p className="mt-4 text-muted-foreground">
            Pricing is custom and depends on vehicle count, storage duration
            and service frequency. Reach out to start a conversation.
          </p>
        </div>
        <ul className="space-y-4">
          {perks.map((p) => (
            <li key={p} className="flex items-start gap-4 border-b border-border pb-4">
              <Check className="mt-1 shrink-0 text-[var(--color-gold)]" size={18} />
              <span className="text-base text-foreground/90">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <CtaSection
        eyebrow="Inquire"
        title="Talk to us about the showroom."
        body="Spaces are limited. We'll walk you through the floor and what membership looks like for your collection."
      />
    </>
  );
}
