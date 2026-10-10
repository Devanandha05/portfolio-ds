import { useRef, useState } from "react";
import Tag from "../ui/Tag";

/**
 * ProjectCard — one project in the Work grid.
 *
 * Normal card: image on top, text below.
 * Featured card (project.featured = true): wide, image left and text right on desktop.
 *
 * Micro-animations: card lifts on hover, a soft light follows the mouse inside it,
 * the image zooms slowly, and link arrows nudge.
 *
 * @param {object} project - one entry from src/data/projects.js
 * @param {number} index   - position in the full list (used for the 01, 02... number)
 */
export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [imageFailed, setImageFailed] = useState(false);

  const number = String(index + 1).padStart(2, "0");
  const showImage = project.image && !imageFailed;
  const featured = Boolean(project.featured);

  // Mouse-follow light: store the pointer position as CSS variables on the card.
  // (Set directly on the element, so React doesn't re-render while the mouse moves.)
  const handlePointerMove = (e) => {
    const box = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--x", `${e.clientX - box.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - box.top}px`);
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/60 bg-surface/70 transition-all duration-300 hover:-translate-y-1 hover:border-soft hover:shadow-[0_18px_50px_rgb(var(--c-tint)/0.25)] ${
        featured ? "md:flex-row" : ""
      }`}
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

      {/* ---------- Image / placeholder ---------- */}
      <div
        className={`relative aspect-16/10 overflow-hidden bg-elevated ${
          featured ? "md:aspect-auto md:w-1/2" : ""
        }`}
      >
        {showImage ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // Placeholder used when a project has no screenshot yet
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-tint/30 via-elevated to-surface transition-transform duration-700 group-hover:scale-105">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(var(--c-line) / 0.4) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--c-line) / 0.4) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <span className="relative font-display text-7xl font-bold text-accent/30">{number}</span>
          </div>
        )}

        {featured && (
          // Glass is used only here, as a small accent
          <span className="absolute left-3 top-3 rounded-full border border-line/60 bg-surface/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      {/* ---------- Text ---------- */}
      <div className={`relative flex flex-1 flex-col p-6 sm:p-8 ${featured ? "md:w-1/2 md:justify-center" : ""}`}>
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">{number}</span>
          <span aria-hidden="true">·</span>
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </p>

        <h3
          className={`mt-3 font-display font-semibold tracking-tight text-ink ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {project.title}
        </h3>

        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tech.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>

        {/* Links (live site, source code...) pushed to the bottom of the card */}
        {project.links?.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-accent"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
