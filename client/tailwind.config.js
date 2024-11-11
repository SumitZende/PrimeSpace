/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'footer-color':'rgb(97, 101 ,121)'
      }
    },
  },
  plugins: [],
}