import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

export function CtaSection({
  eyebrow = "Book your appointment",
  title = "Ready to give your car the treatment it deserves?",
  body = "Tell us about your vehicle. We'll build a plan that protects it for years, not weeks.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden border-y border-border bg-[var(--color-onyx)] py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, var(--color-gold) 0%, transparent 70%)" }}
      />
      <div className="container-luxe relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-5 text-4xl md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl text-base text-muted-foreground">{body}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <Link
            to="/book"
            className="group inline-flex items-center justify-center gap-3 bg-[var(--color-gold)] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-primary-foreground)] transition-all hover:bg-[var(--color-gold-soft)]"
          >
            Book Now
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:9082933934"
            className="inline-flex items-center justify-center gap-3 border border-border px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-foreground transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            <Phone size={14} /> 908.293.3934
          </a>
        </div>
      </div>
    </section>
  );
}
