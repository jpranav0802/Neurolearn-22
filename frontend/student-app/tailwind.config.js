/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#FF7B54',
        'brand-secondary': '#FFB26B',
        'background-light': '#FFF2E9',
        'text-primary': '#1c1c1e',
        'text-secondary': '#5a6470',
        'border-color': '#e5e7eb',
      },
      fontFamily: {
        'lexend': ['Lexend', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 10px 25px -5px rgba(255, 123, 84, 0.3)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
