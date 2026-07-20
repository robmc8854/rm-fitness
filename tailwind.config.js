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
        background: "#08080A",
        backgroundElevated: "#0F0F13",
        surface: "#16161C",
        surfaceAlt: "#1E1E26",
        surfaceHighlight: "#252530",
        border: "#26262F",
        borderStrong: "#34343F",
        primary: "#5EE1A0",
        primaryDim: "#3FA377",
        primaryMuted: "#1D3A2C",
        accent: "#8B7CFF",
        accentMuted: "#2A2450",
        text: "#F7F7F9",
        textMuted: "#94949F",
        textFaint: "#5C5C68",
        danger: "#FF6B6B",
        dangerMuted: "#3A2020",
        warning: "#FFB84D",
      },
      fontFamily: {
        heading: ["Manrope_800ExtraBold"],
        headingBold: ["Manrope_700Bold"],
        headingSemibold: ["Manrope_600SemiBold"],
        body: ["Inter_400Regular"],
        bodyMedium: ["Inter_500Medium"],
        bodySemibold: ["Inter_600SemiBold"],
        bodyBold: ["Inter_700Bold"],
      },
      borderRadius: {
        card: "24px",
      },
    },
  },
  plugins: [],
};
