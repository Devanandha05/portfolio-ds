import { useEffect } from "react";

/**
 * useParallax(ref)
 * Tracks the mouse over an element and writes its position into two CSS variables:
 *   --mx  (-1 = far left,  +1 = far right)
 *   --my  (-1 = top,       +1 = bottom)
 * Children then move using CSS, e.g.  translateX(calc(var(--mx) * 20px)).
 * No React re-renders happen while the mouse moves, so it stays smooth.
 *
 * It does nothing on touch screens or if the visitor prefers reduced motion.
 */
export default function useParallax(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !hasMouse) return;

    let frame = 0;

    const onMove = (e) => {
      cancelAnimationFrame(frame); // at most one update per screen frame
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        const x = ((e.clientX - box.left) / box.width - 0.5) * 2;
        const y = ((e.clientY - box.top) / box.height - 0.5) * 2;
        el.style.setProperty("--mx", x.toFixed(3));
        el.style.setProperty("--my", y.toFixed(3));
      });
    };

    // Mouse leaves the section: ease everything back to the centre.
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref]);
}
