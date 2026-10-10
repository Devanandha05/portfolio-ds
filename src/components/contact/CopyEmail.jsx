import { useEffect, useRef, useState } from "react";
import { SITE } from "../../config/site";

/**
 * CopyEmail — your email in large type with a "copy" button.
 * Clicking the address opens the visitor's email app; clicking "Copy" puts it on the clipboard
 * and the label changes to "Copied" for two seconds.
 */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  // Clear the timer if the component disappears mid-countdown.
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
    } catch {
      // Clipboard can be blocked (older browsers, non-https). Fall back to selecting text.
      const input = document.createElement("textarea");
      input.value = SITE.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      {/* Email with an underline that draws itself on hover */}
      <a
        href={`mailto:${SITE.email}`}
        className="break-all bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-bottom bg-no-repeat pb-1 font-display text-2xl text-ink transition-[background-size,color] duration-500 hover:bg-[length:100%_1px] hover:text-accent sm:text-3xl"
      >
        {SITE.email}
      </a>

      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-line/70 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-soft hover:text-accent"
      >
        {/* Icon swaps between "copy" and "check" */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
          {copied ? (
            <path d="M5 13l4 4L19 7" />
          ) : (
            <>
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V6a2 2 0 0 1 2-2h9" />
            </>
          )}
        </svg>
        {copied ? "Copied" : "Copy"}
      </button>

      {/* Announced to screen readers when the copy succeeds */}
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}
