import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { scrollToSection } from "../../lib/scroll";
import { navItems, profile } from "../../data/site";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

const Navbar = () => {
  const headerRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(navItems[0].id);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(headerRef.current, {
          y: -80,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    },
    { scope: headerRef }
  );

  useEffect(() => {
    const ids = navItems.map((item) => item.id);
    let raf = 0;
    let cancelled = false;

    const update = () => {
      raf = 0;
      if (cancelled) return;

      const probe = window.innerHeight * 0.45;
      let current: (typeof ids)[number] = ids[0];
      for (const id of ids) {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (rect && rect.top <= probe && rect.bottom > probe) current = id;
      }

      const limit =
        window.lenis?.limit ??
        document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= limit - 2) current = ids[ids.length - 1];

      setActive((prev) => (prev === current ? prev : current));
      setScrolled(window.scrollY > 40);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useLayoutEffect(() => {
    let alive = true;
    const measure = () => {
      if (!alive) return;
      const button = buttonRefs.current[active];
      if (button) setIndicator({ left: button.offsetLeft, width: button.offsetWidth, ready: true });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      alive = false;
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding] duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => scrollToSection("home")}
          className="cursor-pointer text-lg font-extrabold tracking-tight text-ink"
          aria-label="Back to top"
        >
          {profile.initials}
          <span className="text-accent-ink">.</span>
        </button>

        <nav
          aria-label="Primary"
          className={cn(
            "frost relative hidden items-center gap-1 rounded-full p-1 transition-shadow md:flex",
            scrolled && "shadow-frost-lg"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "absolute inset-y-1 rounded-full bg-accent/10 ring-1 ring-accent/20 transition-all duration-300 ease-out",
              indicator.ready ? "opacity-100" : "opacity-0"
            )}
            style={{ left: indicator.left, width: indicator.width }}
          />
          {navItems.map((item) => (
            <button
              key={item.id}
              ref={(el) => {
                buttonRefs.current[item.id] = el;
              }}
              onClick={() => scrollToSection(item.id)}
              aria-current={active === item.id ? "page" : undefined}
              className={cn(
                "relative z-10 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                active === item.id ? "text-ink" : "text-muted hover:text-ink"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <Button
          size="sm"
          onClick={() => scrollToSection("contact")}
          className="hidden md:inline-flex"
        >
          Let&apos;s Talk
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
