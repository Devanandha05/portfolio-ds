import { useState } from "react";
import { SITE } from "../../config/site";
import { CONTACT } from "../../data/contact";

/**
 * ContactForm — name, email, message.
 *
 * Sending (see src/data/contact.js):
 *  - formEndpoint set   → posts to that service and shows a success / error message here.
 *  - formEndpoint empty → opens the visitor's email app with the message pre-filled.
 *
 * Spam protection: a hidden "website" field that people never see. Bots fill it in,
 * and if it has anything in it we pretend to succeed without sending.
 */

const { form } = CONTACT;

// Shared look for the three inputs.
const fieldClass =
  "mt-2 w-full rounded-xl border border-line/60 bg-page/60 px-4 py-3 text-ink placeholder:text-muted/60 transition-colors duration-300 hover:border-soft focus:border-accent focus:outline-none focus-visible:outline-none";
const labelClass = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted";

export default function ContactForm() {
  // "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    // Bot trap: real visitors never see this field.
    if (data.get("website")) {
      setStatus("success");
      return;
    }

    // ---- No form service set up: open the visitor's email app instead ----
    if (!CONTACT.formEndpoint) {
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(form.fallbackSubject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    // ---- Form service: send in the background ----
    setStatus("sending");
    try {
      const response = await fetch(CONTACT.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Request failed");
      formEl.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line/60 bg-surface/70 p-6 shadow-[0_24px_60px_rgb(var(--c-tint)/0.18)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>{form.nameLabel}</span>
          <input type="text" name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block">
          <span className={labelClass}>{form.emailLabel}</span>
          <input type="email" name="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>

      <label className="mt-5 block">
        <span className={labelClass}>{form.messageLabel}</span>
        <textarea name="message" required rows={5} placeholder={form.messagePlaceholder} className={`${fieldClass} resize-y`} />
      </label>

      {/* Hidden bot trap (off-screen, skipped by keyboard and screen readers) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center gap-2 rounded-full bg-btn px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_8px_24px_rgb(var(--c-btn)/0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgb(var(--c-btn)/0.5)] active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {sending ? form.sendingLabel : form.submitLabel}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

        {/* Result message: announced to screen readers automatically */}
        <p role="status" className={`text-sm ${status === "error" ? "text-btn" : "text-cool"}`}>
          {status === "success" && form.successMessage}
          {status === "error" && form.errorMessage}
        </p>
      </div>
    </form>
  );
}
