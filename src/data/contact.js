/**
 * CONTACT DATA — edit the words and the form setup here.
 * Your email lives in src/config/site.js (SITE.email); social links live in
 * src/data/socials.js. The Contact section reads all three.
 *
 * HOW THE FORM SENDS MESSAGES (a static site has no server of its own):
 *
 *  Option 1 (default, zero setup): leave `formEndpoint` empty. Pressing "Send"
 *           opens the visitor's email app with the message already written.
 *
 *  Option 2 (recommended): use a free form service so messages land in your inbox
 *           without the visitor leaving your site. Create a form at formspree.io
 *           (or any service that accepts a JSON POST), copy its URL and paste it below:
 *              formEndpoint: "https://formspree.io/f/xxxxxxxx",
 *           Check the service's current free-plan limits before relying on it.
 */

export const CONTACT = {
  title: "Contact",
  description: "Have a role, a project or a question? I'd like to hear about it.",

  headline: "Let's build something good.",
  text: "I'm open to developer roles and interesting projects. Send a message, or email me directly.",

  // Small note under the email. Only write what is true for you. Delete the line to hide it.
  note: "I'll reply as soon as I can.",

  formEndpoint: "", // <- paste your form service URL here (see above)

  // Wording inside the form
  form: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    messagePlaceholder: "Tell me a little about the role or project…",
    submitLabel: "Send message",
    sendingLabel: "Sending…",
    successMessage: "Thanks! Your message is on its way.",
    errorMessage: "Something went wrong. Please email me directly instead.",
    fallbackSubject: "Hello from your portfolio", // used only for the email-app fallback
  },
};
