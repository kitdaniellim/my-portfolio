/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Arctic Frost — light, cool, crisp
        bg: "#F4F8FB", // page background (cool white)
        surface: "#FFFFFF", // cards / panels
        "surface-2": "#EAF1F7", // subtle alternate surface
        ink: "#0F172A", // headings + primary text
        muted: "#475569", // body / secondary text (>=4.5:1 on bg)
        faint: "#94A3B8", // least-important text / hints
        line: "#E2E8F0", // borders / dividers
        accent: "#0EA5E9", // sky-500 — fills, underlines, glows (NOT text)
        "accent-soft": "#38BDF8", // sky-400 — gradients / highlights
        "accent-ink": "#0369A1", // sky-700 — accent-colored TEXT (>=4.5:1 on white)
      },
      fontFamily: {
        // Loaded via <link> in index.html
        display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Soft, frosted elevation tuned for a light theme
        frost: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.10)",
        "frost-lg": "0 2px 4px rgba(15,23,42,0.05), 0 24px 56px -16px rgba(15,23,42,0.18)",
      },
      backgroundImage: {
        "frost-grid":
          "linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
