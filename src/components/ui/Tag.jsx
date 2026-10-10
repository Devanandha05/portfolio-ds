/**
 * Tag renders a token-colored skill or technology chip; edit src/config/tones.js
 * to add or adjust available tones.
 */
import { TONES } from "../../config/tones";

export default function Tag({ children, tone = "teal" }) {
  return (
    <span className={`rounded-full px-2.5 py-1 font-mono text-[11px] ${TONES[tone]}`}>
      {children}
    </span>
  );
}
