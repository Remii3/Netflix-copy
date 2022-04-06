module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlack: "#111",
      },
    },
  },

  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-nested-groups"),
  ],
};
