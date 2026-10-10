/**
 * Work section applies the elevated section rhythm and renders token-themed
 * project cards and category controls.
 */
import { useState } from "react";
import { PROJECTS, WORK_SECTION } from "../data/projects";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import ProjectCard from "../components/work/ProjectCard";

/**
 * Work section with elevated rhythm, a tokenized category filter, and project cards.
 *
 * Content comes from src/data/projects.js. This file only handles layout and the
 * category filter. Filter buttons are generated from the categories you use,
 * so adding a project with a new category adds a new button automatically.
 */

const ALL = "All";
// Unique categories in the order they first appear: ["All", "Full-stack", "Frontend", ...]
const CATEGORIES = [ALL, ...new Set(PROJECTS.map((project) => project.category))];

export default function Work() {
  const [filter, setFilter] = useState(ALL);

  const visibleProjects = filter === ALL ? PROJECTS : PROJECTS.filter((project) => project.category === filter);

  return (
    <section id="work" className="section-space bg-elevated/40">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="work" title={WORK_SECTION.title} description={WORK_SECTION.description} />
        </Reveal>

        {/* ---------- Category filter (hidden if there is only one category) ---------- */}
        {CATEGORIES.length > 2 && (
          <Reveal delay={100}>
            <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const selected = filter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    aria-pressed={selected}
                    className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                      selected
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-line/60 text-muted hover:border-soft hover:text-ink"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* ---------- Project grid ----------
            The key includes the filter, so cards re-mount and replay their
            entrance animation whenever a different filter is chosen. */}
        <div className="grid gap-6 md:grid-cols-2">
          {visibleProjects.map((project, i) => (
            <Reveal
              key={`${filter}-${project.id}`}
              delay={Math.min(i, 3) * 100} // stagger, capped so late cards don't wait long
              className={project.featured ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} index={PROJECTS.findIndex((p) => p.id === project.id)} />
            </Reveal>
          ))}
        </div>

        {/* ---------- Link to everything else ---------- */}
        <Reveal className="mt-12 flex justify-center">
          <a
            href={WORK_SECTION.moreLink.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:border-soft hover:text-accent"
          >
            {WORK_SECTION.moreLink.label}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
