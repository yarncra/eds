/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '640px' },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '10px',
      },
    },
    extend: {},
  },
  plugins: [],
};
