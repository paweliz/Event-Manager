const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    inset: {
      /* prettier-ignore */
      '0': 0,
      15: '3.55rem',
    },
    stroke: {
      current: 'currentColor',
      white: colors.white,
    },
    fill: {
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
      //prettier-ignore
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
        'light-yellow': '#fed766',
        'deep-yellow': '#f6ae2d',
        'orange': '#f26419',
        'lightest-orange' :'#FFBB96',
        'light-orange': '#FFA371',
        'light-orange2': '#FD8748',
        'green': '#10B981',
        'dark-green': '#009B68',
        'light-navy': '#33658a',
        'navy': '#2f4858',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      stroke: ['hover', 'group-hover'],
      filter: ['hover', 'group-hover'],
      fontWeight: ['hover'],
    },
  },
  plugins: [],
};
