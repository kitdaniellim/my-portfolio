import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import "../../lib/scroll";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    window.lenis = lenis;

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (window.lenis === lenis) delete window.lenis;
    };
  }, []);

  return <div className="min-h-screen overflow-x-hidden bg-bg text-muted">{children}</div>;
};

export default Layout;
