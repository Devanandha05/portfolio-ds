/**
 * Footer renders navigation and contact links on the surface token with a
 * border-line divider and accent link treatments.
 */
import { SITE, NAV_ITEMS } from "../../config/site";
import { HERO } from "../../data/hero";
import { SOCIALS, FOOTER } from "../../data/socials";
import Reveal from "../ui/Reveal";
import StatusBadge from "../Navbar/StatusBadge";

/**
 * Footer uses a surface background, line divider, ink/muted text, and accent
 * links for navigation and contact details.
 *
 *  [ DS.  tagline + status ]   [ Navigate ]   [ Connect: email + socials ]
 *  ─────────────────────────────────────────────────────────────────────
 *  © 2026 Devanandha · Built with ...                      [ Back to top ↑ ]
 *
 * Nothing is hard-coded here:
 *  - menu links come from NAV_ITEMS      (src/config/site.js)
 *  - email and initials come from SITE   (src/config/site.js)
 *  - social links and text come from     (src/data/socials.js)
 *  - your name comes from HERO.name      (src/data/hero.js)
 */

// Small heading used above each footer column.
const columnHeading = "font-mono text-[11px] uppercase tracking-[0.2em] text-muted";

// Shows "2026" in the first year and "2026–2028" afterwards.
const currentYear = new Date().getFullYear();
const years = currentYear > FOOTER.startYear ? `${FOOTER.startYear}–${currentYear}` : `${FOOTER.startYear}`;

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      {/* Thin hairline that fades in from both sides */}
      <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container-page py-16 lg:py-20">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-12">
            {/* ---------- Column 1: mark + tagline + availability ---------- */}
            <div className="md:col-span-5">
              <a href="#home" aria-label="Back to top" className="inline-block font-display text-5xl font-bold tracking-tight text-ink">
                {SITE.initials}
                <span className="text-accent">.</span>
              </a>
              <p className="mt-4 max-w-xs leading-relaxed text-muted">{FOOTER.tagline}</p>
              <div className="mt-6">
                <StatusBadge />
              </div>
            </div>

            {/* ---------- Column 2: page links ---------- */}
            <nav aria-label="Footer" className="md:col-span-3">
              <h2 className={columnHeading}>Navigate</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="group relative inline-flex items-baseline gap-2 text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-brand after:transition-transform hover:after:scale-x-100">
                      {SITE.showNumbers && (
                        <span className="font-mono text-[10px] text-muted transition-colors group-hover:text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                      {/* Text slides right a little on hover */}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ---------- Column 3: email + socials ---------- */}
            <div className="md:col-span-4">
              <h2 className={columnHeading}>Connect</h2>

              {/* Email with an underline that draws itself on hover */}
              <a
                href={`mailto:${SITE.email}`}
                className="relative mt-5 inline-block break-all pb-1 font-display text-2xl text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-brand after:transition-transform hover:after:scale-x-100 sm:text-3xl"
              >
                {SITE.email}
              </a>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link relative inline-flex items-center gap-1 text-sm font-semibold text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-brand after:transition-transform hover:after:scale-x-100"
                    >
                      {social.label}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ---------- Bottom row ---------- */}
        <div className="mt-14 flex flex-col gap-6 border-t border-line/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            © {years} {HERO.name}
            <span aria-hidden="true" className="mx-2 text-line">
              ·
            </span>
            {FOOTER.builtWith}
          </p>

          {/* Back to top: arrow lifts on hover */}
          <a
            href="#home"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-line/70 px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-soft hover:text-accent sm:self-auto"
          >
            Back to top
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
