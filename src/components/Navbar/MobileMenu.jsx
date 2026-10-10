/**
 * Mobile menu uses the shared button, surface, aurora, and text tokens.
 */
import { useEffect, useState } from "react";
import { SITE, NAV_ITEMS } from "../../config/site";
import StatusBadge from "./StatusBadge";
import ThemeToggle from "./ThemeToggle";

/**
 * Mobile navigation button and panel use btn, surface, line, and ink/accent
 * tokens while preserving the existing circular reveal behavior.
 *
 * MobileMenu — floating round button (bottom-right, easy to reach with a thumb)
 * that opens a full-screen panel. The panel "grows" out of the button as a circle.
 * Only visible below the `lg` breakpoint (1024px).
 *
 * @param {string|null} active - id of the section currently in view
 */

// The button is 3.5rem wide and sits 1.5rem from the corner, so its centre is
// 3.25rem from the right and bottom edges. The reveal circle starts from there.
const ORIGIN = "calc(100% - 3.25rem) calc(100% - 3.25rem)";
const DURATION = 700; // ms — panel open/close speed

export default function MobileMenu({ active }) {
  const [open, setOpen] = useState(false);

  // While open: lock page scrolling and let the Escape key close the menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // If the window is resized to desktop size, close the menu.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close the menu first, THEN scroll (scrolling is locked while it is open).
  const goTo = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  return (
    <>
      {/* ---------- Floating circular button ----------
          shadow-glow = custom token defined in index.css (@theme), follows the theme colours */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed bottom-6 right-6 z-60 flex h-14 w-14 items-center justify-center rounded-full bg-btn text-btn-text shadow-glow transition-transform duration-300 active:scale-90 lg:hidden"
      >
        {/* Two lines that rotate into an X when open (h-0.5 = 2px thick) */}
        <span className="relative block h-3 w-5" aria-hidden="true">
          <span className={`absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300 ${open ? "top-1.25 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300 ${open ? "top-1.25 -rotate-45" : "top-2.5"}`} />
        </span>
      </button>

      {/* ---------- Full-screen panel ---------- */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-surface bg-aurora px-8 pb-28 pt-24 lg:hidden"
        style={{
          // The circular reveal: a 0-size circle grows to cover the screen
          clipPath: open ? `circle(150vmax at ${ORIGIN})` : `circle(0px at ${ORIGIN})`,
          // `visibility` waits until the close animation ends, so hidden links can't be tabbed to
          transition: `clip-path ${DURATION}ms cubic-bezier(0.77, 0, 0.18, 1), visibility 0s linear ${open ? 0 : DURATION}ms`,
          visibility: open ? "visible" : "hidden",
        }}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item, i) => {
              const isActive = active === item.id;
              return (
                <li
                  key={item.id}
                  // Links slide up one after another (stagger) once the circle is open
                  style={{ transitionDelay: open ? `${300 + i * 70}ms` : "0ms" }}
                  className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={goTo(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex items-baseline gap-4 border-b border-line/50 py-4 font-display text-4xl font-semibold tracking-tight transition-colors active:text-accent ${isActive ? "text-accent" : "text-ink"}`}
                  >
                    {SITE.showNumbers && (
                      <span className="font-mono text-xs font-normal text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer of the panel: availability, email, theme switch */}
        <div
          style={{ transitionDelay: open ? "600ms" : "0ms" }}
          className={`flex flex-col gap-4 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="flex items-center justify-between">
            <StatusBadge />
            <ThemeToggle />
          </div>
          <a href={`mailto:${SITE.email}`} className="relative text-sm text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-brand after:transition-transform hover:after:scale-x-100">
            {SITE.email}
          </a>
        </div>
      </div>
    </>
  );
}