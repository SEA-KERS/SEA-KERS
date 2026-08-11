import { useEffect, useRef, useState } from "react";

/** Scroll reveal via IntersectionObserver. The `is-visible` flag is React
 *  state so it lives inside the className React renders — never added with
 *  classList imperatively, which React would wipe on the next re-render.
 *  Returns `{ ref, isVisible }`; attach `ref` and render the `.is-visible`
 *  class from `isVisible`. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
