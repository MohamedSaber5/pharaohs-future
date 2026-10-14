/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Pharaohs Future Brand Colors
        brand: {
          50:  "#fdf8ee",
          100: "#f9edce",
          200: "#f2d899",
          300: "#eabd5e",
          400: "#e3a433",
          500: "#d4881a", // Primary Gold
          600: "#b96e13",
          700: "#985213",
          800: "#7c4115",
          900: "#673615",
          950: "#3c1a07",
        },
        dark: {
          50:  "#f6f6f7",
          100: "#e0e1e5",
          200: "#c1c2cb",
          300: "#9799aa",
          400: "#72748a",
          500: "#595b70",
          600: "#46485a",
          700: "#3a3b4a",
          800: "#22232e", // Card background
          900: "#16171f", // Section background
          950: "#0d0e14", // Main background
        },
        accent: {
          gold: "#d4881a",
          "gold-light": "#e3a433",
          "gold-dark": "#b96e13",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Playfair Display", "ui-serif", "Georgia"],
        arabic: ["Cairo", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
