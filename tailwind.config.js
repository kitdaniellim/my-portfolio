/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F4F8FB",
        surface: "#FFFFFF",
        "surface-2": "#EAF1F7",
        ink: "#0F172A",
        muted: "#475569",
        faint: "#94A3B8",
        line: "#E2E8F0",
        accent: "#0EA5E9",
        "accent-soft": "#38BDF8",
        "accent-ink": "#0369A1",
      },
      fontFamily: {
        display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
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
