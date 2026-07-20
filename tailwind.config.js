/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0D",
        surface: "#17171B",
        surfaceAlt: "#1F1F24",
        border: "#2A2A31",
        primary: "#5EE1A0",
        primaryMuted: "#2E6B4E",
        accent: "#7C9CFF",
        text: "#F5F5F7",
        textMuted: "#9A9AA5",
        danger: "#FF6B6B",
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};
