const colors = require('windicss/colors')
const typography = require('windicss/plugin/typography')

export default {
  extract: {
    include: ['./src/**/*.{vue,js,ts,jsx,tsx}']
  },
  safelist: ['prose', 'prose-sm', 'm-auto'],
  darkMode: 'class',
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        teal: colors.teal
      }
    }
  }
}
