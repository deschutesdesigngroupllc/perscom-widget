const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.css',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyan: colors.blue,
        gray: colors.zinc
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
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
  variants: {
    extend: {
      dark: ['opacity']
    }
  }
};
