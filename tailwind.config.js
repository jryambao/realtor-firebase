/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    screens: {
      'desktop': {'min': '1201px'},
      // => @media (min-width: 1200px) { ... }

      'laptop': {'min': '768px', 'max': '1200px'},
      'tablet': {'min': '475px', 'max': '768px'},
      'mobile': {'max': '475px'},
    },
    extend: {},
  },
  plugins: [],
}

