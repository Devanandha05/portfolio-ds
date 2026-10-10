/**
 * SITE CONFIG — the one file you edit for everyday changes.
 * Nothing in the components below is hard-coded; they all read from here.
 */

export const SITE = {
  initials: "DS",                    // Logo mark. A "." is added automatically in the accent colour.
  roleLine: "Developer / Analyst",   // Tiny line under the logo (hides when you scroll).
  email: "sdvanandha@gmail.com",          // Shown at the bottom of the mobile menu.

  // The small availability pill. Set show:false when you are not job hunting.
  status: {
    show: true,
    label: "Open to work",           // Alternative: "Available for opportunities"
  },

  // Set to false to hide the 01 / 02 / 03 numbers in the nav.
  showNumbers: true,
};

/**
 * NAV ITEMS
 * - `id`    must match the id of the <section> on your page (e.g. <section id="work">)
 * - `label` is the text shown in the menu
 * Add / remove / reorder items here and the navbar, the mobile menu,
 * the numbering and the active-section tracking all update on their own.
 */
export const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
