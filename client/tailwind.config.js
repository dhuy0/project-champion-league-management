/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'dark': '5px 7px'
      },
      fontFamily : {
        'roboto': 'Roboto'
      }

    },
  },
  plugins: [],
}

