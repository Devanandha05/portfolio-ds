/**
 * Certifications section.
 *
 * What it does
 *   - Shows every entry from src/data/certifications.js as a card (newest first, as listed).
 *   - Filter chips are generated from the categories in the data, so no code change is needed
 *     when you add a certification or a new category.
 *   - Shows the first SHOW_FIRST cards, with a "Show all" button if there are more.
 *   - Cards fade up (staggered) the first time the section scrolls into view.
 *
 * Styling: only semantic tokens and utilities from index.css (bg-surface, border-line, text-accent,
 * card-lift, section-space, container-page, bg-gradient-brand ...), so a theme change updates it.
 *
 * Use it:  import Certifications from "./components/Certifications";  ->  <Certifications />
 * It renders <section id="certifications">, so a nav link can point at "#certifications".
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { CERTIFICATIONS, CERT_SECTION } from "../data/certifications";

/* ====================================================================
   QUICK TWEAKS
   ==================================================================== */

// How many cards to show before the "Show all" button. Set to 99 to always show everything.
const SHOW_FIRST = 6;

// The label of the "everything" filter chip.
const ALL_LABEL = "All";

/* ====================================================================
   SMALL HELPERS
   ==================================================================== */

// Staggered entrance: element fades up after `s` seconds.
const delay = (s) => ({ animationDelay: `${s}s` });

// "2026-03" -> "Mar 2026". UTC is used so the month never shifts with the visitor's timezone.
function formatMonth(value) {
  if (!value) return "";
  const date = new Date(`${value}-01T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value; // not a valid date: show the raw text
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

// "Oracle Cloud" -> "OC" (monogram shown when a certification has no logo image)
function initialsOf(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

// Becomes true once the element is on screen (and stays true). Used to trigger the entrance animation.
function useRevealOnce() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Very old browsers: skip the effect and just show the content.
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, revealed];
}

/* ====================================================================
   ISSUER BADGE: logo image, or a monogram if there is no logo
   ==================================================================== */
function IssuerBadge({ cert }) {
  const [failed, setFailed] = useState(false);
  const showImage = cert.logo && !failed;

  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-elevated"
    >
      {showImage ? (
        <img
          src={cert.logo}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span className="font-display text-base font-bold text-accent">{initialsOf(cert.issuer)}</span>
      )}
    </div>
  );
}

/* ====================================================================
   ONE CERTIFICATION CARD
   <li> = entrance animation. <article> = the card itself (hover lift lives here,
   kept separate so the two transforms don't fight each other).
   ==================================================================== */
function CertCard({ cert, index, revealed }) {
  const inProgress = cert.status === "in-progress";

  return (
    <li className={revealed ? "animate-fade-up" : "opacity-0"} style={delay(index * 0.08)}>
      <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6">
        {/* Thin brand-gradient line along the top edge: fades in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Top row: issuer badge (left), status or date (right) */}
        <div className="flex items-start justify-between gap-4">
          <IssuerBadge cert={cert} />

          {inProgress ? (
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cool">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inset-0 animate-soft-pulse rounded-full bg-cool motion-reduce:animate-none" />
                <span className="relative h-2 w-2 rounded-full bg-cool" />
              </span>
              In progress
            </span>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {formatMonth(cert.issued)}
            </span>
          )}
        </div>

        {/* Title + issuer */}
        <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-ink">{cert.title}</h3>
        <p className="mt-1 text-sm text-muted">{cert.issuer}</p>

        {/* Small mono details: expiry and credential id (each only if provided) */}
        {(cert.expires || cert.credentialId) && (
          <dl className="mt-4 space-y-1 font-mono text-[11px] text-muted">
            {cert.expires && (
              <div className="flex gap-2">
                <dt className="uppercase tracking-wider">Valid till</dt>
                <dd className="text-ink">{formatMonth(cert.expires)}</dd>
              </div>
            )}
            {cert.credentialId && (
              <div className="flex gap-2">
                <dt className="uppercase tracking-wider">ID</dt>
                <dd className="break-all text-ink">{cert.credentialId}</dd>
              </div>
            )}
          </dl>
        )}

        {/* Skill tags */}
        {cert.skills?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {cert.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-line bg-elevated px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}

        {/* Verify link: pushed to the bottom of the card so all cards line up */}
        {cert.url && (
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify ${cert.title} (opens in a new tab)`}
            className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent transition-colors hover:text-ink"
          >
            Verify
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        )}
      </article>
    </li>
  );
}

/* ====================================================================
   THE SECTION
   ==================================================================== */
export default function Certifications() {
  const [active, setActive] = useState(ALL_LABEL); // selected filter chip
  const [expanded, setExpanded] = useState(false); // "Show all" toggle
  const [gridRef, revealed] = useRevealOnce();

  // Unique categories in the order they first appear in the data, each with a count.
  const categories = useMemo(() => {
    const counts = new Map();
    CERTIFICATIONS.forEach((cert) => counts.set(cert.category, (counts.get(cert.category) ?? 0) + 1));
    return [[ALL_LABEL, CERTIFICATIONS.length], ...counts.entries()];
  }, []);

  const filtered = active === ALL_LABEL ? CERTIFICATIONS : CERTIFICATIONS.filter((c) => c.category === active);
  const visible = expanded ? filtered : filtered.slice(0, SHOW_FIRST);

  // Split the title so the highlighted phrase gets the gradient colour.
  const [before, after] = CERT_SECTION.title.split(CERT_SECTION.highlight);
  const hasHighlight = after !== undefined;

  // Nothing to show: render nothing, so an empty data file never leaves a blank section.
  if (CERTIFICATIONS.length === 0) return null;

  return (
    <section id="certifications" className="section-space">
      <div className="container-page">
        {/* ---- Heading ---- */}
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{CERT_SECTION.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {hasHighlight ? (
              <>
                {before}
                <span className="text-gradient">{CERT_SECTION.highlight}</span>
                {after}
              </>
            ) : (
              CERT_SECTION.title
            )}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{CERT_SECTION.subtitle}</p>
        </header>

        {/* ---- Filter chips (hidden when there is only one category) ---- */}
        {categories.length > 2 && (
          <div role="group" aria-label="Filter certifications by category" className="mt-10 flex flex-wrap gap-3">
            {categories.map(([name, count]) => {
              const isActive = name === active;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActive(name);
                    setExpanded(false);
                  }}
                  className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "border-transparent bg-btn text-btn-text shadow-glow"
                      : "border-line text-muted hover:border-soft hover:text-accent"
                  }`}
                >
                  {name}
                  <span className={`ml-2 ${isActive ? "opacity-70" : "text-muted"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ---- Cards. `key` includes the filter so cards replay their entrance when it changes ---- */}
        <ul ref={gridRef} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((cert, i) => (
            <CertCard key={`${active}-${cert.id}`} cert={cert} index={i} revealed={revealed} />
          ))}
        </ul>

        {/* ---- Show all / Show less ---- */}
        {filtered.length > SHOW_FIRST && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((open) => !open)}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:border-soft hover:text-accent"
            >
              {expanded ? "Show less" : `Show all ${filtered.length}`}
              <span
                aria-hidden="true"
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : "group-hover:translate-y-1"}`}
              >
                ↓
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
