import { useRef, useState } from "react";
import { SITE } from "../config/site";
import { HERO } from "../data/hero";
import useParallax from "../hooks/useParallax";

/**
 * HERO — "digital identity card" layout.
 * All words live in src/data/hero.js. This file is layout + animation only.
 * Colours come from the tokens in src/index.css, never hard-coded here.
 */

// Maps a "tone" name from hero.js to a theme text colour.
const TONES = {
  accent: "text-accent",
  cool: "text-cool",
  soft: "text-soft",
  muted: "text-muted",
};

// Mouse parallax: moves an element by (mouse position × depth) pixels.
// --mx / --my are set by useParallax(). Bigger depth = moves more.
const parallax = (depth) => ({
  transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
  transition: "transform 0.5s ease-out",
});

// Staggered entrance: element fades up after `s` seconds.
const delay = (s) => ({ animationDelay: `${s}s` });

// Theme-aware transparent colour for inline styles: tint("tint", 25) -> the --color-tint token at 25% opacity.
// Use this anywhere a style={{}} object needs a theme colour with transparency.
const tint = (token, percent) => `color-mix(in oklab, var(--color-${token}) ${percent}%, transparent)`;

// Subtle film-grain texture (an inline SVG, so no image file is needed).
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// ---------- Background: faint grid + grain + soft colour wash ----------
function HeroBackground() {
  const fade = "radial-gradient(ellipse 70% 60% at 65% 40%, black, transparent)";
  const gridLine = tint("line", 35);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Thin grid lines that fade out toward the edges */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px), linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: fade,
          WebkitMaskImage: fade,
        }}
      />
      {/* Grain (inverted in dark mode so it stays visible) */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07] dark:invert" style={{ backgroundImage: NOISE }} />
      {/* Soft colour wash, top-left */}
      <div
        className="absolute -left-40 -top-40 h-128 w-lg rounded-full blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${tint("tint", 25)}, transparent)` }}
      />
    </div>
  );
}

// ---------- Portrait: your image, or a placeholder if the file is missing ----------
function Portrait() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-4/5 w-4/5 flex-col items-center justify-center rounded-[40%_60%_55%_45%/50%_45%_55%_50%] border border-dashed border-soft/70 bg-elevated/60 text-center">
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
      // drop-shadow-portrait = token from index.css (coloured glow under the character)
      className="w-full drop-shadow-portrait"
    />
  );
}

