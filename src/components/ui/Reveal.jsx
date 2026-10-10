import useReveal from "../../hooks/useReveal";

/**
 * Reveal — wrap anything to make it fade + rise into place when scrolled into view.
 *
 *   <Reveal>...</Reveal>
 *   <Reveal delay={150}>...</Reveal>          // wait 150ms (for staggering lists)
 *   <Reveal as="li" className="...">...</Reveal>
 *
 * Use it in every section so the whole site animates the same way.
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const [ref, shown] = useReveal();

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
