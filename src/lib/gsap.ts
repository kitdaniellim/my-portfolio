// Single source of truth for GSAP + plugin registration.
// Importing from here guarantees ScrollTrigger is registered exactly once.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Shared gsap.matchMedia() queries so every section guards motion the same way.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCED = "(prefers-reduced-motion: reduce)";
export const DESKTOP_MOTION = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
export const MOBILE_OR_REDUCED = "(max-width: 767px), (prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger };
