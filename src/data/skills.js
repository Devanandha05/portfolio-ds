/**
 * SKILLS DATA — edit this file to add, remove or re-level skills.
 * The Skills section reads it; no component changes needed.
 * Give each skill a tone: frontend rose, backend peach, tools teal, other gold.
 * Tone class combinations live in src/config/tones.js; include a tone when adding a skill.
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
      { name: "HTML5", level: "strong", tone: "rose" },
      { name: "CSS", level: "strong", tone: "rose" },
      { name: "Tailwind CSS", level: "comfortable", tone: "rose" },
      { name: "React", level: "learning", tone: "rose" },
    ],
  },
  {
    title: "Backend & web apps",
    blurb: "Full-stack applications, from routes to data.",
    skills: [
      { name: "Python", level: "comfortable", tone: "gold" },
      { name: "Flask", level: "learning", tone: "gold" },
      { name: "Java", level: "comfortable", tone: "gold" },
      { name: "C++", level: "strong", tone: "gold" },
    ],
  },
  {
    title: "Databases",
    blurb: "Data storage and retrieval, from relational to NoSQL.",
    skills: [
      { name: "MySQL", level: "comfortable", tone: "teal" },
      { name: "MongoDB", level: "learning", tone: "teal" },
      { name: "DB2", level: "comfortable", tone: "teal" },
    ],
  },

  {
    title: "Enterprise & mainframe",
    blurb: "Day-job experience with large, long-running business systems.",
    skills: [
      { name: "JCL", level: "strong", tone: "peach" },
      { name: "COBOL", level: "comfortable", tone: "peach" },
      { name: "DB2", level: "comfortable", tone: "peach"},
    ],
  },
  {
    title: "Tools & workflow",
    blurb: "How I build, ship and speed things up.",
    skills: [
      { name: "Git", level: "comfortable", tone: "teal" },
      { name: "Claude Code", level: "comfortable", tone: "teal" },
    ],
  },
];