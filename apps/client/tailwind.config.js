module.exports = {
  // mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'bounce-200d': 'bounce 1s infinite 200ms',
        'bounce-400d': 'bounce 1s infinite 400ms',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
      backgroundColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-debug-screens')],
}
