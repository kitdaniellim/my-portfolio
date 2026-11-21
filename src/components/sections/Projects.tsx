import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import type { CSSProperties } from "react";
import { ArrowUpRight, Pin } from "lucide-react";
import { Button } from "../ui/Button";
import { projectFolders, githubCard, SECTIONS } from "../../data/site";

// GitHub linguist colours, so the dots match what the repo page shows.
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "React Native": "#f1e05a",
  Python: "#3572a5",
  "C#": "#7355dd",
  Vue: "#41b883",
};

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
        <div className="proj-head mb-2 flex flex-wrap items-end justify-between gap-6">
          <div>
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
          <Button
            variant="outline"
            href={githubCard.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${githubCard.title}: ${githubCard.handle} (opens in a new tab)`}
          >
            {githubCard.title}
            <ArrowUpRight aria-hidden size={17} />
          </Button>
        </div>

        <div className="proj-grid grid gap-x-[22px] gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
          {projectFolders.map((folder) => (
            <article key={folder.id} className="proj-card folder" aria-label={folder.title}>
              <div className="folder-body">
                <div className="folder-back" aria-hidden />

                <ul className="folder-files">
                  {folder.files.map((file, index) => (
                    <li
                      key={file.name}
                      className="file"
                      style={
                        {
                          "--i": index,
                          "--n": folder.files.length,
                          "--tilt": index % 2 === 0 ? -1 : 1,
                        } as CSSProperties
                      }
                    >
                      <a
                        href={file.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${file.name}, ${file.lang}${file.pinned ? ", pinned" : ""}. ${file.note} (opens in a new tab)`}
                        className="file-tab"
                      >
                        <span
                          aria-hidden
                          className="file-dot"
                          style={{ background: LANG_COLORS[file.lang] ?? "#84948f" }}
                        />
                        <span className="file-name">{file.name}</span>
                        {file.pinned && <Pin aria-hidden size={12} className="file-pin" />}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="folder-front">
                  <span className="folder-tab" aria-hidden>
                    {folder.files.length} repos
                  </span>
                  <div className="folder-label">
                    <h3 className="folder-title">{folder.title}</h3>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
