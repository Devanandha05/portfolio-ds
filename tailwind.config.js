/**
 * TAILWIND CONFIG (Tailwind v3 syntax)
 * If your project uses CommonJS, change `export default` to `module.exports =`.
 *
 * Colours are NOT written here. They point at the CSS variables in
 * src/styles/theme.css, so changing the theme never needs a rebuild of this file.
 * Usage in components:  bg-page  text-ink  text-muted  border-line  text-accent ...
 */

// Helper: turns "page" into rgb(var(--c-page) / <alpha-value>)
const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class", // dark mode is switched by adding class="dark" to <html>

  theme: {
    extend: {
      colors: {
        page: c("page"),
        surface: c("surface"),
        elevated: c("elevated"),
        line: c("line"),
        ink: c("ink"),
        muted: c("muted"),
        accent: c("accent"),
        btn: c("btn"),
        soft: c("soft"),
        tint: c("tint"),
        cool: c("cool"),
      },

      // Load these in index.html from Google Fonts (or swap for your own).
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"], // logo + big headings
        sans: ['"DM Sans"', "system-ui", "sans-serif"],                // body text
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],       // small numbers/labels
      },

      // ---- Animations (used as animate-<name>) ----
      keyframes: {
        // Gentle pulse used by the "Open to work" dot.
        "soft-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "70%, 100%": { transform: "scale(2.6)", opacity: "0" },
        },
        // Idle floating (portrait, symbols). Duration can be overridden per element.
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Entrance: rise a little while fading in.
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
        // Terminal caret blink.
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "soft-pulse": "soft-pulse 2.6s ease-out infinite",
        float: "float 6s ease-in-out infinite",
        // `both` = stay hidden during the delay, stay visible after
        "fade-up": "fade-up 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        blink: "blink 1s steps(1) infinite",
        "spin-slow": "spin 40s linear infinite", // slow rotating ring
      },
    },
  },
  plugins: [],
};
