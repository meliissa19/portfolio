/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',               // <- indispensable
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // <- le chemin de tes fichiers (dont Portfolio.jsx)
  ],
  theme: { extend: {} },
  plugins: [],
}
