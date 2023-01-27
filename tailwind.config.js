/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: [
    'bg-sky-100',
    'text-sky-600',
    'bg-gray-100',
    'text-gray-600',
    'bg-green-100',
    'text-green-600',
    'bg-red-100',
    'text-red-600',
    'bg-white-100',
    'text-black-600',
    'bg-yellow-100',
    'text-yellow-600'
  ]
}
