import { ArrowDown } from "lucide-react";
import CyberDotMatrix from "./CyberDotMatrix";
import { useThemeContext } from "../../hooks/useTheme";

interface HeroProps {
  onOpenRecord: () => void;
}

export default function Hero({ onOpenRecord }: HeroProps) {
  const { theme } = useThemeContext();
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-screen w-full items-center justify-center bg-white text-neutral-900 dark:bg-[#06080e] dark:text-white px-4 pt-28 pb-16 md:px-8 md:pt-36 md:pb-20 snap-section overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-16">
          <div className="flex-1 max-w-lg">
            <h1
              id="hero-title"
              className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.5rem] leading-[1.08]"
            >
              <span className="block text-neutral-900 dark:text-white">Curious minds.</span>
              <span className="block text-(--primary) mt-1 whitespace-nowrap">Persistent builders.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
              Young minds innovating from India to the world,
              <br />
              one challenge at a time.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenRecord}
                className="button-primary cursor-pointer"
              >
                See the record
                <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end shrink-0">
            <CyberDotMatrix theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
}
