export default {
  extract: {
    include: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    exclude: ['node_modules', '.git']
  },
  safelist: [],
  darkMode: 'class',
  plugins: [require('windicss/plugin/line-clamp')],
  theme: {}
}
