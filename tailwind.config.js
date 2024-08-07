/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react"

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    },
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1024px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '768px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }

      'xs': { 'max': '414px' },
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [nextui(), function ({ addUtilities }) {
    addUtilities({
      '.hide-scrollbar': {
        /* Hide scrollbars in WebKit-based browsers */
        '::-webkit-scrollbar': { display: 'none' },
        /* Hide scrollbars in Firefox */
        '-ms-overflow-style': 'none', /* IE and Edge */
        'scrollbar-width': 'none', /* Firefox */
      },
    })
  },],
}
