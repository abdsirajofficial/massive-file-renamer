/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f766e', // Teal-700
        secondary: '#0ea5e9', // Sky-500
        accent: '#22c55e', // Green-500
      }
    },
  },
  plugins: [],
}

