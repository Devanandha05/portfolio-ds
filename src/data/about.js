/**
 * ABOUT DATA — edit your story, ID card fields and principles here.
 * The About section reads it; no component changes needed.
 *
 * NOTE: the paragraphs are a DRAFT written from what you told me about your
 * background. Rewrite them in your own voice. Short, specific and honest beats
 * impressive-sounding. Keep each paragraph to 2–3 sentences.
 */

export const ABOUT = {
  title: "About me",
  description: "A little about who I am and how I like to build.",

  // Story paragraphs (each string = one paragraph). Add or remove freely.
  paragraphs: [
    "I'm an analyst trainee at Cognizant with a BCA background, working with large enterprise systems by day and building web projects by night.",
    "I started with HTML, CSS and Tailwind, then went further: a full web app with Python and Flask, and now React. I learn by building real things, and I use AI tools to move faster while still understanding what I ship.",
    "I'm looking for developer roles where I can build clean, useful interfaces and grow into full-stack work.",
  ],

  // The ID card on the left. `fields` are the label / value rows.
  // The availability row is added automatically from SITE.status in config/site.js.
  card: {
    heading: "Identity card · No. 0001",
    name: "Devanandha",
    title: "Analyst · Developer · Builder",
    fields: [
      { label: "Company", value: "Cognizant" },
      { label: "Focus", value: "Frontend · Full-stack" },
      { label: "Based in", value: "India" }, // <- replace with your city if you like
      { label: "Stack", value: "React · Tailwind · Python" },
    ],
  },

  // How I work. Three short principles shown as a numbered list. Delete the list to hide it.
  principlesTitle: "How I like to build",
  principles: [
    { title: "Clean", text: "Simple structure and readable code that is easy to change later." },
    { title: "Useful", text: "Interfaces that solve a real problem before they look good." },
    { title: "Distinctive", text: "Small details and motion that make a product feel like someone made it." },
  ],

  cta: { label: "Let's talk", href: "#contact" },
};
