import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const getDuration = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches
    ? 0
    : 400;

/** Presence management for inline-expanded regions (wins / projects detail).
 *  - `open: true`  -> the region mounts immediately with `enter: true`.
 *  - `open: false` -> `enter` flips to false so the exit animation can play,
 *    and the node stays mounted for one `duration` before unmounting.
 *  This avoids the element being removed mid-animation. */
export function usePresence(open: boolean) {
  const [mounted, setMounted] = useState(open);
  const [enter, setEnter] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setEnter(true);
      return;
    }

    setEnter(false);
    const timeout = window.setTimeout(() => setMounted(false), getDuration());
    return () => window.clearTimeout(timeout);
  }, [open]);

  return { mounted, enter };
}
