const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    stroke:{
      current: 'currentColor',
      white: colors.white,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blue: colors.blue,
    },
    extend: {
      colors: {
        'earie-black': '#272727',
        'orange-yellow-crayola': '#fed766',
        'blue-munsell': '#009fb7',
        'dim-gray': '#696773',
        'cultured': '#eff1f3',
        'light-gray': '#d3d3d3',
        'lavender-blush': '#f5f3f4',
        'reddy-gray': '#b1a7a6',
        'll-red': '#e5383b',
        'torch-red': '#ba181b',
        'carmine': '#a4161a',
        'deepy-red': '#660708',
        'black-pearl': '#161a1d',
        'cod-gray': '#0b090a',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      stroke: ['hover', 'group-hover'],
      filter: ['hover', 'group-hover'],
    },
  },
  plugins: [],
}

