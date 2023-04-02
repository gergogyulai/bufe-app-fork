/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      boxShadow: {
        'highlight': 'inset 0 1px 0 0 #ffffff0d',
      }
    },
  },
  plugins: [],

};