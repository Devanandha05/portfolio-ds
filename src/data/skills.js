/**
 * SKILLS DATA — edit this file to add, remove or re-level skills.
 * The Skills section reads it; no component changes needed.
 *
 * NOTE: the skills and levels below are my best guess from what you told me about
 * your background. Adjust them so they are honest. Recruiters respect an accurate
 * "Learning" more than an inflated "Strong".
 *
 * Each skill:   { name: "React", level: "learning" }
 * Levels:       "learning" | "comfortable" | "strong"   (defined in LEVELS below)
 *
 * To add a group, copy one { title, blurb, skills } block.
 */

// The three levels. Change the labels or the dot counts here and everything updates
// (cards, legend). `dots` is how many of the 3 dots are filled.
export const LEVELS = {
  learning: { label: "Learning", dots: 1 },
  comfortable: { label: "Comfortable", dots: 2 },
  strong: { label: "Strong", dots: 3 },
};

export const SKILLS_SECTION = {
  title: "Skills & tools",
  description: "What I work with day to day, and what I'm still growing into.",
  exploringLabel: "Currently exploring",
  exploring: ["TypeScript", "AI-assisted development"], // small tags under the grid; delete the list to hide the strip
};

export const SKILL_GROUPS = [
  {
    title: "Frontend",
    blurb: "Interfaces that are clean, responsive and easy to read.",
    skills: [
      { name: "HTML", level: "strong" },
      { name: "CSS", level: "strong" },
      { name: "Tailwind CSS", level: "comfortable" },
      { name: "React", level: "learning" },
    ],
  },
  {
    title: "Backend & web apps",
    blurb: "Full-stack applications, from routes to data.",
    skills: [
      { name: "Python", level: "comfortable" },
      { name: "Flask", level: "learning" },
      { name: "Java", level: "comfortable" },
    ],
  },
  {
    title: "Enterprise & mainframe",
    blurb: "Day-job experience with large, long-running business systems.",
    skills: [{ name: "Mainframe", level: "comfortable" }],
  },
  {
    title: "Tools & workflow",
    blurb: "How I build, ship and speed things up.",
    skills: [
      { name: "Git", level: "comfortable" },
      { name: "Vite", level: "comfortable" },
      { name: "AI-assisted development", level: "comfortable" },
    ],
  },
];