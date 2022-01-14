module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-200d': 'bounce 1s infinite 200ms',
        'bounce-400d': 'bounce 1s infinite 400ms',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-debug-screens')],
}
