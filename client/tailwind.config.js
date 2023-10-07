/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        para: ["Roboto", "sans"],
        head: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
}
