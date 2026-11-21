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
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        panel: "var(--panel)",
        panelb: "var(--panelb)",
        chip: "var(--chip)",
        chipt: "var(--chipt)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Hanken Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        photo: "0 30px 80px rgba(0,0,0,0.55), 0 0 90px rgba(142,205,184,0.16)",
        "btn-accent": "0 14px 34px rgba(142,205,184,0.34)",
        "btn-cream": "0 12px 26px rgba(0,0,0,0.4)",
        proj: "0 26px 60px rgba(0,0,0,0.4)",
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
