module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
        exo2: ["'Exo 2'", 'sans-serif'],
      },
      fontSize: {
        s: ['0.800rem', { lineHeight: '1rem' }],
        md: ['0.950rem', { lineHeight: '1.1rem' }],
        '2xs': ['0.65rem', { lineHeight: '0.85rem' }],
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
      transitionTimingFunction: {
        'in-out-ex': 'cubic-bezier(0.83, 0.23, 0.1, 0.97);',
      },
    },
  },
  plugins: [],
};
