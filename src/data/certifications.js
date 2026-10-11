/**
 * Certifications data: the ONLY file you edit to add, remove or reorder certificates.
 * Certifications.jsx never contains your copy.
 *
 * HOW TO ADD ONE
 *   Copy any object in CERTIFICATIONS, paste it at the top of the list (newest first) and edit.
 *
 * FIELDS
 *   id            unique, any string (used by React as a key)
 *   title         name of the certification
 *   issuer        who issued it (Cognizant, Coursera, Oracle ...)
 *   category      groups cards. Filter chips are built automatically from the categories used here,
 *                 so adding a new category name adds a new chip. No code change needed.
 *   status        "completed" | "in-progress"   (in-progress shows a pulsing "In progress" label)
 *   issued        "YYYY-MM"  e.g. "2026-03"      (shown as "Mar 2026")
 *   expires       optional "YYYY-MM". Leave out (or null) if it never expires
 *   credentialId  optional, shown in small mono text
 *   url           optional link to verify / view the certificate. Hides the "Verify" link if empty
 *   logo          optional image path in /public (e.g. "/certs/oracle.svg").
 *                 If empty, a monogram of the issuer's initials is shown instead
 *   skills        optional list of short tags
 *
 * The entries below are PLACEHOLDERS: replace them with your real certifications.
 */

// Section heading copy. `highlight` must be an exact piece of `title`; it gets the gradient colour.
export const CERT_SECTION = {
  eyebrow: "Credentials",
  title: "Proof that I keep learning",
  highlight: "keep learning",
  subtitle: "Courses and certifications that back up the work. Verify links open the original certificate.",
};

export const CERTIFICATIONS = [
  {
    id: "cert-placeholder-1",
    title: "Your Latest Certification",
    issuer: "Issuing Organization",
    category: "Web Development",
    status: "in-progress",
    issued: "2026-10",
    expires: null,
    credentialId: "",
    url: "",
    logo: "",
    skills: ["React", "Tailwind CSS"],
  },
  {
    id: "cert-placeholder-2",
    title: "Mainframe Certification Name",
    issuer: "Issuing Organization",
    category: "Mainframe",
    status: "completed",
    issued: "2026-05",
    expires: null,
    credentialId: "ABC-123456",
    url: "https://example.com/verify",
    logo: "",
    skills: ["COBOL", "JCL", "DB2"],
  },
  {
    id: "cert-placeholder-3",
    title: "Java Certification Name",
    issuer: "Issuing Organization",
    category: "Java",
    status: "completed",
    issued: "2025-11",
    expires: "2028-11",
    credentialId: "",
    url: "https://example.com/verify",
    logo: "",
    skills: ["Java", "OOP"],
  },
  {
    id: "cert-placeholder-4",
    title: "Python / Flask Course Name",
    issuer: "Issuing Organization",
    category: "Web Development",
    status: "completed",
    issued: "2025-06",
    expires: null,
    credentialId: "",
    url: "",
    logo: "",
    skills: ["Python", "Flask"],
  },
];