/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F3F3F7",
        secondary: "#E7F0FF",
        primaryBlack: "#1d1d1d",
        secondaryBlack: "#383939",
        accent: "#1d4ed8",
      },
    },
  },
  darkMode: "class", // Tambahkan ini
  plugins: [],
};
