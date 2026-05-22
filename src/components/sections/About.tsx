import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { about, SECTIONS } from "../../data/site";

const About = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // Heading clip-reveal as the section enters.
        gsap.from(".about-head", {
          yPercent: 110,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });

        // Bio paragraphs revealed progressively, tied to scroll position.
        gsap.from(".about-line", {
          y: 28,
          opacity: 0,
          stagger: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-copy",
            start: "top 80%",
            end: "bottom 65%",
            scrub: 1,
          },
        });

        // Each stat with a numeric target counts up the first time it's seen.
        const section = root.current;
        section?.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
          const target = Number(el.dataset.counter);
          if (Number.isNaN(target)) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toString();
            },
          });
        });

        // Skill chips draw in with a stagger.
        gsap.from(".skill-chip", {
          y: 16,
          opacity: 0,
          scale: 0.96,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".skill-grid", start: "top 80%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id={SECTIONS.about} ref={root} className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Left: story */}
        <div>
          <p className="eyebrow mb-4">About Me</p>
          <h2 className="overflow-hidden">
            <span className="about-head inline-block text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              {about.headingLead}
              <br />
              <span className="text-faint">{about.headingTrail}</span>
            </span>
          </h2>

          <div className="about-copy mt-10 space-y-6 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((para, i) => (
              <p key={i} className="about-line">
                {para}
              </p>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-10 border-t border-line pt-10">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-end gap-1 font-display text-5xl font-extrabold leading-none text-ink">
                  {"count" in stat ? (
                    <>
                      <span data-counter={stat.count}>{stat.count}</span>
                      {stat.suffix && (
                        <span className="text-3xl text-accent-ink">{stat.suffix}</span>
                      )}
                    </>
                  ) : (
                    <span>{stat.display}</span>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: skills */}
        <div className="skill-grid flex flex-col gap-5">
          {about.skills.map((group) => (
            <div
              key={group.title}
              className="rounded-2.5xl border border-line bg-surface p-7 shadow-frost"
            >
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-ink">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="skill-chip rounded-full border border-line bg-surface-2 px-4 py-2 text-sm font-medium text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
