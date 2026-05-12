import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { CtaSection } from "./CtaSection";
import { PageHero } from "./PageHero";

export interface PricingTier {
  name: string;
  price: string;
  note?: string;
}

export interface ServicePageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  intro: string;
  features: { title: string; body: string }[];
  includes: string[];
  process: { step: string; title: string; body: string }[];
  pricing?: { tiers: PricingTier[]; footnote?: string };
}

export function ServicePage(props: ServicePageProps) {
  return (
    <>
      <PageHero
        eyebrow={props.eyebrow}
        title={props.title}
        subtitle={props.subtitle}
        image={props.image}
      />

      <section className="container-luxe grid gap-16 py-24 md:grid-cols-[1fr_1.4fr] md:gap-24">
        <div>
          <h2 className="text-3xl gold-underline md:text-4xl">The standard.</h2>
        </div>
        <p className="text-lg leading-relaxed text-muted-foreground">{props.intro}</p>
      </section>

      <section className="border-y border-border bg-[var(--color-onyx)] py-24">
        <div className="container-luxe">
          <span className="eyebrow">Why it matters</span>
          <h2 className="mt-5 text-4xl md:text-5xl">Engineered to last.</h2>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
            {props.features.map((f) => (
              <div key={f.title} className="bg-[var(--color-onyx)] p-8">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
                  {f.title}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe grid gap-16 py-24 md:grid-cols-2">
        <div>
          <span className="eyebrow">What's included</span>
          <h2 className="mt-5 text-4xl">Every package, every car.</h2>
          <p className="mt-5 text-muted-foreground">
            No upsell theater. No surprise add-ons. You get the full job, done right.
          </p>
        </div>
        <ul className="space-y-4">
          {props.includes.map((item) => (
            <li key={item} className="flex items-start gap-4 border-b border-border pb-4">
              <Check className="mt-1 shrink-0 text-[var(--color-gold)]" size={18} />
              <span className="text-base text-foreground/90">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-[var(--color-onyx)] py-24">
        <div className="container-luxe">
          <span className="eyebrow">Process</span>
          <h2 className="mt-5 text-4xl md:text-5xl">How we work.</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {props.process.map((p) => (
              <div key={p.step}>
                <div className="text-5xl font-black text-[var(--color-gold)]">{p.step}</div>
                <h3 className="mt-4 text-lg font-bold uppercase tracking-wider">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
          <Link
            to="/book"
            className="mt-14 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] hover:text-foreground"
          >
            Get a quote <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
