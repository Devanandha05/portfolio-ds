import { SITE } from "../../config/site";

/**
 * StatusBadge — the small "● Open to work" pill.
 * Text and on/off switch live in src/config/site.js.
 *
 * @param {boolean} collapse - when true, the text is hidden on very small
 *                             screens and only the pulsing dot remains.
 */
export default function StatusBadge({ collapse = false }) {
  if (!SITE.status.show) return null;

  return (
    <div
      role="status"
      className="inline-flex items-center gap-2 rounded-full border border-line/60 bg-surface/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-ink"
    >
      {/* The dot: one static circle + one ring that pulses outward */}
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-cool animate-soft-pulse motion-reduce:animate-none" />
        <span className="relative h-2 w-2 rounded-full bg-cool" />
      </span>

      <span className={collapse ? "hidden sm:inline" : ""}>{SITE.status.label}</span>
    </div>
  );
}
