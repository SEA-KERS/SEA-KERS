/* oxlint-disable react/only-export-components */
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ComponentProps, KeyboardEvent, ReactElement } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];

interface CarouselContextValue {
  emblaRef: UseEmblaCarouselType[0];
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  scrollSnaps: number[];
  selectedIndex: number;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext(): CarouselContextValue {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel parts must be used inside <Carousel>.");
  }
  return context;
}

interface CarouselRootProps extends ComponentProps<"section"> {
  options?: CarouselOptions;
}

function CarouselRoot({
  options,
  className,
  children,
  ...props
}: CarouselRootProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    update();
    emblaApi.on("reInit", update);
    emblaApi.on("select", update);
    return () => {
      emblaApi.off("reInit", update);
      emblaApi.off("select", update);
    };
  }, [emblaApi]);

  return (
    <CarouselContext.Provider
      value={{
        emblaRef,
        canScrollPrev,
        canScrollNext,
        scrollPrev: () => emblaApi?.scrollPrev(),
        scrollNext: () => emblaApi?.scrollNext(),
        scrollTo: (index: number) => emblaApi?.scrollTo(index),
        scrollSnaps,
        selectedIndex,
      }}
    >
      <section
        role="region"
        aria-roledescription="carousel"
        className={className}
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

interface CarouselContentProps extends ComponentProps<"div"> {}

function CarouselContent({
  className,
  children,
  ...props
}: CarouselContentProps) {
  const { emblaRef, scrollPrev, scrollNext, scrollSnaps } =
    useCarouselContext();
  const count = scrollSnaps.length;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  };

  return (
    <div
      ref={emblaRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`overflow-hidden ${className ?? ""}`}
      {...props}
    >
      <div className="flex h-full">
        {Children.map(children, (child, index) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<CarouselItemProps>, {
                index,
                count,
              })
            : child,
        )}
      </div>
    </div>
  );
}

interface CarouselItemProps extends ComponentProps<"div"> {
  index?: number;
  count?: number;
}

function CarouselItem({
  className,
  index = 0,
  count = 0,
  children,
  ...props
}: CarouselItemProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1} of ${count}`}
      className={`min-w-0 shrink-0 grow-0 basis-full ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CarouselButtonProps extends ComponentProps<"button"> {}

function CarouselPrevious({
  className,
  children,
  ...props
}: CarouselButtonProps) {
  const { canScrollPrev, scrollPrev } = useCarouselContext();
  return (
    <button
      type="button"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      aria-label="Previous slide"
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

function CarouselNext({ className, children, ...props }: CarouselButtonProps) {
  const { canScrollNext, scrollNext } = useCarouselContext();
  return (
    <button
      type="button"
      onClick={scrollNext}
      disabled={!canScrollNext}
      aria-label="Next slide"
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

interface CarouselDotsProps extends ComponentProps<"div"> {
  dotClassName?: string;
}

function CarouselDots({
  className,
  dotClassName,
  ...props
}: CarouselDotsProps) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarouselContext();
  return (
    <div
      role="group"
      aria-label="Choose slide"
      className={className}
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={selectedIndex === index ? "true" : undefined}
          data-active={selectedIndex === index ? "" : undefined}
          className={dotClassName}
        />
      ))}
    </div>
  );
}

export const Carousel = Object.assign(CarouselRoot, {
  Root: CarouselRoot,
  Content: CarouselContent,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Dots: CarouselDots,
}) as typeof CarouselRoot & {
  Root: typeof CarouselRoot;
  Content: typeof CarouselContent;
  Item: typeof CarouselItem;
  Previous: typeof CarouselPrevious;
  Next: typeof CarouselNext;
  Dots: typeof CarouselDots;
};
