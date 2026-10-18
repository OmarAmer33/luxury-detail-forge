import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import detailing from "@/assets/detailing.jpg";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import { trackPhoneClick, trackLeadSubmit } from "@/lib/tracking";
import { DateChips } from "@/components/site/DateChips";
import { dateTimeIssues, timesFor } from "@/lib/booking-rules";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Now · Top Elite Auto · Springfield NJ" },
      { name: "description", content: "Book your detailing, ceramic coating, PPF or wrap appointment with Top Elite Auto in Springfield, NJ. We'll get back within one business day." },
      { property: "og:title", content: "Book Now · Top Elite Auto" },
      { property: "og:description", content: "Book a detailing or coating appointment in Springfield, NJ." },
    ],
    links: [{ rel: "canonical", href: "https://topeliteauto.com/book" }],
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
  date: z.string().max(20).default(""),
  time: z.string().max(20).default(""),
  hearAbout: z.string().optional(),
  notes: z.string().max(1000).optional(),
  _hp_url_check: z.string().optional(),
  gclid: z.string().optional().default(""),
  // Optional consent checkboxes. FormData gives "on" when checked and
  // omits the key when unchecked; converted to booleans in the payload.
  marketingConsent: z.string().optional(),
  transactionalConsent: z.string().optional(),
}).superRefine((data, ctx) => {
  // Shared with the server route — identical date/time rules on both sides.
  for (const issue of dateTimeIssues(data.date, data.time)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: [issue.path], message: issue.message });
  }
});

const services = [
  "Ceramic Coating",
  "Paint Protection Film (PPF)",
  "Vinyl Wrap",
  "Full Detail",
  "Interior Detail",
  "Exterior Detail",
  "Paint Correction",
  "VIP Detail (Top Tier)",
  "Window Tint",
  "Not sure — recommend something",
];

const conditions = ["Excellent", "Good", "Fair", "Heavy Use"];
const hearAboutOptions = [
  "Google", "Instagram", "Referral", "Drove By", "Returning Customer", "Other",
];

