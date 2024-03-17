import type { Config } from 'tailwindcss'

export default {
  content: ["./**/*.vue"],
  theme: {
    extend: {
      colors: {
        'gray-app': '#9A95A6',
      },
    },
  },
  plugins: [],
} satisfies Config

