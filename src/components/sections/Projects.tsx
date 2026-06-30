import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { projects, githubCard, SECTIONS } from "../../data/site";

const Projects = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".proj-head",
          { y: 28 },
          {
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 78%" },
          }
        );
        gsap.fromTo(
          ".proj-card",
          { y: 30 },
          {
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".proj-grid", start: "top 82%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      id={SECTIONS.projects}
      ref={root}
      aria-label="Selected work"
      className="relative px-5 py-28 sm:px-8"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="proj-head mb-[54px]">
          <p className="eyebrow mb-6">
            <span aria-hidden className="eyebrow-dash" />
            Selected work
          </p>
          <h2 className="text-[clamp(34px,4.6vw,60px)] font-extrabold leading-none tracking-[-0.025em] text-cream">
            Things I&apos;ve built
            <br />
            <span className="serif">that shipped.</span>
          </h2>
        </div>

        <div className="proj-grid grid gap-[22px] sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="proj-card rounded-3xl border border-panelb bg-panel px-[34px] pb-[30px] pt-[34px] transition-all duration-300 hover:-translate-y-[5px] hover:border-[rgba(232,166,74,0.42)] hover:shadow-proj"
            >
              <span className="serif text-xl">{project.year}</span>
              <h3 className="mb-1 mt-2.5 font-display text-[25px] font-bold leading-[1.1] tracking-[-0.01em] text-cream">
                {project.title}
              </h3>
              <div className="mb-4 text-sm font-semibold text-muted">{project.org}</div>
              <p className="mb-5 text-[15.5px] leading-[1.62]">{project.description}</p>
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[rgba(255,255,255,0.07)] bg-chip px-4 py-[9px] text-sm font-medium text-chipt"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}

          <a
            href={githubCard.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${githubCard.title} — ${githubCard.handle} (opens in a new tab)`}
            className="proj-card flex flex-col rounded-3xl border border-transparent bg-gh-amber px-[34px] pb-[30px] pt-[34px] text-[#1a1407] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-gh"
          >
            <div className="mb-auto text-[30px] leading-none" aria-hidden>
              ↗
            </div>
            <h3 className="mt-3.5 font-display text-[25px] font-bold leading-[1.1] tracking-[-0.01em] text-[#1a1407]">
              {githubCard.title}
            </h3>
            <p className="mt-1 text-[15.5px] leading-[1.62] text-[#43320f]">
              {githubCard.description}
            </p>
            <span className="mt-3.5 font-display text-[15px] font-bold text-[#1a1407]">
              {githubCard.handle}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
