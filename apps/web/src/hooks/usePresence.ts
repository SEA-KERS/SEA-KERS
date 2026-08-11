import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const getDuration = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches
    ? 0
    : 400;

/** Keeps content mounted while `open` is true, then leaves it in the DOM for
 *  one `duration` after `open` flips to false so a fade-out transition can
 *  play before the node is removed. `visible` toggles for the CSS opacity /
 *  transform transition; `mounted` drives the conditional render. */
export function usePresence(open: boolean) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timeout = window.setTimeout(() => setMounted(false), getDuration());
    return () => window.clearTimeout(timeout);
  }, [open]);

  return { mounted, visible };
}
