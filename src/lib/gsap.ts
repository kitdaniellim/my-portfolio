import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCED = "(prefers-reduced-motion: reduce)";
export const DESKTOP_MOTION = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
export const MOBILE_OR_REDUCED = "(max-width: 767px), (prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger };
