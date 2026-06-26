import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./templates/aurora/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Raw brand palette (from DDM brand guidelines)
        milk: "#FAFFF3",
        lime: "#C0F53D",
        grass: "#0A0D04",
        army: "#1A2209",
        // Semantic, theme-aware tokens (driven by CSS vars in globals.css)
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        // baked-in low alpha so borders/dividers are always subtle on both themes
        line: "rgb(var(--line) / 0.12)",
        "line-strong": "rgb(var(--line) / 0.22)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-gelasio)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // fluid display sizes
        hero: ["clamp(3.25rem, 8vw, 8.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        h2: ["clamp(2.25rem, 5vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        h3: ["clamp(1.5rem, 2.6vw, 2.25rem)", { lineHeight: "1.1" }],
        lead: ["clamp(1.125rem, 1.6vw, 1.5rem)", { lineHeight: "1.5" }],
        eyebrow: ["clamp(0.72rem, 0.9vw, 0.8125rem)", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        shell: "84rem",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(8px)", opacity: "0.4" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-5%,5%)" },
          "40%": { transform: "translate(-10%,-5%)" },
          "60%": { transform: "translate(5%,-10%)" },
          "80%": { transform: "translate(10%,5%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-fast": "marquee 18s linear infinite",
        "scroll-cue": "scroll-cue 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
