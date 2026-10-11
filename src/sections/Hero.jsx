/**
 * Hero (v2): "name behind portrait" layout.
 *
 * Layers, back to front:
 *   1. Section background  -> transparent by default (see BACKGROUND switch below)
 *   2. Giant name          -> z-10, sits BEHIND the portrait
 *   3. Portrait            -> z-20, bottom-anchored, fades into the page at the bottom
 *   4. Floaters / terminal -> z-30, decorative, hidden from screen readers
 *   5. Intro + CTAs        -> z-30, overlaps the portrait's lower edge on large screens
 *
 * All copy lives in src/data/hero.js and src/config/site.js.
 * All colours are semantic tokens (text-ink, text-accent, border-line ...), so a
 * theme change in index.css updates this file automatically.
 */
import { useRef, useState } from "react";
import { SITE } from "../config/site";
import { HERO } from "../data/hero";
import useParallax from "../hooks/useParallax";

/* ====================================================================
   QUICK TWEAKS: change these without touching the JSX below
   ==================================================================== */

// How the giant name looks. Pick one: "solid" | "gradient" | "soft"
//   solid    -> plain text-ink, closest to your reference image
//   gradient -> uses your text-gradient utility (accent fade)
//   soft     -> slightly transparent, so the portrait feels like it pops more
const NAME_STYLE = "solid";

// Hero background. Pick one: "none" | "glow" | "grid" | "aurora"
//   none   -> fully transparent, the page colour shows through (default)
//   glow   -> one soft tint-coloured light behind the portrait, nothing else
//   grid   -> your faint grid texture only
//   aurora -> the old raspberry / violet / mint blobs (the purple look)
const BACKGROUND = "none";

// Background choice -> Tailwind classes (all classes already exist in index.css)
const BACKGROUNDS = {
  none: "",
  glow: "",
  grid: "bg-grid",
  aurora: "bg-aurora",
};

// Name font size (fluid). "Devanandha S" is 12 characters, so 11vw fits edge to edge.
// Too wide? Lower the middle value. Too small? Raise it.
const NAME_SIZE = "clamp(2.75rem, 13vw, 12rem)";

// Vertical position of the name inside the stage (percentage from the top).
const NAME_TOP = "5%";

// How tall the portrait is relative to the stage. Bigger = more overlap with the name.
const PORTRAIT_HEIGHT = "100%";

// Name look -> Tailwind classes
const NAME_STYLES = {
  solid: "text-ink",
  gradient: "text-gradient",
  soft: "text-ink/80",
};

// Maps floating symbols to the three decorative token colours.
const TONES = {
  accent: "text-accent",
  cool: "text-cool",
  sun: "text-sun",
};

/* ====================================================================
   SMALL HELPERS
   ==================================================================== */

// Mouse parallax: moves an element by (mouse position x depth) pixels.
// --mx / --my are set by useParallax(). Negative depth = moves opposite to the mouse.
const parallax = (depth) => ({
  transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
  transition: "transform 0.5s ease-out",
});

// Staggered entrance: element fades up after `s` seconds.
const delay = (s) => ({ animationDelay: `${s}s` });

/* ====================================================================
   PORTRAIT (your image, or a placeholder if the file is missing)
   ==================================================================== */
function Portrait() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-t-[50%] border border-dashed border-soft/70 bg-elevated/60 text-center">
        <span className="font-display text-7xl font-bold text-accent">{SITE.initials}.</span>
        <span className="mt-2 px-6 font-mono text-[10px] uppercase tracking-wider text-muted">
          Add {HERO.portrait.src} to /public
        </span>
      </div>
    );
  }

  return (
    <img
      src={HERO.portrait.src}
      alt={HERO.portrait.alt}
      onError={() => setFailed(true)}
      // object-bottom keeps the cut-off edge at the bottom of the box.
      // drop-shadow-portrait = token from index.css (coloured glow around the character).
      className="h-full w-full object-contain object-bottom drop-shadow-portrait"
      // Bottom fade: the portrait dissolves into the page instead of ending in a hard edge.
      // Change 78% to fade earlier (smaller) or later (bigger).
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, #000 78%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, #000 78%, transparent 100%)",
      }}
    />
  );
}

