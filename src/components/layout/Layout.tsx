import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import "../../lib/scroll"; // registers the typed `window.lenis` global

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // Respect reduced-motion: skip the smooth-scroll engine entirely and let
    // the browser scroll natively (ScrollTrigger works fine without the bridge,
    // and scrollToSection falls back to native). Sections already disable their
    // own GSAP choreography under this preference.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lenis = smooth inertial scrolling. The catch: GSAP ScrollTrigger reads
    // native scroll position, so with smooth scroll the two desync and pinned
    // sections jitter. The fix below makes GSAP the single clock:
    //   1. Lenis no longer runs its own rAF loop.
    //   2. GSAP's ticker advances Lenis every frame.
    //   3. Every Lenis scroll event tells ScrollTrigger to recompute.
    const lenis = new Lenis({
      duration: 1.0, // a touch snappier than the 1.2 default — less "floaty"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000); // gsap ticker time is in seconds; Lenis wants ms
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Expose for anchor navigation (see lib/scroll.ts → scrollToSection).
    window.lenis = lenis;

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      lenis.destroy();
      // Only reclaim the global if it's still ours (guards remount/StrictMode
      // ordering where a newer instance may already own it).
      if (window.lenis === lenis) delete window.lenis;
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-muted selection:bg-accent/15">{children}</div>
  );
};

export default Layout;
