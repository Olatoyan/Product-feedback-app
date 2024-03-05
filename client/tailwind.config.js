/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      boxShadow: {
        "modal-sh": "0px 10px 40px -7px rgba(55, 63, 104, 0.35)",
      },
      backgroundImage: {
        "suggestion-desktop":
          "url('../suggestions/desktop/background-header.png')",
        "suggestion-tablet":
          "url('../suggestions/tablet/background-header.png')",
        "suggestion-mobile":
          "url('../suggestions/mobile/background-header.png')",
      },
      screens: {
        laptop: { max: "64em" },
        tablet: { max: "43.75em" },
      },
    },
  },
  plugins: [],
};
