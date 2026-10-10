/**
 * Experience section uses an elevated surface and token-styled timeline cards.
 */
import { EXPERIENCE, EXPERIENCE_SECTION } from "../data/experience";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import ExperienceItem from "../components/experience/ExperienceItem";

/**
 * Experience timeline on an elevated section surface, using tokenized cards and headings.
 *
 * Content comes from src/data/experience.js. This file only handles layout:
 *   heading → vertical timeline (one card per entry) → optional resume button.
 */
export default function Experience() {
  const { resume } = EXPERIENCE_SECTION;

  return (
    <section id="experience" className="section-space bg-elevated/40">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="experience" title={EXPERIENCE_SECTION.title} description={EXPERIENCE_SECTION.description} />
        </Reveal>

        {/* Each entry fades in as you scroll to it */}
        <ol>
          {EXPERIENCE.map((item, i) => (
            <Reveal as="li" key={item.id} delay={Math.min(i, 2) * 100}>
              <ExperienceItem item={item} isLast={i === EXPERIENCE.length - 1} />
            </Reveal>
          ))}
        </ol>

        {/* Resume button (hidden if `resume` is removed from experience.js) */}
        {resume && (
          <Reveal className="mt-12 flex justify-center">
            <a
              href={resume.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:border-soft hover:text-accent"
            >
              {resume.label}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
