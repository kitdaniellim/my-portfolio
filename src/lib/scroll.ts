import type Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

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