// ---------- One floating symbol (chip, plain text or mouse cursor) ----------
function Floater({ item }) {
  const floatStyle = { animationDuration: `${item.duration}s`, animationDelay: `${item.delay}s` };

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute ${item.layer === "front" ? "z-30" : "z-5"}`}
      style={{ left: item.x, top: item.y, ...parallax(item.depth) }}
    >
      {/* Outer span = mouse parallax, inner span = gentle idle float (kept separate so they don't clash) */}
      {item.type === "cursor" ? (
        <span className={`flex animate-float items-start gap-1 ${TONES[item.tone]}`} style={floatStyle}>
          <svg viewBox="0 0 16 20" className="h-5 w-4 fill-current drop-shadow">
            <path d="M0 0l14 8.5-6 1.6L5.2 17z" />
          </svg>
          <span className="mt-3 rounded bg-btn px-1.5 py-0.5 font-mono text-[10px] text-white">{item.label}</span>
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

// ---------- The "$ whoami" terminal card ----------
function Terminal() {
  const { command, lines } = HERO.terminal;
  return (
    <div
      aria-hidden="true"
      // Glass is used here as an accent only. shadow-glow-sm = token from index.css
      className="absolute -left-2 bottom-2 z-30 w-44 rounded-lg border border-line/60 bg-surface/75 p-3 font-mono text-[11px] leading-5 shadow-glow-sm backdrop-blur-md sm:-left-8 lg:-left-16"
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
        <p key={line} className="animate-fade-up text-muted" style={delay(1.4 + i * 0.35)}>
          {line}
          {/* Blinking caret after the last line */}
          {i === lines.length - 1 && <span className="ml-0.5 inline-block animate-blink text-cool">▍</span>}
        </p>
      ))}
    </div>
  );
}

// ---------- THE SECTION ----------
export default function Hero() {
  const sectionRef = useRef(null);
  useParallax(sectionRef); // enables mouse-follow movement for everything using parallax()

  // Split the intro so the highlighted phrase can get the accent colour.
  const [before, after] = HERO.intro.split(HERO.introHighlight);
  const hasHighlight = after !== undefined;

  return (
    <section ref={sectionRef} id="home" className="relative isolate min-h-screen overflow-hidden pb-20 pt-28 lg:pt-32">
      <HeroBackground />

      <div className="container-page relative">
        {/* ---- Top row: availability + ID label ---- */}
        <div className="flex items-center justify-between animate-fade-up">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {SITE.status.show && (
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inset-0 animate-soft-pulse rounded-full bg-cool motion-reduce:animate-none" />
                <span className="relative h-2 w-2 rounded-full bg-cool" />
              </span>
            )}
            {HERO.eyebrow}
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:block">{HERO.idLabel}</p>
        </div>

        {/* ---- Giant name: letters rise in one by one ----
            Font size is fluid (scales with screen width). If you change the font and the
            name gets too wide, lower the middle value (11.5vw). */}
        <h1
          aria-label={HERO.name}
          className="relative z-10 mt-6 select-none font-display font-bold uppercase leading-[0.9] tracking-tight text-ink"
          style={{ fontSize: "clamp(2.5rem, 11.5vw, 9.5rem)" }}
        >
          {[...HERO.name].map((letter, i) => (
            <span key={i} aria-hidden="true" className="inline-block animate-fade-up" style={delay(0.15 + i * 0.05)}>
              {letter}
            </span>
          ))}
        </h1>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ---- LEFT: role, intro, buttons ---- */}
          <div className="lg:col-span-7 lg:pt-6">
            <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.18em] text-accent sm:text-sm" style={delay(0.7)}>
              {HERO.roleLine}
            </p>

            <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-ink/80 sm:text-xl" style={delay(0.85)}>
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

            <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up" style={delay(1)}>
              {/* Primary button: arrow nudges right on hover. shadow-cta / shadow-cta-hover = tokens in index.css */}
              <a
                href={HERO.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-cta transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cta-hover active:translate-y-0"
              >
                {HERO.primaryCta.label}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

              {/* Secondary button: arrow nudges down on hover */}
              <a
                href={HERO.secondaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full border border-line/70 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-soft hover:text-accent active:translate-y-0"
              >
                {HERO.secondaryCta.label}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
            </div>
          </div>

          {/* ---- RIGHT: floating portrait stage ----
              lg:-mt-20 pulls it up so the portrait slightly overlaps the name.
              More overlap = bigger negative number (e.g. lg:-mt-28). No overlap = remove it.
              lg:-mr-10 pushes it a little outside the page grid. */}
          <div className="relative mx-auto mt-4 w-full max-w-110 lg:col-span-5 lg:-mr-10 lg:-mt-20 lg:ml-auto">
            <div className="relative aspect-4/5 w-full">
              {/* Glow behind the portrait (-inset-[12%] = extends 12% beyond the box on every side) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[12%]"
                style={{ background: `radial-gradient(closest-side, ${tint("tint", 55)}, transparent 70%)`, ...parallax(6) }}
              />
              {/* Orbit rings (very thin, one slowly rotating) */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-[6%] rounded-full border border-line/50" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-[-4%] animate-spin-slow rounded-full border border-dashed border-line/40" />

              {/* Viewfinder corner marks: a nod to ID-photo framing */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-[4%]">
                {[
                  "left-0 top-0 border-l border-t",
                  "right-0 top-0 border-r border-t",
                  "bottom-0 left-0 border-b border-l",
                  "bottom-0 right-0 border-b border-r",
                ].map((position) => (
                  <span key={position} className={`absolute h-4 w-4 border-soft/70 ${position}`} />
                ))}
              </div>

              {/* Floating symbols */}
              {HERO.floaters.map((item) => (
                <Floater key={item.id} item={item} />
              ))}

              {/* The portrait itself: mouse parallax > entrance fade > idle float */}
              <div className="absolute inset-0 z-20 flex items-center justify-center" style={parallax(14)}>
                <div className="w-full animate-fade-up" style={delay(0.5)}>
                  <div className="animate-float" style={{ animationDuration: "7s" }}>
                    <Portrait />
                  </div>
                </div>
              </div>

              <Terminal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}