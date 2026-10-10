/**
 * Navbar renders responsive navigation with surface/line tokens and a gradient
 * active indicator when the page is scrolled.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SITE, NAV_ITEMS } from "../../config/site";
import useActiveSection from "../../hooks/useActiveSection";
import StatusBadge from "./StatusBadge";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

/**
 * Fixed portfolio navigation with a transparent-to-surface scroll state,
 * tokenized active gradient, and muted mono numbering.
 *
 *  Desktop (lg and up):  [ DS.        01 WORK  02 SKILLS ...        ● OPEN TO WORK  ☾ ]
 *  Mobile:               [ DS.                                                   ●   ]
 *                        + floating round button -> full-screen menu (MobileMenu.jsx)
 *
 * Behaviour:
 *  - Transparent at the top of the page.
 *  - After scrolling: soft translucent background, thin bottom border, and the
 *    bar gets slightly shorter (the small role line under the logo folds away).
 *  - The bottom border doubles as a scroll-progress line.
 *  - A tiny dot slides under the link of the section you are reading.
 */

// Defined outside the component so the array is created only once.
const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  const progressRef = useRef(null); // the thin progress line
  const linkRefs = useRef({});      // id -> <a> element, used to position the dot
  const hasPlacedDot = useRef(false);
  const [dot, setDot] = useState({ x: 0, visible: false, animate: false });

  // ---- 1. Scroll: toggle the "scrolled" look + update the progress line ----
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16); // React ignores this if the value didn't change

      // Progress is written straight to the element (no re-render on every scroll tick)
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
    };
    onScroll(); // run once on load
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- 2. Move the dot under the active link ----
  useLayoutEffect(() => {
    const place = () => {
      const el = linkRefs.current[active];
      if (!el) {
        setDot((d) => ({ ...d, visible: false })); // no active section -> fade out
        return;
      }
      setDot({
        x: el.offsetLeft + el.offsetWidth / 2 - 2, // centre of the link (dot is 4px wide)
        visible: true,
        animate: hasPlacedDot.current, // first appearance appears in place instead of sliding in
      });
      hasPlacedDot.current = true;
    };
    place();
    window.addEventListener("resize", place); // keep it aligned if the window changes
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,padding,backdrop-filter] duration-300 ${
          scrolled
            ? "border-line bg-surface/80 py-3 backdrop-blur-md"
            : "border-transparent bg-transparent py-5"
        }`}
      >
        {/* Mobile: logo left / status right.  Desktop: 3-column grid (logo | nav | status) */}
        <div className="container-page flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* ---------- LEFT: logo mark ---------- */}
          <a href="#home" aria-label="Back to top" className="justify-self-start leading-none">
            <span className="font-display text-2xl font-bold tracking-tight text-ink">
              {SITE.initials}
              <span className="text-accent">.</span>
            </span>
            {/* Role line: folds away on scroll to make the bar more compact */}
            <span
              className={`block overflow-hidden text-[10px] uppercase tracking-[0.18em] text-muted transition-all duration-300 ${
                scrolled ? "max-h-0 opacity-0" : "mt-1 max-h-4 opacity-100"
              }`}
            >
              {SITE.roleLine}
            </span>
          </a>

          {/* ---------- CENTER: desktop navigation ---------- */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="relative flex items-center gap-1">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.id}>
                  <a
                    ref={(el) => (linkRefs.current[item.id] = el)}
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "location" : undefined}
                    className="group flex items-baseline gap-1.5 px-3 py-2 text-[13px] font-medium uppercase tracking-wider text-muted transition-colors hover:text-ink aria-[current=location]:text-ink"
                  >
                    {SITE.showNumbers && (
                      <span className="font-mono text-[10px] text-muted transition-colors group-hover:text-accent group-aria-[current=location]:text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                    {item.label}
                  </a>
                </li>
              ))}

              {/* The sliding active-section dot (decorative) */}
              <span
              aria-hidden="true"
              className={`pointer-events-none absolute -bottom-0.5 left-0 h-1 w-1 rounded-full bg-gradient-brand duration-500 ease-out ${
              dot.animate ? "transition-[transform,opacity]" : "transition-opacity"
            }`}
              style={{ transform: `translateX(${dot.x}px)`, opacity: dot.visible ? 1 : 0 }}
              />
            </ul>
          </nav>

          {/* ---------- RIGHT: status + theme toggle ---------- */}
          <div className="flex items-center gap-3 justify-self-end">
            <StatusBadge collapse />
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Scroll-progress hairline that sits on the bottom border */}
        <div
          ref={progressRef}
          aria-hidden="true"
          className={`absolute inset-x-0 -bottom-px h-px origin-left bg-gradient-brand transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: "scaleX(0)" }}
        />
      </header>

      {/* Mobile-only floating button + full-screen panel */}
      <MobileMenu active={active} />
    </>
  );
}
