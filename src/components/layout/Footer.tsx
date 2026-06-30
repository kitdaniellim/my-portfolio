import { profile, contact } from "../../data/site";

const Footer = () => (
  <footer className="flex items-center justify-between px-5 py-[30px] text-sm text-muted sm:px-[60px]">
    <span>
      © {new Date().getFullYear()} {profile.name} — {contact.footerNote}
    </span>
    <span className="font-display text-lg font-extrabold text-ink">
      {profile.initials}
      <span className="text-accent">.</span>
    </span>
  </footer>
);

export default Footer;
