import Navbar from "./components/Navbar/Navbar";

/**
 * EXAMPLE APP — shows how the navbar connects to your page.
 *
 * Rule: every <section> id must match an `id` in NAV_ITEMS (src/config/site.js).
 * The first section uses id="home" (the logo links to it); it is NOT in the nav,
 * so no dot is shown while you are on the hero.
 */
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="home" className="flex min-h-screen items-center px-6">Hero</section>
        <section id="work" className="min-h-screen px-6 pt-24">Work</section>
        <section id="skills" className="min-h-screen px-6 pt-24">Skills</section>
        <section id="experience" className="min-h-screen px-6 pt-24">Experience</section>
        <section id="about" className="min-h-screen px-6 pt-24">About</section>
        <section id="contact" className="min-h-screen px-6 pt-24">Contact</section>
      </main>
    </>
  );
}

/*
 * ONE-TIME SETUP in index.html <head>
 *
 * 1) Fonts:
 *    <link rel="preconnect" href="https://fonts.googleapis.com">
 *    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono&display=swap" rel="stylesheet">
 *
 * 2) Stops the white flash on load when the saved theme is dark:
 *    <script>
 *      try {
 *        var t = localStorage.getItem("theme");
 *        if (t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches))
 *          document.documentElement.classList.add("dark");
 *      } catch (e) {}
 *    </script>
 */
