/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // include all files in src
  ],
  theme: {
    extend: { colors: {
      primary: "#1E293B",    // Charcoal Indigo
      accent: "#FACC15",     // Yellow
      hover: "#FBBF24",      // Hover Yellow
      background: "#F9FAFB", // Light Background
      surface: "#FFFFFF",    // Cards
      darkText: "#111827",   // Dark text
      lightText: "#F9FAFB",  // Light text
    },},
  },
  plugins: [],
}
