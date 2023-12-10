const { generateTailwindColors, generateRootCSSVars } = require('./generators');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    colors: generateTailwindColors(),
    extend: {
      colors: {
        cyan: colors.blue,
        gray: colors.slate
      },
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        xxs: '11px'
      },
      maxWidth: {
        xxs: '15rem'
      },
      minHeight: (theme) => theme('spacing'),
      minWidth: (theme) => theme('spacing'),
      spacing: {
        5: '1.25rem',
        9: '2.25rem',
        11: '2.75rem'
      },
      top: (theme) => theme('inset'),
      width: (theme) => theme('spacing')
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
    function ({ addBase }) {
      addBase({ ':root': generateRootCSSVars() });
    }
  ],
  variants: {
    extend: {
      dark: ['opacity']
    }
  },
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
};
