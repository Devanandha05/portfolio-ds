import { SITE } from "../config/site";
import { CONTACT } from "../data/contact";
import { SOCIALS } from "../data/socials";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import CopyEmail from "../components/contact/CopyEmail";
import ContactForm from "../components/contact/ContactForm";

/**
 * CONTACT — id="contact" (matches the navbar item).
 *
 *   left:  headline → email (click to write, or copy) → social links → availability
 *   right: message form
 *
 * Words live in src/data/contact.js, your email in src/config/site.js,
 * social links in src/data/socials.js.
 */
export default function Contact() {
  return (
    <section id="contact" className="section-space relative overflow-hidden">
      {/* Soft colour glow behind the section (decorative) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(var(--c-tint) / 0.25), transparent)" }}
      />

      <div className="container-page">
        <Reveal>
          <SectionHeading id="contact" title={CONTACT.title} description={CONTACT.description} />
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------- LEFT ---------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
                {CONTACT.headline}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{CONTACT.text}</p>
            </Reveal>

            <Reveal delay={100} className="mt-8">
              <CopyEmail />
              {CONTACT.note && <p className="mt-3 text-sm text-muted">{CONTACT.note}</p>}
            </Reveal>

            <Reveal delay={200} className="mt-8 flex flex-col gap-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-accent"
                    >
                      {social.label}
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Availability (hidden if SITE.status.show is false) */}
              {SITE.status.show && (
                <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  <span aria-hidden="true" className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-soft-pulse rounded-full bg-cool motion-reduce:animate-none" />
                    <span className="relative h-2 w-2 rounded-full bg-cool" />
                  </span>
                  {SITE.status.label}
                </p>
              )}
            </Reveal>
          </div>

          {/* ---------- RIGHT: form ---------- */}
          <Reveal delay={150} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
