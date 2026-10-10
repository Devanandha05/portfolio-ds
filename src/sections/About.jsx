import { ABOUT } from "../data/about";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import IdCard from "../components/about/IdCard";

/**
 * ABOUT — id="about" (matches the navbar item).
 *
 * Content comes from src/data/about.js. This file only handles layout:
 *   left:  the ID card (stays in view while you read, on large screens)
 *   right: your story → three principles → "Let's talk" button
 */
export default function About() {
  const principles = ABOUT.principles ?? [];

  return (
    <section id="about" className="section-space">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="about" title={ABOUT.title} description={ABOUT.description} />
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------- LEFT: ID card ---------- */}
          <Reveal className="mx-auto w-full max-w-md lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none">
            <IdCard />
          </Reveal>

          {/* ---------- RIGHT: story ---------- */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-5 text-lg leading-relaxed text-ink/80">
              {ABOUT.paragraphs.map((text, i) => (
                <Reveal key={i} delay={i * 100}>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>

            {/* Principles (hidden if the list is empty) */}
            {principles.length > 0 && (
              <Reveal className="mt-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{ABOUT.principlesTitle}</p>
                <ol className="mt-4 border-t border-line/50">
                  {principles.map((item, i) => (
                    <li
                      key={item.title}
                      className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-y-1 border-b border-line/50 py-5 transition-colors duration-300 hover:border-soft sm:grid-cols-[2.5rem_9rem_1fr]"
                    >
                      <span className="font-mono text-xs text-soft transition-colors group-hover:text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Title nudges right on hover */}
                      <span className="font-display text-xl font-semibold text-ink transition-transform duration-300 group-hover:translate-x-1">
                        {item.title}
                      </span>
                      <span className="col-start-2 text-muted sm:col-start-auto">{item.text}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            {ABOUT.cta && (
              <Reveal className="mt-10">
                <a
                  href={ABOUT.cta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_8px_24px_rgb(var(--c-btn)/0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgb(var(--c-btn)/0.5)] active:translate-y-0"
                >
                  {ABOUT.cta.label}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
