import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import detailing from "@/assets/detailing.jpg";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Now · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Book your detailing, ceramic coating, PPF or wrap appointment with Top Elite Auto in Springfield, NJ. We'll get back within one business day." },
      { property: "og:title", content: "Book Now · Top Elite Auto" },
      { property: "og:description", content: "Book a detailing or coating appointment in Springfield, NJ." },
    ],
  }),
  component: Book,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  email: z.string().trim().email("Valid email required").max(255),
  vehicle: z.string().trim().min(2, "Vehicle info required").max(120),
  condition: z.string().min(1, "Pick a condition"),
  service: z.string().min(1, "Pick a service"),
  date: z
    .string()
    .min(1, "Pick a date")
    .refine((v) => {
      const d = new Date(v + "T12:00:00");
      return !isNaN(d.getTime()) && d.getDay() !== 0;
    }, "We're closed Sundays — please pick another day."),
  time: z.string().min(1, "Pick a time"),
  hearAbout: z.string().optional(),
  notes: z.string().max(1000).optional(),
  website: z.string().max(0).optional(),
});

const services = [
  "Ceramic Coating",
  "Paint Protection Film (PPF)",
  "Vinyl Wrap",
  "Full Detail",
  "Paint Correction",
  "VIP Detail (Top Tier)",
  "Window Tint",
  "Not sure — recommend something",
];

const conditions = ["Excellent", "Good", "Fair", "Heavy Use"];
const times = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];
const hearAboutOptions = [
  "Google", "Instagram", "Referral", "Drove By", "Returning Customer", "Other",
];

function Book() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path[0] as string] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/public/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) {
        setStatus("error");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--color-gold)] focus:outline-none transition-colors";
  const labelClass = "block text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/80 mb-2";

  return (
    <>
      <PageHero
        eyebrow="Book Now"
        title="Tell us about your car."
        subtitle="Fill out the form and we'll be in touch within one business day. Need to talk now? Call or text us at 908.293.3934."
        image={detailing}
      />

      <section className="container-luxe grid gap-16 py-24 lg:grid-cols-[1.6fr_1fr]">
        <div className="border border-border surface-dark p-8 md:p-12">
          {status === "success" ? (
            <div className="flex flex-col items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-[var(--color-gold)] text-[var(--color-primary-foreground)]">
                <Check />
              </div>
              <h2 className="text-3xl">Request received.</h2>
              <p className="text-muted-foreground max-w-md">
                Thanks. We'll reach out within one business day to confirm
                details and book your time.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] hover:text-foreground"
              >
                Submit another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <span className="eyebrow">Booking Request</span>
                <h2 className="mt-4 text-3xl">Your appointment, locked in.</h2>
              </div>

              <div>
                <label className={labelClass} htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" maxLength={100} className={fieldClass} placeholder="John Doe" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" maxLength={30} className={fieldClass} placeholder="(908) 555-0100" />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" maxLength={255} className={fieldClass} placeholder="you@email.com" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="vehicle">Vehicle (year / make / model)</label>
                <input id="vehicle" name="vehicle" type="text" maxLength={120} className={fieldClass} placeholder="2023 Porsche 911 GT3" />
                {errors.vehicle && <p className="mt-1 text-xs text-destructive">{errors.vehicle}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="condition">Vehicle condition</label>
                <select id="condition" name="condition" defaultValue="" className={fieldClass}>
                  <option value="" disabled>Select condition</option>
                  {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.condition && <p className="mt-1 text-xs text-destructive">{errors.condition}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="service">Service of interest</label>
                <select id="service" name="service" defaultValue="" className={fieldClass}>
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="date">Preferred date</label>
                <input id="date" name="date" type="date" min={new Date().toISOString().slice(0,10)} className={fieldClass} />
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">Closed Sundays.</p>
                {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="time">Preferred time</label>
                <select id="time" name="time" defaultValue="" className={fieldClass}>
                  <option value="" disabled>Select a time</option>
                  {times.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time && <p className="mt-1 text-xs text-destructive">{errors.time}</p>}
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="hearAbout">How did you hear about us?</label>
                <select id="hearAbout" name="hearAbout" defaultValue="" className={fieldClass}>
                  <option value="">Optional</option>
                  {hearAboutOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" maxLength={1000} rows={4} className={fieldClass} placeholder="Tell us about the condition of the car, any concerns, or what you're hoping for." />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-3 bg-[var(--color-gold)] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-primary-foreground)] transition-all hover:bg-[var(--color-gold-soft)] disabled:opacity-60 md:w-auto"
                >
                  {status === "submitting" ? "Sending…" : "Send Request"}
                </button>
                {status === "error" && (
                  <p className="mt-3 text-sm text-destructive">Something went wrong. Please call us at 908.293.3934.</p>
                )}
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-8">
          <div>
            <span className="eyebrow">Or reach us directly</span>
            <h3 className="mt-4 text-2xl gold-underline">Top Elite Auto</h3>
          </div>
          <ul className="space-y-5 text-sm">
            <li className="flex gap-4">
              <Phone size={18} className="mt-0.5 text-[var(--color-gold)]" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Phone</div>
                <a href="tel:9082933934" className="text-foreground hover:text-[var(--color-gold)]">908.293.3934</a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail size={18} className="mt-0.5 text-[var(--color-gold)]" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email</div>
                <a href="mailto:info@topeliteauto.com" className="text-foreground hover:text-[var(--color-gold)]">info@topeliteauto.com</a>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">(TBD — pending confirmation)</div>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin size={18} className="mt-0.5 text-[var(--color-gold)]" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Address</div>
                <div className="text-foreground">3 Dundar Rd<br/>Springfield, NJ 07081</div>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock size={18} className="mt-0.5 text-[var(--color-gold)]" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Hours</div>
                <div className="text-foreground">Mon – Sat · 9am – 6pm</div>
              </div>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}
