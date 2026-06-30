import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { scrollToSection } from "../../lib/scroll";
import { navItems, profile } from "../../data/site";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

const Navbar = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(navItems[0].id);
  const [scrolled, setScrolled] = useState(false);

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
        window.lenis?.limit ?? document.documentElement.scrollHeight - window.innerHeight;
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

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-[padding] duration-300",
        scrolled ? "py-3" : "py-[18px]"
      )}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 sm:px-8 lg:px-[46px]">
        <button
          onClick={() => scrollToSection("home")}
          className="cursor-pointer font-display text-[23px] font-extrabold tracking-tight text-cream"
          aria-label="Back to top"
        >
          {profile.initials}
          <span className="text-amber">.</span>
        </button>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/5 p-1.5 backdrop-blur-md md:flex"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-current={active === item.id ? "page" : undefined}
              className={cn(
                "cursor-pointer rounded-full px-[19px] py-[9px] text-sm font-semibold transition-colors",
                active === item.id
                  ? "bg-amber text-[#1a1407]"
                  : "text-[#b6ab98] hover:text-cream"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <Button
          variant="cream"
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
