/**
 * Section title block with a cool mono label, ink heading, and accented final
 * word; uses text-cool, text-ink, and text-accent tokens.
 *
 *   <SectionHeading id="work" title="Selected work" description="..." />
 *
 * `id` is the section id from NAV_ITEMS. The small "01 — Work" label is built
 * from it automatically, so it always matches the navbar numbering.
 */
import { SITE, NAV_ITEMS } from "../../config/site";

export default function SectionHeading({ id, title, description, descriptionClassName = "text-muted" }) {
  const position = NAV_ITEMS.findIndex((item) => item.id === id);
  const item = NAV_ITEMS[position];

  const number = SITE.showNumbers && position >= 0 ? `${String(position + 1).padStart(2, "0")} — ` : "";
  const highlightAt = title.lastIndexOf(" ");
  const titleLead = highlightAt < 0 ? "" : title.slice(0, highlightAt + 1);
  const titleHighlight = highlightAt < 0 ? title : title.slice(highlightAt + 1);

  return (
    <header className="mb-10 lg:mb-14">
      {/* Thin gradient hairline: accent fading into the border colour */}
      <div aria-hidden="true" className="mb-8 h-px bg-linear-to-r from-accent/60 via-line/60 to-transparent" />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="w-fit rounded bg-page px-1.5 py-0.5 font-mono text-xs uppercase tracking-[0.2em] text-cool">
            {number}
            {item?.label}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {titleLead}
            <span className="text-accent">{titleHighlight}</span>
          </h2>
        </div>
        {description && <p className={`max-w-md leading-relaxed ${descriptionClassName}`}>{description}</p>}
      </div>
    </header>
  );
}
