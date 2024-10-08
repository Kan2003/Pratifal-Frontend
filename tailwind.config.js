/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        "lato": ['Lato', 'sans-serif'],
        "headlandOne": ['Headland One', 'serif']
      },
    },
  },
  plugins: [],
}

