// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // adjust to your project
  theme: {
    extend: {
      colors: {
        // semantic tokens
        primary: {
          DEFAULT: "#3973BF",        // bg-primary, text-primary, border-primary
          foreground: "#F2F1F0",     // text-primary-foreground on primary bg
        },
        // optional semantic set
        muted: {
          DEFAULT: "#F2F1F0",
          foreground: "#00010D",
        },
        // direct palette (optional)
        navy: "#032340",
        ink: "#00010D",
        blue: {
          600: "#3973BF",
          400: "#5B9ED9",
          300: "#94CEF2",
        },
        teal: "#6FBFB7",
        mint: "#A0D9B9",
      },
    },
  },
  plugins: [],
};