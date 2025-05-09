/** @type {import('tailwindcss').Config} */
import tailwindcssPrimeui from 'tailwindcss-primeui'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      title: ['GenSenRounded-R', 'Openhuninn', 'ui-sans-serif'],
    },
    extend: {},
  },
  plugins: [tailwindcssPrimeui],
}
