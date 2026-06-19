import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { contact, socials, profile, SECTIONS } from "../../data/site";

const Contact = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".contact-card", {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
        gsap.from(".contact-line", {
          y: 20,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".contact-card", start: "top 70%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <footer id={SECTIONS.contact} ref={root} className="bg-bg px-4 pb-12 pt-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="contact-card relative overflow-hidden rounded-[2rem] border border-line bg-surface p-10 shadow-frost-lg sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-accent-soft/15 blur-[100px]" />

          <div className="relative grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="contact-line eyebrow mb-4">Get in touch</p>
              <h2 className="contact-line text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
                Let&apos;s work
                <br />
                together.
              </h2>
              <p className="contact-line mt-5 max-w-md text-lg text-muted">{contact.blurb}</p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${contact.email}`}
                className="contact-line group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2 px-6 py-5 transition-colors hover:border-accent/40 hover:bg-white"
              >
                <span className="flex items-center gap-4 text-lg font-semibold text-ink sm:text-xl">
                  <Mail className="text-accent-ink" size={22} />
                  {contact.email}
                </span>
                <ArrowUpRight
                  className="text-faint transition-colors group-hover:text-accent-ink"
                  size={20}
                />
              </a>
              <a
                href={contact.phone.href}
                className="contact-line group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2 px-6 py-5 transition-colors hover:border-accent/40 hover:bg-white"
              >
                <span className="flex items-center gap-4 text-lg font-semibold text-ink sm:text-xl">
                  <Phone className="text-accent-ink" size={22} />
                  {contact.phone.display}
                </span>
                <ArrowUpRight
                  className="text-faint transition-colors group-hover:text-accent-ink"
                  size={20}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} profile (opens in a new tab)`}
                className="rounded-full border border-line bg-surface p-3 text-muted shadow-frost transition-colors hover:border-accent/40 hover:text-accent-ink"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
