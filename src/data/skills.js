/**
 * SKILLS DATA — edit this file to add, remove or re-level skills.
 * The Skills section reads it; no component changes needed.
 * Give each skill a tone: frontend rose, backend peach, tools teal, other gold.
 * Tone class combinations live in src/config/tones.js; include a tone when adding a skill.
 *
 * NOTE: the skills and levels below are my best guess from what you told me about
 * your background. Adjust them so they are honest. Recruiters respect an accurate
 * "Learning" more than an inflated "Strong".
 *
 * Each skill:   { name: "React", level: "learning", tone: "rose" }
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
      { name: "HTML", level: "strong", tone: "rose" },
      { name: "CSS", level: "strong", tone: "rose" },
      { name: "Tailwind CSS", level: "comfortable", tone: "rose" },
      { name: "React", level: "learning", tone: "rose" },
    ],
  },
  {
    title: "Backend & web apps",
    blurb: "Full-stack applications, from routes to data.",
    skills: [
      { name: "Python", level: "comfortable", tone: "peach" },
      { name: "Flask", level: "learning", tone: "peach" },
      { name: "Java", level: "comfortable", tone: "peach" },
    ],
  },
  {
    title: "Enterprise & mainframe",
    blurb: "Day-job experience with large, long-running business systems.",
    skills: [{ name: "Mainframe", level: "comfortable", tone: "gold" }],
  },
  {
    title: "Tools & workflow",
    blurb: "How I build, ship and speed things up.",
    skills: [
      { name: "Git", level: "comfortable", tone: "teal" },
      { name: "Vite", level: "comfortable", tone: "teal" },
      { name: "AI-assisted development", level: "comfortable", tone: "teal" },
    ],
  },
];