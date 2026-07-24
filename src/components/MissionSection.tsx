import { Award, Compass, Flame, Target } from "lucide-react";

const chapters = [
  {
    title: "The beginning",
    Icon: Flame,
    copy: "We started as college students with more ambition than resources: no dedicated lab, funding, or institutional advantage. We had a shared belief that disciplined engineering could compete with the best.",
  },
  {
    title: "The trials",
    Icon: Award,
    copy: "For two years we lost early and often. We kept building, studied every result, and travelled across India on limited budgets. Each setback became evidence, and each iteration made the team stronger.",
  },
  {
    title: "The mindset",
    Icon: Compass,
    copy: "SEA-KERS is a multidisciplinary crew defined less by a stack than by curiosity, resilience, and respect for craft. The caret is our reminder to keep learning and power upward together.",
  },
] as const;

export default function MissionSection() {
  return (
    <section
      id="about-section"
      aria-labelledby="mission-title"
      className="border-b border-(--border) bg-(--muted) px-4 py-20 md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p className="section-kicker">
          <Target aria-hidden="true" className="h-4 w-4" />
          Our story
        </p>
        <h2 id="mission-title" className="mt-3 font-headline text-4xl font-bold md:text-5xl">
          Seek farther. Build better.
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-(--muted-foreground)">
          SEA-KERS grew through repeated experiments, shared constraints, and a
          commitment to turn every hard problem into a working system.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {chapters.map(({ title, Icon, copy }) => (
            <article key={title} className="surface-card p-6">
              <Icon aria-hidden="true" className="h-5 w-5 text-(--primary-text)" />
              <h3 className="mt-4 font-headline text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-(--muted-foreground)">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-(--primary) px-6 py-10 text-center text-(--primary-foreground) md:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em]">Our mission</p>
          <p className="mx-auto mt-3 max-w-4xl font-headline text-3xl font-bold md:text-5xl">
            Young minds innovating from India to the world.
          </p>
        </div>
      </div>
    </section>
  );
}