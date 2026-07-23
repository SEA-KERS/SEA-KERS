import { Target, Compass, Award, Flame } from "lucide-react";

export default function MissionSection() {
  return (
    <section
      id="about-section"
      className="py-16 px-4 md:px-8 bg-(--bg-surface) border-b-2 border-(--border-main) relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 border-b-2 border-(--border-main) pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#001dc2] font-bold uppercase tracking-widest mb-2">
              <Target className="w-4 h-4 text-[#da261c]" />
              <span>OUR LORE //</span>
            </div>
            <h2 className="font-headline font-black text-3xl md:text-5xl uppercase text-[#da261c] tracking-tight">
              About Us & Our Mission
            </h2>
          </div>
        </div>

        {/* Story & Lore Cards Container */}
        <div className="grid grid-cols-1 gap-8 mb-14">
          {/* Opening Paragraph Card */}
          <div className="bg-(--bg-surface-subtle) border-2 border-(--border-main) p-6 md:p-8 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] relative">
            <div className="flex items-center gap-2 font-mono text-xs text-[#da261c] font-black uppercase mb-3">
              <Flame className="w-4 h-4 text-[#da261c]" />
              <span>THE BEGINNING</span>
            </div>
            <p className="font-headline text-base md:text-lg text-(--text-main) leading-relaxed font-normal">
              We started as a handful of college students with more ambition
              than resources. No labs. No funding. No institutional backing.
              Just a group of young engineers who believed they could compete
              with the best and set out to prove it.
            </p>
          </div>

          {/* The Lore Paragraph Card */}
          <div className="bg-(--bg-surface-subtle) border-2 border-(--border-main) p-6 md:p-8 shadow-[4px_4px_0px_rgba(0,0,0,0.15)] border-l-4 border-l-[#da261c]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#001dc2] font-black uppercase mb-3">
              <Award className="w-4 h-4 text-[#001dc2]" />
              <span>THE JOURNEY & THE TRIALS</span>
            </div>
            <div className="space-y-4 font-headline text-base md:text-lg text-(--text-main) leading-relaxed font-normal">
              <p>
                From our sophomore year, we were building — different ideas,
                different team combinations, different hackathons. For two
                years, we failed. Eliminated early. We watched other teams take
                the prize while we figured out what we were missing. But we
                never stopped building, never lost hope. Every loss was a
                lesson. We believed in ourselves as a team.
              </p>
              <p>
                We challenged ourselves to be winners. We packed into buses,
                trains, and shared hotel rooms — traveling across South India on
                a shoestring budget, from Tamil Nadu to Kerala, Karnataka,
                Odisha, and Bengaluru. We walked into venues where IIT and IISc
                teams had faculty mentors, funding, and credibility behind them.
                We had one thing: our capabilities and each other. We won
                anyway. Twenty times over.
              </p>
            </div>
          </div>

          {/* The Team Character & Caret Symbol Card */}
          <div className="bg-(--bg-surface-subtle) border-2 border-(--border-main) p-6 md:p-8 shadow-[4px_4px_0px_rgba(0,0,0,0.15)]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#da261c] font-black uppercase mb-3">
              <Compass className="w-4 h-4 text-[#da261c]" />
              <span>THE MINDSET & THE CARET (^)</span>
            </div>
            <div className="space-y-4 font-headline text-base md:text-lg text-(--text-main) leading-relaxed font-normal">
              <p>
                What makes SEA-KERS isn't a tech stack — it's a mindset. We are
                diverse: different backgrounds and different disciplines. But
                every challenge we faced taught us one thing: never quit, never
                settle. Passion and grit drive us to give 200%.
              </p>
              <p className="font-semibold text-(--text-main)">
                The name says it all. SEA-KERS are seekers — a ship charting its
                own course toward a ocean of oppurtunites. Our symbol is the
                caret{" "}
                <span className="text-[#da261c] font-black text-xl font-mono">
                  ^
                </span>{" "}
                — because we believe in powering upward. As individuals. As a
                team. As a nation.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement Banner */}
        <div className="bg-[#da261c] text-white p-6 md:p-8 border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.9)] text-center">
          <span className="font-mono text-xs uppercase tracking-widest font-black block mb-2 opacity-90">
            THE MISSION STATEMENT
          </span>
          <h3 className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight">
            Young Minds Innovating from India to the World
          </h3>
        </div>
      </div>
    </section>
  );
}
