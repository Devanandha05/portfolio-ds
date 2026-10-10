import { useRef, useState } from "react";
import { SITE } from "../../config/site";
import { ABOUT } from "../../data/about";
import { HERO } from "../../data/hero";

/**
 * IdCard — the "digital identity card" from the Hero idea, now with real details.
 *
 *   ┌ IDENTITY CARD · NO. 0001 ┐
 *   │  (photo)  Devanandha     │
 *   │           Analyst · ...  │
 *   │  COMPANY  Cognizant      │
 *   │  ...                     │
 *   │  ▌▌ ▌▌▌ ▌ barcode        │
 *   └──────────────────────────┘
 *
 * Micro-animations: on desktop the card tilts a few degrees toward your mouse and
 * a soft light follows it. Touch screens and reduced-motion users get a still card.
 * All text comes from src/data/about.js.
 */

// Decorative "barcode": each number is a bar width in px. Change it for a different pattern.
const BARS = [2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 3, 1];

const MAX_TILT = 6; // degrees. Lower = subtler.

export default function IdCard() {
  const cardRef = useRef(null);
  const [photoFailed, setPhotoFailed] = useState(false);
  const { card } = ABOUT;

  const handlePointerMove = (e) => {
    const el = cardRef.current;
    if (!el || e.pointerType !== "mouse") return; // no tilt on touch
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const box = el.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width; // 0 → 1 across the card
    const y = (e.clientY - box.top) / box.height; // 0 → 1 down the card

    el.style.setProperty("--x", `${x * 100}%`);
    el.style.setProperty("--y", `${y * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * MAX_TILT}deg) rotateY(${(x - 0.5) * MAX_TILT}deg)`;
  };

  // Mouse leaves: ease back to flat.
  const handlePointerLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative overflow-hidden rounded-3xl border border-line/60 bg-surface/80 shadow-[0_24px_60px_rgb(var(--c-tint)/0.25)] transition-transform duration-200 ease-out will-change-transform"
    >
      {/* Soft light that follows the mouse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--x, 50%) var(--y, 30%), rgb(var(--c-tint) / 0.22), transparent 60%)",
        }}
      />

      {/* Top strip, like the header of a real ID badge */}
      <div className="relative flex items-center justify-between border-b border-line/50 bg-elevated/60 px-6 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{card.heading}</p>
        {/* Lanyard slot: purely decorative */}
        <span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-line/70" />
      </div>

      <div className="relative p-6 sm:p-8">
        {/* Photo + name */}
        <div className="flex items-center gap-5">
          <div className="relative h-24 w-24 shrink-0">
            {/* Slowly rotating dashed ring around the photo */}
            <span aria-hidden="true" className="absolute -inset-1.5 animate-spin-slow rounded-full border border-dashed border-soft/70" />
            <div className="relative h-full w-full overflow-hidden rounded-full border border-line/60 bg-elevated">
              {photoFailed ? (
                // Shown until you add the portrait file to /public
                <span className="flex h-full w-full items-center justify-center font-display text-3xl font-bold text-accent">
                  {SITE.initials}.
                </span>
              ) : (
                <img
                  src={HERO.portrait.src}
                  alt={HERO.portrait.alt}
                  loading="lazy"
                  onError={() => setPhotoFailed(true)}
                  className="h-full w-full object-cover object-top"
                />
              )}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{card.name}</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{card.title}</p>
          </div>
        </div>

        {/* Label / value rows */}
        <dl className="mt-8 divide-y divide-line/40 border-y border-line/40">
          {card.fields.map((field) => (
            <div key={field.label} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{field.label}</dt>
              <dd className="text-right text-ink">{field.value}</dd>
            </div>
          ))}

          {/* Availability row (hidden if SITE.status.show is false) */}
          {SITE.status.show && (
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Status</dt>
              <dd className="flex items-center gap-2 text-ink">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-soft-pulse rounded-full bg-cool motion-reduce:animate-none" />
                  <span className="relative h-2 w-2 rounded-full bg-cool" />
                </span>
                {SITE.status.label}
              </dd>
            </div>
          )}
        </dl>

        {/* Decorative barcode */}
        <div aria-hidden="true" className="mt-6 flex h-8 items-end gap-[3px] opacity-60">
          {BARS.map((width, i) => (
            <span key={i} className="h-full bg-ink" style={{ width: `${width}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
