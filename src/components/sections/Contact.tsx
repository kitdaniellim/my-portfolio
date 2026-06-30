import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { contact, SECTIONS } from "../../data/site";
import { Button } from "../ui/Button";

const Contact = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".contact-line",
          { y: 24 },
          {
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 78%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      id={SECTIONS.contact}
      ref={root}
      aria-label="Get in touch"
      className="relative bg-contact-glow px-5 pb-[90px] pt-32 sm:px-8"
    >
      <div className="mx-auto max-w-[760px] text-center">
        <p className="contact-line eyebrow justify-center">
          <span aria-hidden className="eyebrow-dash" />
          {contact.eyebrow}
        </p>
        <h2 className="contact-line mx-auto mb-10 text-[clamp(34px,4.6vw,60px)] font-extrabold leading-none tracking-[-0.025em] text-cream">
          {contact.headingLead}
          <br />
          {contact.headingTrailPrefix}
          <span className="serif">{contact.headingTrailSerif}</span>
        </h2>

        <div className="contact-line">
          <Button size="lg" href={`mailto:${contact.email}`}>
            {contact.email}
          </Button>
        </div>

        <dl className="contact-line mt-[54px] flex flex-wrap justify-center gap-x-[54px] gap-y-8 border-t border-line pt-10">
          <div className="flex flex-col gap-1.5">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-amber">Phone</dt>
            <dd className="text-base font-semibold text-cream">
              <a
                href={contact.phone.href}
                className="border-b border-[rgba(255,255,255,0.18)] transition-colors hover:border-amber"
              >
                {contact.phone.display}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-amber">Location</dt>
            <dd className="text-base font-semibold text-cream">{contact.locationLabel}</dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-amber">Links</dt>
            <dd className="flex items-center gap-2 text-base font-semibold text-cream">
              {contact.links.map((link, index) => (
                <span key={link.label} className="flex items-center gap-2">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (opens in a new tab)`}
                    className="border-b border-[rgba(255,255,255,0.18)] transition-colors hover:border-amber"
                  >
                    {link.label}
                  </a>
                  {index < contact.links.length - 1 && (
                    <span aria-hidden className="text-muted">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Contact;
