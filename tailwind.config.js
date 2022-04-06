module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlack: "#111",
      },
    },
  },
  variants: {
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "group-hover",
      "group-focus",
    ],
    textColor: ["responsive", "hover", "focus", "group-hover", "group-focus"],
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-nested-groups"),
  ],
};
