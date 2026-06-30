import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK, MOTION_REDUCED } from "../../lib/gsap";
import { scrollToSection } from "../../lib/scroll";
import { profile, SECTIONS } from "../../data/site";
import { cn } from "../../lib/utils";
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
          .from(".hero-eyebrow", { y: 18, opacity: 0, duration: 0.6 })
          .from(".hero-line", { y: 28, opacity: 0, duration: 0.85, stagger: 0.07 }, "-=0.35")
          .from(".hero-fade", { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.55")
          .from(".hero-photo", { y: 40, opacity: 0, scale: 0.96, duration: 1 }, "-=0.85")
          .from(".hero-cue", { opacity: 0, duration: 0.6 }, "-=0.2");

        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
            defaults: { ease: "none", force3D: true },
          })
          .to(".hero-content", { y: -50, autoAlpha: 0.2 }, 0);
      });

      mm.add(MOTION_REDUCED, () => {
        gsap.set([".hero-eyebrow", ".hero-line", ".hero-fade", ".hero-photo", ".hero-cue"], {
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
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden bg-hero-glow pb-20 pt-32"
    >
      <div className="hero-content mx-auto grid w-full max-w-[1180px] items-center gap-10 px-5 will-change-transform sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[60px]">
        <div className="order-2 lg:order-1">
          <p className="hero-eyebrow eyebrow mb-6">
            <span aria-hidden className="eyebrow-dash" />
            {profile.greeting}
          </p>

          <h1 className="mb-[26px] text-[clamp(46px,6.2vw,84px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-cream">
            {profile.headline.map((word, index) => (
              <span
                key={index}
                className={cn(
                  "hero-line mr-[0.22em] inline-block last:mr-0",
                  word.serif && "serif text-[1.04em]"
                )}
              >
                {word.text}
              </span>
            ))}
          </h1>

          <p className="hero-fade mb-9 max-w-[30em] text-[clamp(16px,1.4vw,19px)] leading-[1.66] text-muted">
            {profile.intro}
          </p>

          <div className="hero-fade flex flex-wrap gap-3.5">
            <Button size="lg" onClick={() => scrollToSection("projects")}>
              View Projects
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
              Contact Me
            </Button>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <MediaFrame className="hero-photo w-[min(420px,80vw)]">
            <Image
              src={profile.photo}
              alt={`Kit Daniel Lim — full-stack developer`}
              width={800}
              height={912}
              placeholder={profile.photoPlaceholder}
              priority
              className="aspect-[1/1.14] w-full"
              imgClassName="object-[50%_22%] [filter:saturate(0.8)_sepia(0.16)_contrast(1.02)]"
            />
          </MediaFrame>
        </div>
      </div>

      <a
        href={`#${SECTIONS.about}`}
        aria-label="Scroll to About"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection(SECTIONS.about);
        }}
        className="hero-cue absolute bottom-[30px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#6f6452] no-underline"
      >
        Scroll
        <span aria-hidden className="animate-bob text-[15px]">
          ↓
        </span>
      </a>
    </section>
  );
};

export default Hero;
