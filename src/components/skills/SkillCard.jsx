import { useRef } from "react";
import { LEVELS } from "../../data/skills";

/**
 * SkillDots — three small dots showing a skill level (filled = reached).
 * The number of filled dots comes from LEVELS in src/data/skills.js.
 * Screen readers get a text description instead of the dots.
 */
function SkillDots({ level }) {
  const info = LEVELS[level] ?? LEVELS.learning;
  const total = 3;

  return (
    <span role="img" aria-label={`${info.label}: ${info.dots} of ${total}`} className="flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
            i < info.dots
              ? "bg-accent group-hover/row:scale-125 group-hover/row:shadow-[0_0_8px_rgb(var(--c-soft))]"
              : "border border-line"
          }`}
        />
      ))}
    </span>
  );
}

/**
 * SkillCard — one group of skills (e.g. "Frontend").
 *
 * Micro-animations: card lifts on hover, a soft light follows the mouse inside it
 * (same effect as the project cards), and a skill's dots glow when you hover its row.
 *
 * @param {object} group - one entry from SKILL_GROUPS in src/data/skills.js
 * @param {number} index - position in the list (used for the 01, 02... number)
 */
export default function SkillCard({ group, index }) {
  const cardRef = useRef(null);
  const number = String(index + 1).padStart(2, "0");

  // Mouse-follow light: store the pointer position as CSS variables on the card.
  const handlePointerMove = (e) => {
    const box = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--x", `${e.clientX - box.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - box.top}px`);
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/60 bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-soft hover:shadow-[0_18px_50px_rgb(var(--c-tint)/0.25)] sm:p-8"
    >
      {/* Soft light that follows the mouse (only visible on hover) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), rgb(var(--c-tint) / 0.18), transparent 60%)",
        }}
      />

      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{number}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">{group.title}</h3>
        {group.blurb && <p className="mt-2 leading-relaxed text-muted">{group.blurb}</p>}

        <ul className="mt-6">
          {group.skills.map((skill) => (
            <li
              key={skill.name}
              className="group/row flex items-center justify-between gap-4 border-b border-line/40 py-3 last:border-b-0"
            >
              <span className="text-ink">{skill.name}</span>
              <span className="flex items-center gap-3">
                {/* Level word shows on hover (desktop); the dots are always visible */}
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted opacity-0 transition-opacity duration-300 group-hover/row:opacity-100">
                  {LEVELS[skill.level]?.label}
                </span>
                <SkillDots level={skill.level} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
