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
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 78%" },
          }
        );
        gsap.fromTo(
          ".proj-card",
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
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
          <p className="eyebrow mb-[22px]">
            <span aria-hidden className="eyebrow-dash" />
            Selected work
          </p>
          <h2 className="text-[clamp(34px,4.6vw,60px)] font-extrabold leading-none tracking-[-0.022em] text-ink">
            Things I&apos;ve built
            <br />
            that shipped.
          </h2>
        </div>

        <div className="proj-grid grid gap-[22px] sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="proj-card rounded-3xl border border-white/[0.07] bg-card px-[34px] pb-[30px] pt-[34px] shadow-proj transition-all duration-300 hover:-translate-y-[5px] hover:border-white/20 hover:shadow-proj-hover"
            >
              <span className="font-display text-sm font-bold tracking-[0.06em] text-accent2">
                {project.year}
              </span>
              <h3 className="mb-1 mt-3.5 font-display text-[25px] font-bold leading-[1.1] tracking-[-0.01em] text-ink">
                {project.title}
              </h3>
              <div className="mb-4 text-sm font-semibold text-muted">{project.org}</div>
              <p className="mb-5 text-[15.5px] leading-[1.62] text-muted">{project.description}</p>
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-4 py-[9px] text-sm font-medium text-chipink"
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
            className="proj-card flex flex-col rounded-3xl border border-white/20 bg-gradient-to-br from-[#fafafa] to-[#e8e9ec] px-[34px] pb-[30px] pt-[34px] text-[#0a0a0c] shadow-proj transition-all duration-300 hover:-translate-y-[5px] hover:shadow-proj-hover"
          >
            <div className="mb-auto text-[30px] leading-none" aria-hidden>
              ↗
            </div>
            <h3 className="mt-3.5 font-display text-[25px] font-bold leading-[1.1] tracking-[-0.01em] text-[#0a0a0c]">
              {githubCard.title}
            </h3>
            <p className="mt-1 text-[15.5px] leading-[1.62] text-[#3a3a40]">
              {githubCard.description}
            </p>
            <span className="mt-3.5 font-display text-[15px] font-bold text-[#0a0a0c]">
              {githubCard.handle}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
