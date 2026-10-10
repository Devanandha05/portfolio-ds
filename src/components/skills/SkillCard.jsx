/**
 * Skill group card renders tone-mapped chips and level dots on a lifted surface.
 */
import { useRef } from "react";
import { LEVELS } from "../../data/skills";
import Tag from "../ui/Tag";

/**
 * SkillCard renders token-colored skill chips and accent level dots in a lifted
 * surface card, using bg-surface, border-line, card-lift and tone classes.
 *
 * SkillDots uses accent tokens to show a skill level (filled = reached).
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
              ? "bg-accent group-hover/row:scale-125 group-hover/row:shadow-glow"
              : "border border-line"
          }`}
        />
      ))}
    </span>
  );
}

/**
 * SkillCard renders a group of tagged skills in a token-themed lifted card.
 *
 * Micro-animations: card lifts on hover with a soft token tint, and skill dots
 * glow when you hover a row.
 *
 * @param {object} group - one entry from SKILL_GROUPS in src/data/skills.js
 * @param {number} index - position in the list (used for the 01, 02... number)
 */
export default function SkillCard({ group, index }) {
  const cardRef = useRef(null);
  const number = String(index + 1).padStart(2, "0");
  const handlePointerMove = (e) => {
    const box = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--x", `${e.clientX - box.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - box.top}px`);
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 card-lift sm:p-8"
    >
      {/* Soft light that follows the mouse (only visible on hover) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-current text-tint opacity-0 transition-opacity duration-300 group-hover:opacity-10"
        style={{
          maskImage:
            "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), currentColor, transparent 60%)",
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
              <Tag tone={skill.tone}>{skill.name}</Tag>
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
