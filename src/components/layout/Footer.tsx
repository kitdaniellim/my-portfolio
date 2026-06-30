import { profile, contact } from "../../data/site";

const Footer = () => (
  <footer className="flex items-center justify-between border-t border-white/[0.06] px-5 py-[30px] text-sm text-muted sm:px-[60px]">
    <span>
      © {new Date().getFullYear()} {profile.name} — {contact.footerNote}
    </span>
    <span className="font-display text-lg font-extrabold text-cream">
      {profile.initials}
      <span className="text-amber">.</span>
    </span>
  </footer>
);

export default Footer;
