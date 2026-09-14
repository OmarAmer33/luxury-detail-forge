# v9 — Ceramic Coating pricing repositioning + PriceBlock cleanup

## Goal
Move the `/ceramic-coating` pricing block from the bottom of the page (ServicePage's built-in `pricing` prop) to the same position used on `/window-tint` in v8.1 — between the "Engineered to last" features section and the "What's included" section — using the new `afterFeatures` slot. Also confirm the dead `PriceBlock` component is gone.

## Files touched
- `src/routes/ceramic-coating.tsx` — only file changed.
- `src/components/site/PriceBlock.tsx` (or similar) — verified already absent; no deletion needed.

## Changes

### 1. `src/routes/ceramic-coating.tsx`

Add a top-level array near `faqs` / `serviceSchema`:

```ts
const ceramicTiers = [
  { name: "2-Year Ceramic", price: "$950", note: "Starting" },
  { name: "5-Year Ceramic", price: "$1,200", note: "Starting" },
  { name: "Motorcycle Ceramic", price: "$350", note: "Starting" },
];
```

Remove the entire `pricing={{ ... }}` prop from the `<ServicePage ... />` call.

Add an `afterFeatures` prop to that same `<ServicePage ... />` call, containing:

```tsx
afterFeatures={
  <section className="border-t border-border surface-dark py-16 md:py-24">
    <div className="container-luxe">
      <div className="mb-10 max-w-2xl">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
          Pricing
        </div>
        <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
          Pick your coating.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Three tiers based on longevity. All coatings include full paint correction, decontamination, and professional application.
        </p>
      </div>
      <div className="border border-border">
        {ceramicTiers.map((tier, i) => (
          <div
            key={tier.name}
            className={`grid grid-cols-[1fr_auto] items-baseline gap-6 p-6 md:p-8 ${i > 0 ? "border-t border-border" : ""} ${i % 2 === 1 ? "bg-[var(--color-onyx-elevated,_#141414)]" : ""}`}
          >
            <div>
              <div className="text-lg font-bold text-foreground">{tier.name}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{tier.note}</div>
            </div>
            <div className="text-2xl font-black text-[var(--color-gold)] md:text-3xl whitespace-nowrap">
              {tier.price}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Final pricing depends on paint condition and correction needed.
      </p>
    </div>
  </section>
}
```

Everything else on the page stays the same: `faqs`, `serviceSchema`, route `head`, `ServiceSeo`, `JsonLd`, and all other `ServicePage` props (`eyebrow`, `title`, `subtitle`, `image`, `intro`, `features`, `includes`, `process`).

### 2. PriceBlock cleanup

A project-wide grep shows `PriceBlock` is not referenced anywhere and no `PriceBlock.tsx` file exists. No deletion is required; this step is verification-only.

## Resulting `/ceramic-coating` section order
1. Hero
2. Intro / "The standard."
3. Features / "Engineered to last."
4. Pricing / "Pick your coating." (new position via `afterFeatures`)
5. Includes / "Every package, every car."
6. Process / "How we work."
7. Final CtaSection (from ServicePage)

## Verification
- `bun run build` passes.
- `/ceramic-coating` shows the pricing section between Features and Includes with heading "Pick your coating."
- All three ceramic tiers display correctly: 2-Year Ceramic $950, 5-Year Ceramic $1,200, Motorcycle Ceramic $350.
- The disclaimer "Final pricing depends on paint condition and correction needed." renders below the pricing block.
- `/window-tint` (regression witness) renders identically to before.
- No import errors or unused-import warnings on `ceramic-coating.tsx`.
- No PriceBlock references remain in the project.
