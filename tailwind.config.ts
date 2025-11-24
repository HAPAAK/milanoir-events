import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "wave": {
          to: {
            backgroundPosition: "calc(50% + 1.6em) 0, calc(50% + 3.2em) .8em",
          },
        },
        "zoom-in": {
          from: {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3)",
          },
          "50%": {
            opacity: "1",
          },
        },
        "light-speed-in-left": {
          from: {
            transform: "translate3d(-100%, 0, 0) skewX(30deg)",
            opacity: "0",
          },
          "60%": {
            transform: "skewX(-20deg)",
            opacity: "1",
          },
          "80%": {
            transform: "skewX(5deg)",
          },
          to: {
            transform: "translate3d(0, 0, 0)",
          },
        },
        "gradient-shift": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(-0.5rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(1.5rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "glow-pulse": {
          "0%": { opacity: "0.4", transform: "scale(0.95)" },
          "50%": { opacity: "0.8", transform: "scale(1)" },
          "100%": { opacity: "0.4", transform: "scale(0.95)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "wave": "wave 2s linear infinite",
        "zoom-in": "zoom-in 0.6s ease-out",
        "light-speed-in-left": "light-speed-in-left 1s ease-out",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
