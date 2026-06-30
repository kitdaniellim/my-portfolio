import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { about, SECTIONS } from "../../data/site";

const About = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".about-head",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 75%" },
          }
        );

        gsap.fromTo(
          ".about-line",
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-copy",
              start: "top 80%",
              end: "bottom 65%",
              scrub: 1,
            },
          }
        );

        root.current?.querySelectorAll<HTMLElement>("[data-counter]").forEach((counterEl) => {
          const target = Number(counterEl.dataset.counter);
          if (Number.isNaN(target)) return;
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: counterEl, start: "top 85%", once: true },
            onUpdate: () => {
              counterEl.textContent = Math.round(counter.value).toString();
            },
          });
        });

        gsap.fromTo(
          ".skill-card",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ".skill-grid", start: "top 80%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      id={SECTIONS.about}
      ref={root}
      aria-label="About me"
      className="relative px-5 py-28 sm:px-8"
    >
      <div className="mx-auto grid max-w-[1180px] items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-[22px]">
            <span aria-hidden className="eyebrow-dash" />
            About me
          </p>
          <h2 className="overflow-hidden">
            <span className="about-head inline-block text-[clamp(34px,4.6vw,60px)] font-extrabold leading-none tracking-[-0.022em] text-ink">
              {about.headingLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
              <span className="text-faint">{about.headingMuted}</span>
            </span>
          </h2>

          <div className="about-copy mt-8 space-y-5 text-[17px] leading-[1.72] text-muted">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="about-line max-w-[34em]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="my-9 h-px max-w-[34em] bg-line" />

          <div className="flex flex-wrap gap-x-[50px] gap-y-8">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-end font-display font-extrabold leading-none tracking-[-0.02em] text-ink">
                  {"count" in stat ? (
                    <span className="text-[52px]">
                      <span data-counter={stat.count}>{stat.count}</span>
                      {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
                    </span>
                  ) : (
                    <span className="text-[46px]">{stat.display}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="skill-grid flex flex-col gap-5">
          {about.skills.map((group) => (
            <div
              key={group.title}
              className="skill-card rounded-[22px] border border-white/[0.07] bg-card p-7 shadow-card"
            >
              <h3 className="mb-[18px] flex items-center gap-3 font-display text-[19px] font-bold text-ink">
                <span
                  aria-hidden
                  className="h-[9px] w-[9px] rounded-full bg-accent shadow-[0_0_0_4px_rgba(255,255,255,0.1)]"
                />
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-white/5 px-4 py-[9px] text-sm font-medium text-chipink"
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
