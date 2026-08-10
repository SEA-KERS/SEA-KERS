const record = [
  { value: "20+", label: "Hackathon wins" },
  { value: "₹18L+", label: "Grants & prizes" },
  { value: "14", label: "Build systems" },
  { value: "100%", label: "Open source" },
] as const;

export default function StatsBand() {
  return (
    <section
      aria-label="Team record"
      className="bg-(--band) px-4 py-16 text-(--band-foreground) md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="kicker text-(--band-accent)">The record so far</p>
            <h2 className="mt-4 font-headline text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-5xl">
              Numbers that
              <br />
              argue for us.
            </h2>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:col-span-7">
            {record.map((item) => (
              <div
                key={item.label}
                className="flex flex-col-reverse gap-2 border-t border-(--band-border) pt-6"
              >
                <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-(--band-muted)">
                  {item.label}
                </dt>
                <dd className="font-headline text-5xl font-bold tracking-[-0.02em] md:text-6xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
