import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { gsap, MOTION_OK, MOTION_REDUCED } from "../../lib/gsap";
import { scrollToSection } from "../../lib/scroll";
import { profile, SECTIONS } from "../../data/site";
import { Image } from "../ui/Image";
import { MediaFrame } from "../ui/MediaFrame";
import { Button } from "../ui/Button";

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".hero-word > span", { yPercent: 120, duration: 0.9, stagger: 0.08 })
          .from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0.1)
          .from(".hero-fade", { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.5")
          .from(".hero-photo", { y: 40, opacity: 0, scale: 0.96, duration: 1 }, "-=0.8")
          .from(".hero-cue", { opacity: 0, duration: 0.6 }, "-=0.2");

        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
            defaults: { ease: "none", force3D: true },
          })
          .to(".hero-grid", { yPercent: 16 }, 0)
          .to(".hero-content", { y: -50, autoAlpha: 0.25 }, 0);
      });

      mm.add(MOTION_REDUCED, () => {
        gsap.set([".hero-word > span", ".hero-eyebrow", ".hero-fade", ".hero-photo", ".hero-cue"], {
          clearProps: "all",
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      id={SECTIONS.home}
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0 bg-frost-grid [background-size:48px_48px] opacity-70 will-change-transform [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute -top-24 left-[12%] h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[80px]" />
        <div className="absolute bottom-[-6rem] right-[8%] h-[22rem] w-[22rem] rounded-full bg-accent-soft/25 blur-[80px]" />
      </div>

      <div className="hero-content mx-auto grid w-full max-w-6xl items-center gap-12 px-4 will-change-transform sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="order-2 lg:order-1">
          <p className="hero-eyebrow eyebrow mb-5 flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-accent" />
            {profile.greeting}
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {profile.headline.map((word, index) => (
              <span key={index} className="hero-word inline-block overflow-hidden align-bottom">
                <span
                  className={
                    word.accent
                      ? "inline-block bg-gradient-to-r from-accent-ink to-accent bg-clip-text text-transparent"
                      : "inline-block"
                  }
                >
                  {word.text}
                </span>
                {index < profile.headline.length - 1 && " "}
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {profile.intro}
          </p>

          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <Button onClick={() => scrollToSection("projects")}>View Projects</Button>
            <Button variant="secondary" onClick={() => scrollToSection("contact")}>
              Contact Me
            </Button>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <MediaFrame
            className="hero-photo w-full max-w-sm"
            glowClassName="-inset-3 from-accent/30 to-accent-soft/20"
          >
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={800}
              height={1000}
              placeholder={profile.photoPlaceholder}
              priority
              className="aspect-[4/5] w-full"
            />
          </MediaFrame>
        </div>
      </div>

      <div className="hero-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-faint">
        <span className="flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-widest">
          Scroll
          <ArrowDown size={18} className="animate-bounce" />
        </span>
      </div>
    </section>
  );
};

export default Hero;
