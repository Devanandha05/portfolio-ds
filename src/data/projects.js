/**
 * PROJECTS DATA — to add a project, copy one block below, paste it in the list
 * and edit the text. The Work section updates by itself (cards, numbering, filters).
 * Project tone selects the token-based chip style in src/config/tones.js:
 * frontend projects use rose; full-stack/backend projects use peach.
 *
 * Fields:
 *  id          unique, lowercase, no spaces (e.g. "weather-app")
 *  title       project name
 *  category    one word/phrase; the filter buttons are built from these automatically
 *  year        shown in the small label above the title
 *  featured    true = wide card spanning the full width (use for your best 1–2 projects)
 *  description 2–3 sentences: what it does + what YOU built
 *  tone        chip tone used by the project's technology tags
 *  tech        list of technologies shown as themed tags
 *  image       optional screenshot in /public/projects/ (16:10 ratio looks best).
 *              Leave it out (or let it fail) and a neat placeholder card is shown.
 *  links       any number of { label, href } buttons (live site, source code, case study...)
 *
 * NOTE: everything below is PLACEHOLDER text. Replace it with your real projects.
 */

export const WORK_SECTION = {
  title: "Selected work",
  description: "A few things I've designed and built — from interface details to full-stack applications.",
  moreLink: { label: "More on GitHub", href: "https://github.com/devanandha05" },
};

export const PROJECTS = [
  {
    id: "project-one",
    title: "Your Featured Project",
    category: "Full-stack",
    tone: "peach",
    year: "2026",
    featured: true,
    description:
      "Replace this with two or three sentences: what the project does, who it is for, and the parts you personally built.",
    tech: ["React", "Tailwind CSS", "Python", "Flask"],
    image: "/projects/project-one.png",
    links: [
      { label: "Live site", href: "https://example.com" },
      { label: "Source code", href: "https://github.com/devanandha05/project-one" },
    ],
  },
  {
    id: "project-two",
    title: "Custom Font Creator",
    category: "Frontend",
    tone: "rose",
    year: "2025",
    description: "Custom font creator using HTML CSS and JavaScript. Lets users to draw characters and download font as zip file (png files)",
    tech: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "Source code", href: "https://github.com/Devanandha05/customfont-creator" },
            { label: "Live site", href: "https://devanandha05.github.io/customfont-creator/" }
    ],
  },
  {
    id: "project-three",
    title: "Indian Tourism Guide",
    category: "Full-stack",
    tone: "peach",
    year: "2023",
    description: "A web application that provides information about tourist destinations in India, including attractions, accommodations, and live Weather information.",
    tech: ["PHP", "HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    links: [{ label: "Source code", href: "https://github.com/Devanandha05/tourism-guide-project" }],
  },
  {
    id: "project-four",
    title: "Ecodo",
    category: "Full-stack",
    tone: "peach",
    year: "2024",
    description: "A sustainability optimized web application that helps users make eco-friendly choices in their daily lives.",
    tech: ["React.js", "MongoDB", "Python Flask"],
    links: [{ label: "Source code", href: "https://github.com/Devanandha05/Ecodo" }],
  },
];