/* ====================================================================
   ONE FLOATING SYMBOL (chip, plain text, or mouse cursor)
   Positions (x / y) come from HERO.floaters, as percentages of the portrait box.
   ==================================================================== */
function Floater({ item }) {
  const floatStyle = { animationDuration: `${item.duration}s`, animationDelay: `${item.delay}s` };

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute ${item.layer === "front" ? "z-30" : "z-5"}`}
      style={{ left: item.x, top: item.y, ...parallax(item.depth) }}
    >
      {/* Outer span = mouse parallax, inner span = idle float (separate so they don't clash) */}
      {item.type === "cursor" ? (
        <span className={`flex animate-float items-start gap-1 ${TONES[item.tone]}`} style={floatStyle}>
          <svg viewBox="0 0 16 20" className="h-5 w-4 fill-current drop-shadow">
            <path d="M0 0l14 8.5-6 1.6L5.2 17z" />
          </svg>
          <span className="mt-3 rounded bg-btn px-1.5 py-0.5 font-mono text-[10px] text-btn-text">{item.label}</span>
        </span>
      ) : (
        <span
          className={`block animate-float font-mono text-xs ${TONES[item.tone]} ${
            item.chip ? "rounded-md border border-line/60 bg-surface/70 px-2 py-1 backdrop-blur-sm" : ""
          }`}
          style={floatStyle}
        >
          {item.text}
        </span>
      )}
    </span>
  );
}

/* ====================================================================
   THE "$ whoami" TERMINAL CARD
   Glass (backdrop-blur) is used here as an accent only.
   ==================================================================== */
function Terminal() {
  const { command, lines } = HERO.terminal;
  return (
    <div
      aria-hidden="true"
      className="absolute -left-6 bottom-[22%] z-30 hidden w-44 rounded-lg border border-line bg-surface/80 p-3 font-mono text-[11px] leading-5 shadow-glow-sm backdrop-blur-md sm:block lg:-left-24"
      style={parallax(10)}
    >
      {/* Tiny window dots */}
      <div className="mb-1.5 flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-1.5 rounded-full bg-line" />
      </div>
      <p className="text-ink">
        <span className="text-cool">$</span> {command}
      </p>
      {/* Output lines appear one after another */}
      {lines.map((line, i) => (
        <p key={line} className="animate-fade-up text-ink" style={delay(1.4 + i * 0.35)}>
          {line}
          {/* Blinking caret after the last line */}
          {i === lines.length - 1 && <span className="ml-0.5 inline-block animate-blink text-cool">▍</span>}
        </p>
      ))}
    </div>
  );
}

/* ====================================================================
   THE SECTION
   ==================================================================== */
export default function Hero() {
  const sectionRef = useRef(null);
  useParallax(sectionRef); // enables mouse-follow movement for everything using parallax()

  // Split the intro so the highlighted phrase can get the accent colour.
  const [before, after] = HERO.intro.split(HERO.introHighlight);
  const hasHighlight = after !== undefined;

  return (
    <section
      ref={sectionRef}
      id="home"
      // Background comes from the BACKGROUND switch at the top of this file.
      // No bg-page on purpose, so the page colour shows through.
      className={`relative isolate min-h-screen overflow-hidden pt-24 lg:pt-28 ${BACKGROUNDS[BACKGROUND]}`}
    >
      {/* Optional single soft glow (only when BACKGROUND = "glow") */}
      {BACKGROUND === "glow" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-40rem w-40rem -translate-x-1/2 rounded-full bg-tint/40 blur-3xl"
        />
      )}
      <div className="container-page relative">
        {/* ---- Top row: availability + ID label ---- */}
        <div className="flex animate-fade-up items-center justify-between">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
            {SITE.status.show && (
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inset-0 animate-soft-pulse rounded-full bg-cool motion-reduce:animate-none" />
                <span className="relative h-2 w-2 rounded-full bg-cool" />
              </span>
            )}
            {HERO.eyebrow}
          </p>
        </div>
      </div> 

      {/* ================= STAGE: name (behind) + portrait (front) =================
          Full width on purpose, so the name can stretch edge to edge like the reference.
          Height: fills the screen on desktop, a fixed comfortable height on mobile. */}
      <div className="relative mt-4 h-[62vh] min-h-130 w-full lg:h-[calc(100vh-8.5rem)]">
        {/* ---- 1) GIANT NAME, behind the portrait ---- */}
        <h1
          aria-label={HERO.name}
          className={`absolute inset-x-0 z-10 select-none whitespace-nowrap text-center font-mono font-bold uppercase leading-[0.9] tracking-tight ${NAME_STYLES[NAME_STYLE]}`}
          style={{ top: NAME_TOP, fontSize: NAME_SIZE, ...parallax(-6) }}
        >
          {/* Letters rise in one by one */}
          {[...HERO.name].map((letter, i) => (
            <span key={i} aria-hidden="true" className="inline-block animate-fade-up" style={delay(0.15 + i * 0.05)}>
              {letter}
            </span>
          ))}
        </h1>

        {/* ---- 2) PORTRAIT BOX: centred, glued to the bottom ----
            Outer div = positioning only. Inner div = mouse parallax. Floaters live in the
            same box, so their x / y percentages stay attached to the portrait. */}
        <div
          className="absolute bottom-0 right-[4%] z-20 aspect-4/5"
          style={{ height: PORTRAIT_HEIGHT }}
        >
          {/* Soft glow behind the character (-inset-[12%] = extends 12% beyond the box) */}
          <div
            aria-hidden="true"
            style={parallax(6)}
            className="pointer-events-none absolute inset-[-12%] rounded-full bg-tint/30 blur-3xl"
          />

          {/* Very thin dashed ring, slowly rotating (hidden on small screens to keep it clean) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-6%] top-[4%] hidden aspect-square animate-spin-slow rounded-full border border-dashed border-line/40 md:block"
          />

          {/* Floating symbols */}
          {HERO.floaters.map((item) => (
            <Floater key={item.id} item={item} />
          ))}

          {/* The portrait: mouse parallax > entrance fade > idle float */}
          <div className="absolute inset-0 bottom-0 z-20" style={parallax(12)}>
            <div className="h-full w-full animate-fade-up" style={delay(0.5)}>
              <div className="h-max w-max animate-float" style={{ animationDuration: "7s" }}>
                <Portrait />
              </div>
            </div>
          </div>

          <Terminal />
        </div>
      </div>

      {/* ================= INFO BLOCK: role + intro + buttons, stacked on the left =================
          lg:-mt-70 pulls this block up toward the name. Raise or lower the number to move it.
          The block stays inside the left 6 of 12 columns, so it never runs under the portrait. */}
      <div className="container-page relative z-30 pb-16 lg:-mt-70">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p
              className="animate-fade-up font-mono text-xs uppercase tracking-[0.18em] text-accent sm:text-sm"
              style={delay(0.7)}
            >
              {HERO.roleLine}
            </p>

            <p className="mt-4 max-w-md animate-fade-up text-lg leading-relaxed text-ink" style={delay(0.85)}>
              {hasHighlight ? (
                <>
                  {before}
                  <span className="font-medium text-accent">{HERO.introHighlight}</span>
                  {after}
                </>
              ) : (
                HERO.intro
              )}
            </p>

            {/* Buttons: directly under the intro text (left aligned) */}
            <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-4" style={delay(1)}>
            {/* Primary button: arrow nudges right on hover */}
            <a
              href={HERO.primaryCta.href}
              className="group btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-btn-text shadow-glow transition-all duration-300 hover:scale-[1.03] active:scale-100"
            >
              {HERO.primaryCta.label}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            {/* Secondary button: arrow nudges down on hover */}
            <a
              href={HERO.secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:border-soft hover:text-accent"
            >
              {HERO.secondaryCta.label}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
