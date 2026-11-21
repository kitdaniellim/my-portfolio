import { useEffect, useRef, useState } from "react";
import { Check, Copy, Github, Linkedin, type LucideIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { contact, SECTIONS } from "../../data/site";
import { Button } from "../ui/Button";

const LINK_ICONS: Record<string, LucideIcon> = { GitHub: Github, LinkedIn: Linkedin };

const Contact = () => {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context / denied) — the mailto button still works.
    }
  };

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
      className="relative px-5 pb-[90px] pt-32 sm:px-8"
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

        <div className="contact-line flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" href={`mailto:${contact.email}`}>
            {contact.email}
          </Button>
          <Button size="lg" variant="outline" onClick={copyEmail} className="min-w-[132px]">
            {copied ? <Check aria-hidden size={17} /> : <Copy aria-hidden size={17} />}
            {copied ? "Copied" : "Copy"}
            <span className="sr-only"> email address</span>
          </Button>
          <span role="status" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        <ul className="contact-line mt-8 flex justify-center gap-4">
          {contact.links.map((link) => {
            const Icon = LINK_ICONS[link.label];
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in a new tab)`}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[rgba(234,240,238,0.28)] text-cream transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  {Icon ? <Icon aria-hidden size={20} /> : link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
