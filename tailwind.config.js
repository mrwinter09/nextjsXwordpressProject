/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "5xl": [
          "2.5rem",
          {
            lineHeight: "1",
          },
        ],
      },
      fontFamily: {
        heading: ["Aboreto", "cursive"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