function Book() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // "now" exists only after hydration so server and first client render match
  // (both see an empty list). Refreshed every minute so slots age out.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Saturdays get the shorter list; Sundays none; today only slots 4+ hours out.
  const availableTimes = now && date ? timesFor(date, now) : [];

  // Clear a selection that has aged out of the notice window.
  useEffect(() => {
    if (now && time && !availableTimes.includes(time)) setTime("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, date]);

  // Dismiss a field's validation error as soon as the visitor edits it.
  function clearError(field: string) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleDateChange(next: string) {
    clearError("date");
    setDate(next);
    const nextTimes = next ? timesFor(next, new Date()) : [];
    // Clear a selection that is invalid for the newly chosen day.
    if (time && !nextTimes.includes(time)) setTime("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setErrors({});
    // Carry the stored Google Ads click id, if any, into the submission.
    const gclidInput = form.querySelector<HTMLInputElement>('input[name="gclid"]');
    if (gclidInput) {
      let stored = "";
      try {
        stored = window.sessionStorage.getItem("tea_gclid") ?? "";
      } catch {
        stored = "";
      }
      gclidInput.value = stored;
    }
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string | undefined;
        if (key && !errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      // Scroll the first invalid field into view and focus it so the user
      // sees the validation message instead of perceiving a silent failure.
      const firstKey = Object.keys(errs)[0];
      if (firstKey) {
        const el =
          firstKey === "date"
            ? form.querySelector<HTMLElement>("#date")
            : form.querySelector<HTMLElement>(`[name="${firstKey}"]`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => el.focus({ preventScroll: true }), 250);
        }
      }
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/public/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, marketingConsent: parsed.data.marketingConsent === "on", transactionalConsent: parsed.data.transactionalConsent === "on" }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) {
        setStatus("error");
        return;
      }
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-10789482788/J-mTCMjO4fccEKTi6Zgo",
        });
      }
      trackLeadSubmit();
      setStatus("success");
      form.reset();
      setDate("");
      setTime("");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/10 transition-colors";
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
              {/* Honeypot — hidden from real users, bots fill it */}
              <input
                type="text"
                name="_hp_url_check"
                tabIndex={-1}
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
              />
              {/* Google Ads click id, populated from sessionStorage on submit */}
              <input type="hidden" name="gclid" defaultValue="" />
              <div className="md:col-span-2">
                <span className="eyebrow">Booking Request</span>
                <h2 className="mt-4 text-3xl">Your appointment, locked in.</h2>
              </div>

              <div>
                <label className={labelClass} htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" maxLength={100} className={fieldClass} placeholder="John Doe" onChange={() => clearError("name")} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" maxLength={30} className={fieldClass} placeholder="(908) 555-0100" onChange={() => clearError("phone")} />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" maxLength={255} className={fieldClass} placeholder="you@email.com" onChange={() => clearError("email")} />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="vehicle">Vehicle (year / make / model)</label>
                <input id="vehicle" name="vehicle" type="text" maxLength={120} className={fieldClass} placeholder="2023 Porsche 911 GT3" onChange={() => clearError("vehicle")} />
                {errors.vehicle && <p className="mt-1 text-xs text-destructive">{errors.vehicle}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="condition">Vehicle condition</label>
                <select id="condition" name="condition" defaultValue="" className={fieldClass} onChange={() => clearError("condition")}>
                  <option value="" disabled>Select condition</option>
                  {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.condition && <p className="mt-1 text-xs text-destructive">{errors.condition}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="service">Service of interest</label>
                <select id="service" name="service" defaultValue="" className={fieldClass} onChange={() => clearError("service")}>
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
              </div>
              <div className="md:col-span-2">
                <span className={labelClass} id="date-label">Preferred date</span>
                <input type="hidden" name="date" value={date} />
                <DateChips value={date} onChange={handleDateChange} invalid={!!errors.date} />
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">Closed Sundays · showing the next 3 weeks</p>
                {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="time">Preferred time</label>
                <select id="time" name="time" className={fieldClass} value={time} onChange={(e) => { setTime(e.target.value); clearError("time"); }}>
                  <option value="" disabled>Select a time</option>
                  {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
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
                <textarea id="notes" name="notes" maxLength={1000} rows={4} className={fieldClass} placeholder="Tell us about the condition of the car, any concerns, or what you're hoping for." onChange={() => clearError("notes")} />
              </div>
              <div className="md:col-span-2">
                <label className="flex cursor-pointer select-none items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                  <input
                    type="checkbox"
                    name="transactionalConsent"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[var(--color-gold)]"
                  />
                  <span className="flex flex-col gap-1">
                    <span>Text me about my booking — confirmations, scheduling and updates.</span>
                    <span className="text-[10px] leading-relaxed text-muted-foreground/80">Texts from Top Elite Auto (MAGNUM DETAILS LLC). Message frequency may vary. Message & data rates may apply. Reply STOP to unsubscribe or HELP for help.</span>
                  </span>
                </label>
                <label className="flex cursor-pointer select-none items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[var(--color-gold)]"
                  />
                  <span className="flex flex-col gap-1">
                    <span>Text me occasional service reminders and offers.</span>
                    <span className="text-[10px] leading-relaxed text-muted-foreground/80">Texts from Top Elite Auto (MAGNUM DETAILS LLC). Message frequency may vary. Message & data rates may apply. Reply STOP to unsubscribe or HELP for help.</span>
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-3 bg-[var(--color-gold)] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-primary-foreground)] transition-all hover:bg-[var(--color-gold-soft)] disabled:opacity-60 md:w-auto"
                >
                  {status === "submitting" ? "Sending…" : "Send Request"}
                </button>
                <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground">
                  Both boxes are optional and you can book without either one. Top Elite Auto is a trade name of MAGNUM DETAILS LLC. See our <Link to="/privacy" className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground">Privacy Policy</Link> and <Link to="/terms" className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground">Terms</Link>.
                </p>
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
                <a href="tel:9082933934" onClick={trackPhoneClick} className="text-foreground hover:text-[var(--color-gold)]">908.293.3934</a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail size={18} className="mt-0.5 text-[var(--color-gold)]" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email</div>
                <a href="mailto:topeliteauto01@gmail.com" className="text-foreground hover:text-[var(--color-gold)]">topeliteauto01@gmail.com</a>
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
                <div className="text-foreground">Mon–Fri · 9:30am – 4:30pm<br/>Sat · 9:30am – 1pm</div>
              </div>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}
