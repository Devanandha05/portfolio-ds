/**
 * Hero copy, portrait reference, and floating symbol content; symbol tones
 * use text-accent, text-cool, and decorative-only text-sun tokens in Hero.jsx.
 * Hero.jsx never contains your copy.
 */

export const HERO = {
  // Small line above the name. The pulsing dot shows only if SITE.status.show is true.
  eyebrow: "Available for opportunities",

  // Rendered in giant uppercase letters. Keep it one word so it fits on mobile.
  name: "Devanandha",
  roleLine: "Analyst @ Cognizant · Developer · Builder",

  // Intro paragraph. `introHighlight` must be an exact piece of `intro`; it gets the accent colour.
  intro:
    "I build clean, useful and visually distinctive digital experiences — from interfaces to full-stack applications.",
  introHighlight: "visually distinctive digital experiences",

  // Buttons. href "#contact" / "#work" must match section ids.
  primaryCta: { label: "Hire me", href: "#contact" },
  secondaryCta: { label: "Explore my work", href: "#work" },

  // Portrait: put your illustration in /public (transparent PNG or WebP works best).
  // If the file is missing, a placeholder monogram is shown instead.
  portrait: {
    src: "/portrait.png",
    alt: "Illustrated portrait of Devanandha",
  },

  // The little terminal card next to the portrait.
  terminal: {
    command: "whoami",
    lines: ["Devanandha S", "Analyst", "Developer", "Builder"],
  },

  /**
   * FLOATING SYMBOLS around the portrait.
   *  x, y      position inside the portrait area (percent; negatives sit outside it)
   *  depth     how far it shifts with the mouse (bigger = moves more = feels closer)
   *  duration  seconds for one float cycle;  delay = start offset in seconds
   *  tone      "accent" | "cool" | "sun"  (decorative theme colors)
   *  chip      true = small bordered box, false = plain text
   *  layer     "back" (behind portrait) or "front" (in front of it)
   *  type      "cursor" makes the mini mouse pointer with a name tag (uses `label`)
   * Add or delete lines freely.
   */
  floaters: [
    { id: "braces", text: "{ }", x: "-4%", y: "14%", depth: 26, duration: 7, delay: 0, tone: "accent", chip: true, layer: "back" },
    { id: "tag", text: "</>", x: "82%", y: "6%", depth: 34, duration: 8, delay: 1.2, tone: "cool", chip: true, layer: "front" },
    { id: "ai", text: "AI", x: "90%", y: "44%", depth: 22, duration: 6.5, delay: 0.6, tone: "sun", chip: true, layer: "front" },
    { id: "bin1", text: "01", x: "3%", y: "46%", depth: 16, duration: 9, delay: 2, tone: "cool", chip: false, layer: "back" },
    { id: "bin2", text: "10", x: "88%", y: "90%", depth: 14, duration: 10, delay: 0.3, tone: "accent", chip: false, layer: "back" },
    { id: "cursor", type: "cursor", label: "Devanandha", x: "66%", y: "76%", depth: 40, duration: 8, delay: 1, tone: "sun", layer: "front" },
  ],
};
