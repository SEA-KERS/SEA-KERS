const chapters = [
  {
    title: "The beginning",
    copy: "We started as college students with more ambition than resources: no dedicated lab, funding, or institutional advantage. We had a shared belief that disciplined engineering could compete with the best.",
  },
  {
    title: "The trials",
    copy: "For two years we lost early and often. We kept building, studied every result, and travelled across India on limited budgets. Each setback became evidence, and each iteration made the team stronger.",
  },
  {
    title: "The mindset",
    copy: "SEA-KERS is a multidisciplinary crew defined less by a stack than by curiosity, resilience, and respect for craft. The caret is our reminder to keep learning and power upward together.",
  },
] as const;

export default function MissionSection() {
  return (
    <section
      id="about-section"
      aria-labelledby="mission-title"
      className="bg-(--band) px-4 py-24 text-(--band-foreground) md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="kicker text-(--band-accent)">Our story</p>
        <h2
          id="mission-title"
          className="mt-4 font-headline text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl"
        >
          Seek farther. Build better.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-(--band-muted)">
          SEA-KERS grows through repeated experiments, shared constraints, and a
          commitment to turn every hard problem into a working system.
        </p>

        <div className="mt-14">
          {chapters.map((chapter, index) => (
            <Chapter
              key={chapter.title}
              index={index}
              title={chapter.title}
              copy={chapter.copy}
            />
          ))}
        </div>

        <div className="mt-16 border-t border-(--band-border) pt-12">
          <p className="kicker text-(--band-accent)">Our mission</p>
          <p className="mt-4 max-w-4xl font-headline text-3xl font-bold leading-tight md:text-5xl">
            Young minds innovating from{" "}
            <span className="text-(--band-accent)">India</span> to the world.
          </p>
        </div>
      </div>
    </section>
  );
}

interface ChapterProps {
  index: number;
  title: string;
  copy: string;
}

function Chapter({ index, title, copy }: ChapterProps) {
  return (
    <article className="grid gap-5 border-t border-(--band-border) py-12 md:grid-cols-12 md:items-start md:gap-8">
      <p className="font-headline text-2xl font-bold text-(--band-muted) md:col-span-1 md:text-3xl">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="font-headline text-2xl font-bold md:col-span-4 md:text-3xl">
        {title}
      </h3>
      <p className="max-w-xl leading-8 text-(--band-muted) md:col-span-7">{copy}</p>
    </article>
  );
}
