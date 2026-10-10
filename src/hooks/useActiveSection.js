import { useEffect, useState } from "react";

/**
 * useActiveSection(ids)
 * Tells you which section is currently in the middle of the screen.
 *
 * @param {string[]} ids - section ids, e.g. ["work", "skills"]
 * @returns {string|null} the active id, or null while you are at the very top (hero)
 *
 * IMPORTANT: pass a stable array (define it outside your component),
 * otherwise the observer is rebuilt on every render.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean); // ignore ids that don't exist yet
    if (sections.length === 0) return;

    // The "-45% / -50%" margins shrink the detection area to a thin band across
    // the middle of the screen, so a section counts as active when it crosses it.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    // Back at the top of the page = no section active.
    const onScroll = () => {
      if (window.scrollY < 80) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cleanup when the component unmounts.
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
}
