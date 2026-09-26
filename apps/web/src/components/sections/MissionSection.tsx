export default function MissionSection() {
  return (
    <section
      id="about"
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
        <p className="mt-5 max-w-3xl text-lg sm:text-xl leading-8 text-(--band-muted)">
          SEA-KERS is a multidisciplinary team with deep hands-on experience building production-ready systems across edge AI, computer vision, and assistive technology.
        </p>

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

