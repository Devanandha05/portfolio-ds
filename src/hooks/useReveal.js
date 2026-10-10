import { useEffect, useRef, useState } from "react";

/**
 * useReveal()
 * Returns [ref, shown]. Attach `ref` to an element; `shown` turns true
 * (once) when the element scrolls into view. Used by <Reveal>.
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Very old browsers: just show the content.
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect(); // animate only the first time
        }
      },
      // Slightly shrink the bottom edge so it triggers a touch after entering the screen
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, shown];
}
