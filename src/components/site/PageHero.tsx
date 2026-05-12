export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32 bg-[var(--color-section-dark)]">
      <div className="absolute inset-0 -z-10">
        <img
          src={image}
          alt=""
          loading="eager"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      </div>
      <div className="container-luxe">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-6 max-w-4xl text-5xl md:text-7xl text-white">{title}</h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
