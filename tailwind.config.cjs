/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'highlight': 'inset 0 1px 0 0 #ffffff0d',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'background': 'background-color'
      }
    },
  },
  plugins: [],
};