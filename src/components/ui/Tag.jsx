/**
 * Tag — small pill for technologies / skills. Uses the "cool" teal accent,
 * which the palette reserves for code and badges.
 */
export default function Tag({ children }) {
  return (
    <span className="rounded-full border border-cool/30 bg-cool/10 px-2.5 py-1 font-mono text-[11px] text-cool">
      {children}
    </span>
  );
}
