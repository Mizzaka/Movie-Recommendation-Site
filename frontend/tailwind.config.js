/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/Pages/**.js",
    "./src/components/**.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A00',
        secondary: '#F39C12',
        
      },
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
        spaceGrotesk: ["Space Grotesk", "sans-serif"]
      },
    },

    height: ({ theme }) => ({
      auto: 'auto',
      '128': '32rem',
      '100': '24rem',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      full: '100%',
      screen: '100vh',
      svh: '100svh',
      lvh: '100lvh',
      dvh: '100dvh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    }),


    width: ({ theme }) => ({
      auto: 'auto',
      '60': '30rem',
      '100': '34rem',
      '101'  : '100rem',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
      svw: '100svw',
      lvw: '100lvw',
      dvw: '100dvw',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      
    }),
  },
  plugins: [],
}

