/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foret: {
          DEFAULT: '#2D5016',
          light: '#3a6b1e',
          dark: '#1e3a0f',
        }
      }
    },
  },
  plugins: [],
}
