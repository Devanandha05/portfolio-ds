/**
 * Theme toggle keeps the html dark class in sync and renders currentColor
 * icons with a smooth 300ms token-colored control.
 */
/**
 * Theme switch uses currentColor icons and line/accent tokens with a smooth
 * 300ms transition.
 */
import { useEffect, useState } from "react";

const STORAGE_KEY = "theme"; // where the choice is remembered in the browser
// NOTE: keep this key the same as in the small script in index.html (prevents the light flash on load)

/** Work out the starting theme: saved choice first, otherwise the OS setting. */
function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved === "dark";
  } catch {
    /* storage can be blocked; fall through */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * ThemeToggle — round button that switches light / dark.
 * Works by adding or removing class="dark" on <html>, which swaps the colour
 * variables overridden in the `.dark { }` block of src/index.css.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialTheme);

  // Keep the <html> class in sync with the state.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Flip the theme and remember it. Saving happens only on a real click,
  // so visitors who never touch the toggle keep following their OS setting.
  const toggle = () => {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  // Both icons are stacked; the active one rotates/fades in.
  const iconBase = "absolute h-4 w-4 transition-all duration-300";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface/60 text-accent transition-colors duration-300 hover:border-soft"
    >
      {/* Sun (shown in dark mode, click to go light) */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        className={`${iconBase} ${dark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Moon (shown in light mode, click to go dark) */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        className={`${iconBase} ${dark ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}