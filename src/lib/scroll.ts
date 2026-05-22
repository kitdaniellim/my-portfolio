import type Lenis from "lenis";

// Layout.tsx stashes the Lenis instance here so any component can drive smooth
// anchor navigation without prop-drilling or re-instantiating the engine.
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

/**
 * Smoothly scroll to a section by id, routed through Lenis when available so it
 * stays in sync with the smooth-scroll engine. Falls back to native scrolling
 * (e.g. before Lenis mounts, or under reduced-motion where Lenis is lighter).
 *
 * @param id  Section id without the leading "#". Use "home" to scroll to top.
 */
export function scrollToSection(id: string): void {
  const target = id === "home" ? 0 : `#${id}`;
  const offset = id === "home" ? 0 : -20;

  if (window.lenis) {
    window.lenis.scrollTo(target, { offset });
    return;
  }

  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}
