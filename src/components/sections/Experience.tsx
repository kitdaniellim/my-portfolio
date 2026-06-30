import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { experience, SECTIONS } from "../../data/site";

const Experience = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".exp-head > *",
          { y: 28 },
          {
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 72%" },
          }
        );
      });
    },
    { scope: root }
  );

  // Scroll-tracked fill + node activation. A live getBoundingClientRect probe
  // (not IntersectionObserver) so the fill tracks the reader's 55%-viewport line.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // CSS shows the static lit timeline

    const section = root.current;
    const line = section?.querySelector<HTMLElement>(".tl-line");
    const fill = section?.querySelector<HTMLElement>(".tl-fill");
    const items = section ? Array.from(section.querySelectorAll<HTMLElement>(".tl-item")) : [];
    if (!line || !fill || items.length === 0) return;

    let raf = 0;
    let cancelled = false;

    const update = () => {
      raf = 0;
      const rect = line.getBoundingClientRect();
      const center = window.innerHeight * 0.55;
      const p = Math.max(0, Math.min(1, (center - rect.top) / rect.height));
      fill.style.height = p * 100 + "%";
      const fillY = rect.top + p * rect.height;
      for (const item of items) {
        const node = item.querySelector<HTMLElement>(".tl-node");
        if (!node) continue;
        const nodeRect = node.getBoundingClientRect();
        const nodeCenter = nodeRect.top + nodeRect.height / 2;
        item.classList.toggle("on", nodeCenter <= fillY + 2);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.fonts?.ready.then(() => {
      if (!cancelled) update();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id={SECTIONS.experience}
      ref={root}
      aria-label="Experience"
      className="relative overflow-hidden border-t border-[rgba(255,255,255,0.05)] bg-exp-glow py-32 pb-[150px]"
    >
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="exp-head mx-auto mb-[70px] max-w-[640px] text-center">
          <span className="eyebrow justify-center">
            <span aria-hidden className="eyebrow-dash" />
            {experience.eyebrow}
          </span>
          <h2 className="mt-3 text-[clamp(34px,4.6vw,60px)] font-extrabold leading-none tracking-[-0.025em] text-cream">
            {experience.headingLead}
            <br />
            <span className="serif">{experience.headingSerif}</span>
          </h2>
          <p className="mx-auto mt-[22px] max-w-[34em] text-[18px] leading-[1.6] text-muted">
            {experience.lead}
          </p>
        </div>

        <div className="tl">
          <div className="tl-line">
            <span className="tl-fill" />
          </div>

          {experience.items.map((item, index) => (
            <div key={index} className={`tl-item ${item.side === "l" ? "tl-l" : "tl-r"}`}>
              <span className="tl-node" aria-hidden />
              <div className="tl-card">
                {item.mark && <span className="tl-mark">{item.mark}</span>}
                <div className="tl-yr">{item.year}</div>
                <h3 className="tl-role">{item.role}</h3>
                <div className="tl-co">
                  {item.company} · {item.place}
                </div>
                <p className="tl-blurb">{item.blurb}</p>
                <div className="tl-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="dchip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
