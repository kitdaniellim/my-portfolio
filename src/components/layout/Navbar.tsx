import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { scrollToSection } from "../../lib/scroll";
import { navItems, profile, SECTIONS } from "../../data/site";
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

  const onDark = active === SECTIONS.experience;

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
          className="cursor-pointer font-display text-[23px] font-extrabold tracking-tight text-ink transition-colors"
          aria-label="Back to top"
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </button>

        <nav
          aria-label="Primary"
          className={cn(
            "hidden items-center gap-0.5 rounded-full border p-1.5 shadow-pill backdrop-blur-md transition-colors md:flex",
            onDark ? "border-white/15 bg-white/[0.07]" : "border-white/10 bg-white/5"
          )}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-current={active === item.id ? "page" : undefined}
              className={cn(
                "cursor-pointer rounded-full px-[19px] py-[9px] text-sm font-semibold transition-colors",
                active === item.id
                  ? "bg-white/10 text-white"
                  : "text-[#9a9da4] hover:text-ink"
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
