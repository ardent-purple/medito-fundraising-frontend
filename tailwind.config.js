/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['dark'],
  },
  theme: {
    extend: {
      fontFamily: {
        title: ['"Bebas Neue"', 'serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
}
