import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Layers, Wrench, Star } from "lucide-react";
import { CtaSection } from "@/components/site/CtaSection";
import heroCar from "@/assets/hero-car.jpg";
import ceramic from "@/assets/ceramic.jpg";
import ppf from "@/assets/ppf.jpg";
import wraps from "@/assets/wraps.jpg";
import detailing from "@/assets/detailing.jpg";
import showroom from "@/assets/showroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Top Elite Auto — Premium Detailing · Springfield NJ" },
      { name: "description", content: "Ceramic coating, paint protection, wraps and elite detailing in Springfield, NJ. Showroom-grade results, every vehicle." },
    ],
  }),
  component: Home,
});

const services = [
  { to: "/ceramic-coating", label: "Ceramic Coating", img: ceramic, blurb: "Years of gloss and protection — bonded at the molecular level.", Icon: Sparkles, wide: false, badge: undefined as string | undefined },
  { to: "/paint-protection", label: "Paint Protection (PPF)", img: ppf, blurb: "Self-healing film that absorbs the road so your paint doesn't.", Icon: ShieldCheck, wide: false, badge: undefined },
  { to: "/car-wraps", label: "Car Wraps", img: wraps, blurb: "Color, finish, presence. Wrap it, change it, own it.", Icon: Layers, wide: false, badge: undefined },
  { to: "/detailing", label: "In-Shop Detailing", img: detailing, blurb: "Hand wash, paint correction, interior reset. Showroom every time.", Icon: Wrench, wide: false, badge: undefined },
  { to: "/vip-showroom", label: "VIP Detail", img: showroom, blurb: "Our top-tier 4-hour multi-stage detail. The full reset, inside and out.", Icon: Sparkles, wide: true, badge: "Top Tier" },
];

const alsoWeDo = [
  "Paintless Dent Removal",
  "Powder Coating",
  "Headlight Restoration",
  "Ozone Treatment",
  "Engine Bay Detail",
  "Leather Conditioning",
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="surface-dark relative isolate min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroCar}
            alt="Black exotic sports car in luxury showroom at night"
            className="h-full w-full object-cover opacity-70"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <div className="container-luxe flex min-h-[100svh] flex-col justify-center pb-20 pt-32">
          <span className="eyebrow">Top Elite Auto · Springfield NJ</span>
          <h1 className="mt-8 max-w-5xl text-6xl md:text-8xl text-white">
            We don't do <span className="text-[var(--color-red)]">average</span>.
            <br />We don't <span className="italic font-light">cut corners</span>.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/80">
            Premium ceramic coating, paint protection, wraps and detailing —
            executed at a national level, right here in Springfield, New Jersey.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/book"
              className="group inline-flex items-center gap-3 bg-[var(--color-red)] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-primary-foreground)] transition-all hover:bg-[var(--color-red-soft)]"
            >
              Book Your Appointment
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/vip-showroom"
              className="inline-flex items-center gap-3 border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white transition-colors hover:border-[var(--color-red)] hover:text-[var(--color-red)]"
            >
              Step Inside the Showroom
            </Link>
          </div>

          <div className="mt-16 grid max-w-3xl grid-cols-1 gap-10 border-t border-white/15 pt-8 sm:grid-cols-3">
            {[
              ["5.0★", "Google Rated"],
              ["Springfield, NJ", "Est. 2018"],
              ["Mon–Sat", "9am – 6pm"],
            ].map(([k, v]) => (
              <div key={v}>
                <div className="text-2xl font-black text-[var(--color-red)]">{k}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="container-luxe grid gap-16 py-28 md:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="eyebrow">The Standard</span>
          <h2 className="mt-5 text-4xl md:text-5xl">Built for people who notice the details.</h2>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Your car isn't just transportation. It's a statement, an investment,
            and — if you're being honest — something you care about more than
            most people in your life.
          </p>
          <p>
            We get it. That's why every vehicle that rolls into our shop gets
            the same standard: <span className="text-foreground">obsessive prep, premium materials, zero shortcuts.</span>
          </p>
          <p className="text-foreground">
            We don't settle for "good enough." Neither should you.
          </p>
        </div>
      </section>

      {/* We also do */}
      <section className="border-y border-border surface-dark py-14">
        <div className="container-luxe flex flex-wrap items-center gap-x-10 gap-y-6">
          <div>
            <span className="eyebrow">We also do</span>
            <div className="mt-2 text-lg font-bold">Beyond the five.</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {alsoWeDo.map((s) => (
              <span
                key={s}
                className="border border-border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="border-t border-border py-24">
        <div className="container-luxe">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <span className="eyebrow">Services</span>
              <h2 className="mt-5 text-4xl md:text-5xl">Five ways to <span className="text-[var(--color-gold)]">elevate</span>.</h2>
            </div>
            <Link to="/book" className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] hover:text-foreground inline-flex items-center gap-2">
              Get a quote <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ to, label, img, blurb, Icon, wide, badge }) => (
              <Link
                key={to}
                to={to}
                className={`group relative overflow-hidden border border-border surface-dark ${wide ? "md:col-span-2 lg:col-span-2" : ""}`}
              >
                {badge && (
                  <span className="absolute right-4 top-4 z-10 bg-[var(--color-gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary-foreground)]">
                    {badge}
                  </span>
                )}
                <div className={`relative overflow-hidden ${wide ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
                  <img src={img} alt={label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-[var(--color-gold)]">
                    <Icon size={18} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em]">Service</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">{label}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{blurb}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-foreground transition-colors group-hover:text-[var(--color-gold)]">
                    Explore <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-luxe py-28">
        <span className="eyebrow">Reviews · Sourced from our Google Business Profile</span>
        <h2 className="mt-5 text-4xl md:text-5xl">Owners don't <span className="text-[var(--color-gold)]">whisper</span>.</h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border border-border surface-dark p-8">
              <div className="flex gap-1 text-[var(--color-star-gold)]">
                {[0,1,2,3,4].map(j => <Star key={j} size={14} fill="currentColor" />)}
              </div>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">[ Quote from Google review · pending content pass ]</p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-bold">[ Reviewer name · pending content pull · Oct 2025 forward only ]</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Google review</div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/reviews" className="mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] hover:text-foreground">
          Read all reviews <ArrowRight size={14} />
        </Link>
      </section>

      <CtaSection />
    </>
  );
}
