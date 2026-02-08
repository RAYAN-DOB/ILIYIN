import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        iliyin: {
          emerald: "#2dd4a0",
          "emerald-dark": "#1a9d6f",
          "emerald-light": "#4ae8b8",
          "green-dark": "#0d2818",
          "green-darker": "#062010",
          "green-deep": "#031a0d",
          "card-header": "#1a1a2e",
          "off-white": "#f8fafc",
          beige: "#e8dcc8",
          gold: "#d4af37",
          white: "#ffffff",
          black: "#0a0a0a",
        },
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "system-ui", "sans-serif"],
        exo: ["var(--font-exo)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #d4af37 0%, #e8dcc8 100%)",
        "gradient-story":
          "linear-gradient(180deg, #2dd4a0 0%, #1e8f6e 15%, #0d4d38 30%, #062010 50%, #031a0d 70%, #0a0a0a 100%)",
        "gradient-card":
          "linear-gradient(180deg, rgba(45,212,160,0.15) 0%, transparent 100%)",
      },
      boxShadow: {
        "emerald-glow": "0 0 30px rgba(45, 212, 160, 0.3)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
        "3xl": "1.5rem",
      },
      transitionDuration: {
        400: "400ms",
        500: "500ms",
      },
      transitionTimingFunction: {
        "out-smooth": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
