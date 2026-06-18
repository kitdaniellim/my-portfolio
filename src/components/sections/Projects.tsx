import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Github, ArrowRight } from "lucide-react";
import { gsap, DESKTOP_MOTION, MOBILE_OR_REDUCED } from "../../lib/gsap";
import { projects, projectImageSources, SECTIONS } from "../../data/site";
import { useImagePreload } from "../../hooks/useImagePreload";
import { Image } from "../ui/Image";
import { MediaFrame } from "../ui/MediaFrame";
import { Button } from "../ui/Button";

const Projects = () => {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useImagePreload(projectImageSources);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MOTION, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const horizontal = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".project-panel").forEach((panel) => {
          const panelImage = panel.querySelector(".project-img");
          if (panelImage) {
            gsap.from(panelImage, {
              clipPath: "inset(0% 100% 0% 0%)",
              scale: 1.15,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal,
                start: "left 80%",
                end: "left 30%",
                scrub: true,
              },
            });
          }

          const risingItems = panel.querySelectorAll(".project-rise");
          if (risingItems.length) {
            gsap.from(risingItems, {
              y: 40,
              opacity: 0,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal,
                start: "left 70%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      });

      mm.add(MOBILE_OR_REDUCED, () => {
        gsap.set(track.current, { x: 0 });
        gsap.utils.toArray<HTMLElement>(".project-panel").forEach((panel) => {
          gsap.from(panel, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: panel, start: "top 85%" },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id={SECTIONS.projects} ref={root} className="relative overflow-hidden bg-surface-2 md:h-screen">
      <div ref={track} className="flex flex-col md:h-full md:flex-row md:flex-nowrap">
        <div className="project-panel flex shrink-0 items-center px-6 py-24 md:h-full md:w-screen md:py-0 md:pl-[8vw]">
          <div className="max-w-md">
            <p className="eyebrow mb-4">Selected Work</p>
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-6xl">
              Recent
              <br />
              Projects.
            </h2>
            <p className="mt-6 text-lg text-muted">
              A few things I&apos;ve designed and built — from games to mobile apps and
              data-driven interfaces.
            </p>
            <p className="mt-8 hidden items-center gap-2 text-sm font-semibold text-accent-ink md:flex">
              Scroll to explore <ArrowRight size={16} />
            </p>
          </div>
        </div>

        {projects.map((project) => (
          <article
            key={project.id}
            className="project-panel flex shrink-0 items-center px-6 py-20 md:h-full md:w-screen md:px-[8vw] md:py-0"
          >
            <div className="grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
              <div className="order-2 md:order-1">
                <div className="project-rise mb-5 flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-faint">0{project.id}</span>
                  <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-ink">
                    {project.subtitle}
                  </span>
                </div>
                <h3 className="project-rise text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
                  {project.title}
                </h3>
                <p className="project-rise mt-5 max-w-md text-lg leading-relaxed text-muted">
                  {project.description}
                </p>
                <p className="project-rise mt-4 font-mono text-sm text-muted">{project.tech}</p>
                <div className="project-rise mt-8">
                  <Button
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} code on GitHub (opens in a new tab)`}
                  >
                    <Github size={18} />
                    View Code
                  </Button>
                </div>
              </div>

              <div className="project-rise order-1 md:order-2">
                <MediaFrame>
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle}`}
                    width={1280}
                    height={720}
                    placeholder={project.placeholder}
                    className="aspect-video w-full"
                    imgClassName="project-img"
                  />
                </MediaFrame>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
