/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        card: "var(--card)",
        dark: "var(--dark)",
        dark2: "var(--dark2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        chipink: "var(--chipink)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Hanken Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        pill: "0 10px 30px rgba(0,0,0,0.4)",
        card: "0 16px 40px rgba(0,0,0,0.4)",
        "card-lg": "0 24px 60px rgba(0,0,0,0.5)",
        proj: "0 16px 44px rgba(0,0,0,0.4)",
        "proj-hover": "0 26px 60px rgba(0,0,0,0.55)",
        photo:
          "0 0 0 1px rgba(255,255,255,0.1), 0 36px 80px rgba(0,0,0,0.6), 0 0 90px rgba(255,255,255,0.04)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(1100px 700px at 76% 28%, rgba(255,255,255,0.055), transparent 60%), linear-gradient(180deg, #08080a, #0c0c0f)",
        "exp-glow":
          "radial-gradient(900px 600px at 80% 8%, rgba(255,255,255,0.045), transparent 55%), linear-gradient(180deg, #0a0a0d, #0e0e12)",
        "contact-fade": "linear-gradient(180deg, #0d0d10, #08080a)",
      },
      borderRadius: {
        "2.5xl": "1.375rem",
      },
      keyframes: {
        rise: {
          from: { transform: "translateY(28px)", opacity: "0" },
          to: { transform: "none", opacity: "1" },
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
