/**
 * Contact section combines the elevated aurora surface, accent links, and form.
 */
import { SITE } from "../config/site";
import { CONTACT } from "../data/contact";
import { SOCIALS } from "../data/socials";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import CopyEmail from "../components/contact/CopyEmail";
import ContactForm from "../components/contact/ContactForm";

/**
 * Contact form and links on an aurora-tinted elevated section surface.
 *
 *   left:  headline → email (click to write, or copy) → social links → availability
 *   right: message form
 *
 * Words live in src/data/contact.js, your email in src/config/site.js,
 * social links in src/data/socials.js.
 */
export default function Contact() {
  return (
    <section id="contact" className="section-space relative overflow-hidden border-t border-line bg-elevated/40 bg-aurora">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="contact" title={CONTACT.title} description={CONTACT.description} descriptionClassName="text-ink" />
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------- LEFT ---------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
                {CONTACT.headline}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink">{CONTACT.text}</p>
            </Reveal>

            <Reveal delay={100} className="mt-8">
              <CopyEmail />
              {CONTACT.note && <p className="mt-3 text-sm text-ink">{CONTACT.note}</p>}
            </Reveal>

            <Reveal delay={200} className="mt-8 flex flex-col gap-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative inline-flex items-center gap-1 text-sm font-semibold text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-brand after:transition-transform hover:after:scale-x-100"
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
                <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
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
