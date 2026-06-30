/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        cream: "var(--cream)",
        fg: "var(--text)",
        muted: "var(--muted)",
        amber: "var(--amber)",
        amber2: "var(--amber2)",
        panel: "var(--panel)",
        panelb: "var(--panelb)",
        chip: "var(--chip)",
        chipt: "var(--chipt)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Hanken Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        photo: "0 30px 80px rgba(0,0,0,0.55), 0 0 90px rgba(232,166,74,0.16)",
        "btn-amber": "0 14px 34px rgba(232,166,74,0.34)",
        "btn-cream": "0 12px 26px rgba(0,0,0,0.4)",
        proj: "0 26px 60px rgba(0,0,0,0.4)",
        gh: "0 26px 60px rgba(232,166,74,0.4)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(1150px 680px at 77% 32%, rgba(232,166,74,0.14), transparent 58%), linear-gradient(180deg, #100d09, #15110b)",
        "exp-glow":
          "radial-gradient(900px 600px at 80% 6%, rgba(232,166,74,0.12), transparent 56%), linear-gradient(180deg, #15110b, #100d09)",
        "contact-glow":
          "radial-gradient(760px 460px at 50% 30%, rgba(232,166,74,0.12), transparent 60%), linear-gradient(180deg, #100d09, #15110b)",
        "gh-amber": "linear-gradient(158deg, #e8a64a, #d4923a)",
      },
      keyframes: {
        rise: {
          from: { transform: "translateY(28px)" },
          to: { transform: "none" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        bob: "bob 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
