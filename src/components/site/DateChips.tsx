import { forwardRef, useEffect, useState } from "react";
import { openDays, weekdayOf } from "@/lib/booking-rules";
import { cn } from "@/lib/utils";

const WD = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MO = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Props = { value: string; onChange: (v: string) => void; invalid?: boolean };

/** In-page date picker — no native picker, works in every in-app browser. */
export const DateChips = forwardRef<HTMLDivElement, Props>(function DateChips(
  { value, onChange, invalid },
  ref,
) {
  // Generated after hydration so "today" comes from the visitor's clock in shop tz,
  // never from the server render.
  const [days, setDays] = useState<string[] | null>(null);
  useEffect(() => setDays(openDays(21)), []);

  return (
    <div
      ref={ref}
      id="date"
      role="group"
      aria-label="Preferred date"
      aria-invalid={invalid || undefined}
      tabIndex={-1}
      className="grid grid-cols-3 gap-2 outline-none md:grid-cols-6"
    >
      {days === null
        ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-14 border border-border opacity-40" />
          ))
        : days.map((d) => {
            const [, m, dd] = d.split("-").map(Number);
            const selected = d === value;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange(d)}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center border px-2 py-2",
                  !selected && "border-border bg-transparent text-foreground hover:border-foreground/40",
                )}
                // Inline style so the selected state can't be dropped by the CSS build.
                style={
                  selected
                    ? {
                        backgroundColor: "var(--color-gold)",
                        borderColor: "var(--color-gold)",
                        color: "var(--color-primary-foreground)",
                      }
                    : undefined
                }
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                  {WD[weekdayOf(d)]}
                </span>
                <span className="text-sm">
                  {MO[m - 1]} {dd}
                </span>
              </button>
            );
          })}
    </div>
  );
});
