/**
 * App composes the portfolio sections; the skip link uses the shared button
 * fill/text tokens for a readable keyboard focus state.
 */
import Navbar from "./components/Navbar/Navbar";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Skills from "./sections/Skills";
import Footer from "./components/layout/Footer";
import Experience from "./sections/Experience";
import Certifications from "./sections/Certifications";
import About from "./sections/About";
import Contact from "./sections/Contact";

/**
 * APP — the page, top to bottom.
 * TO REORDER sections: move the lines inside <main>.
 * TO REMOVE a section: delete its line here AND its entry in NAV_ITEMS
 *   (src/config/site.js) so the menu doesn't link to nothing.
 * TO ADD a section: create src/sections/NewThing.jsx with <section id="newthing">,
 *   add it below, and add { id: "newthing", label: "New thing" } to NAV_ITEMS.
 *
 * Each section's id must match its NAV_ITEMS id (Hero uses id="home").
 */
export default function App() {
  return (
    <>
      {/* Accessibility: lets keyboard users skip the navbar. Visible only when focused. */}
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-md focus:bg-btn focus:px-4 focus:py-2 focus:text-btn-text"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <Work />
        <Skills />
        <Experience />
        <Certifications />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
