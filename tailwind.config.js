/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    screens: {
      lg: { min: "1201px" },
      // => @media (min-width: 1200px) { ... }

      md: { min: "768px", max: "1200px" },
      sm: { min: "475px", max: "768px" },
      xs: { max: "475px" },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};

