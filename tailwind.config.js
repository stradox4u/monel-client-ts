/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      texturina: ['Texturina', 'serif'],
    },
    extend: {
      colors: {
        "monel-gray": '#E5E5E5',
        "monel-blue": '#077A92',
        "monel-green": '#26C595',
      }
    },
  },
  plugins: [],
}

