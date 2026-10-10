/**
 * EXPERIENCE DATA — edit this file to add or change jobs, training, education.
 * The Experience section reads it; no component changes needed.
 * Keep the newest entry FIRST. The timeline is shown in the order you list them.
 *
 * Each entry:
 *  id          unique, lowercase, no spaces
 *  role        your job title
 *  company     employer / institution
 *  location    optional, e.g. "Chennai, India"
 *  period      text shown on the left, e.g. "2025 — Present"
 *  current     true = the dot pulses (use for your present role only)
 *  summary     1–2 sentences about the role
 *  highlights  2–4 short bullets. Best format: what you did + the result.
 *  tech        technologies used (small teal tags). Optional.
 *
 * NOTE: everything below is PLACEHOLDER text. I only know your title and company
 * from what you told me, so the dates and bullets are examples to replace.
 * Don't publish invented numbers or achievements. Keep it accurate.
 * To avoid sharing confidential client details, describe the kind of work, not the client.
 */

export const EXPERIENCE_SECTION = {
  title: "Experience",
  description: "Where I've worked and learned, and what I've built along the way.",
  resume: { label: "Download resume", href: "/resume.pdf" }, // file goes in /public. Delete this line to hide the button.
};

export const EXPERIENCE = [
  {
    id: "cognizant",
    role: "Analyst Trainee",
    company: "Cognizant",
    location: "India",
    period: "2025 — Present", // <- replace with your real dates
    current: true,
    summary: "Working on enterprise systems and learning how large teams build, test and ship software.",
    highlights: [
      "Replace with something you did, and what it achieved.",
      "Replace with a skill you picked up, or a process you improved.",
      "Replace with how you work with your team or clients.",
    ],
    tech: ["Mainframe"],
  },
  {
    id: "personal-projects",
    role: "Self-directed web development",
    company: "Personal projects",
    period: "2024 — Present", // <- replace
    summary: "Building full-stack and frontend projects to grow beyond my day-job stack.",
    highlights: [
      "Built a complete web application with Python and Flask.",
      "Designed and built this portfolio with React and Tailwind CSS.",
    ],
    tech: ["React", "Tailwind CSS", "Python", "Flask"],
  },
  {
    id: "bca",
    role: "Bachelor of Computer Applications (BCA)",
    company: "Your University / College", // <- replace
    period: "20XX — 20XX", // <- replace
    summary: "Foundations in programming, databases and web technologies.",
    highlights: ["Replace with a project, subject or result you are proud of."],
    tech: ["Java", "HTML", "CSS"],
  },
];
