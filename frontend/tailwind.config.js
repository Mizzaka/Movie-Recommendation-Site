/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
        spaceGrotesk: ["Space Grotesk", "sans-serif"]
      },
    },
  },
  plugins: [],
}

