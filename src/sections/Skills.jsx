import { SKILL_GROUPS, SKILLS_SECTION, LEVELS } from "../data/skills";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import Tag from "../components/ui/Tag";
import SkillCard from "../components/skills/SkillCard";

/**
 * SKILLS — id="skills" (matches the navbar item).
 *
 * Content comes from src/data/skills.js. This file only handles layout:
 *   heading → small legend → grid of skill-group cards → "currently exploring" strip.
 */
export default function Skills() {
  const exploring = SKILLS_SECTION.exploring ?? [];

  return (
    <section id="skills" className="section-space">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="skills" title={SKILLS_SECTION.title} description={SKILLS_SECTION.description} />
        </Reveal>

        {/* ---------- Legend: what the dots mean ---------- */}
        <Reveal delay={100}>
          <ul aria-label="Skill levels" className="mb-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted">
            {Object.entries(LEVELS).map(([key, level]) => (
              <li key={key} className="flex items-center gap-2">
                <span aria-hidden="true" className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className={`h-1.5 w-1.5 rounded-full ${i < level.dots ? "bg-accent" : "border border-line"}`} />
                  ))}
                </span>
                {level.label}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---------- Skill group cards ---------- */}
        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={Math.min(i, 3) * 100}>
              <SkillCard group={group} index={i} />
            </Reveal>
          ))}
        </div>

        {/* ---------- Currently exploring (hidden if the list is empty) ---------- */}
        {exploring.length > 0 && (
          <Reveal className="mt-10 flex flex-wrap items-center gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{SKILLS_SECTION.exploringLabel}</p>
            <ul className="flex flex-wrap gap-2">
              {exploring.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
