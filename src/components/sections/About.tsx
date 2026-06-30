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
          ".about-rise",
          { y: 28 },
          {
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 72%" },
          }
        );

        gsap.fromTo(
          ".skill-card",
          { y: 28 },
          {
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ".skill-grid", start: "top 80%" },
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
          <div className="about-rise">
            <p className="eyebrow mb-6">
              <span aria-hidden className="eyebrow-dash" />
              About me
            </p>
            <h2 className="text-[clamp(34px,4.6vw,60px)] font-extrabold leading-none tracking-[-0.025em] text-cream">
              {about.headingLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
              <span className="serif">{about.headingSerif}</span>
            </h2>
          </div>

          <div className="about-rise mt-7 space-y-5 text-[17px] leading-[1.74]">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="max-w-[34em]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about-rise my-9 h-px max-w-[34em] bg-line" />

          <div className="about-rise flex flex-wrap gap-x-[50px] gap-y-8">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-end font-display font-extrabold leading-none tracking-[-0.02em] text-cream">
                  {"count" in stat ? (
                    <span className="text-[52px]">
                      <span data-counter={stat.count}>{stat.count}</span>
                      {stat.suffix && <span className="text-amber">{stat.suffix}</span>}
                    </span>
                  ) : (
                    <span className="serif text-[50px] leading-none">{stat.display}</span>
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
              className="skill-card rounded-[22px] border border-panelb bg-panel px-7 py-[26px]"
            >
              <h3 className="mb-[18px] flex items-center gap-3 font-display text-[19px] font-bold text-cream">
                <span
                  aria-hidden
                  className="h-[9px] w-[9px] rounded-full bg-amber shadow-[0_0_0_4px_rgba(232,166,74,0.18)]"
                />
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[rgba(255,255,255,0.07)] bg-chip px-4 py-[9px] text-sm font-medium text-chipt"
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
