/**
 * Timeline entry uses a lifted surface card with line, accent, and cool tokens.
 */
import { useRef } from "react";
import Tag from "../ui/Tag";

/**
 * ExperienceItem renders a timeline entry in a bg-surface card using border-line,
 * card-lift, and token-colored status dots and technology chips.
 *
 *   desktop:  [ period ]  ●  [ role / company / summary / bullets / tags ]
 *   mobile:   ●  period above the role, everything stacked
 *
 * The vertical line is drawn per item (from its dot down to the next one), so the
 * timeline grows automatically as you add entries. `isLast` hides the final segment.
 * Micro-animations: the current role's dot pulses, the dot grows and the card
 * lights up softly on hover with a token-based surface tint.
 *
 * @param {object}  item   - one entry from src/data/experience.js
 * @param {boolean} isLast - true for the final entry (no line below it)
 */
export default function ExperienceItem({ item, isLast }) {
  const cardRef = useRef(null);
  const handlePointerMove = (e) => {
    const box = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--x", `${e.clientX - box.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - box.top}px`);
  };

  return (
    <div className="group md:grid md:grid-cols-[170px_1fr]">
      {/* Period (desktop only: on mobile it sits inside the content below) */}
      <p className="hidden pt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted md:block">{item.period}</p>

      <div className={`relative pl-8 md:pl-10 ${isLast ? "" : "pb-12"}`}>
        {/* Line down to the next dot */}
        {!isLast && (
          <span aria-hidden="true" className="absolute -bottom-1 left-7px top-6 w-px bg-linear-to-b from-line to-line/30" />
        )}

        {/* Dot: pulses if this is your current role */}
        <span aria-hidden="true" className="absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center">
          {item.current && <span className="absolute inset-0 animate-soft-pulse rounded-full bg-accent motion-reduce:animate-none" />}
          <span
            className={`relative h-3.5 w-3.5 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
              item.current ? "border-accent bg-accent" : "border-soft bg-page"
            }`}
          />
        </span>

        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 card-lift sm:p-7"
        >
          {/* Soft light that follows the mouse (only visible on hover) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-current text-tint opacity-0 transition-opacity duration-300 group-hover:opacity-10"
            style={{
              maskImage:
                "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), currentColor, transparent 60%)",
            }}
          />

          <div className="relative">
            {/* Mobile-only period */}
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted md:hidden">{item.period}</p>

            <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">{item.role}</h3>
            <p className="mt-1 text-accent">
              {item.company}
              {item.location && <span className="text-muted"> · {item.location}</span>}
            </p>

            {item.summary && <p className="mt-4 leading-relaxed text-muted">{item.summary}</p>}

            {item.highlights?.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-ink/85">
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-soft" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {item.tech?.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                {item.tech.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
