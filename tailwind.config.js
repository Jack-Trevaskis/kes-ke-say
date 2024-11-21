/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
}
