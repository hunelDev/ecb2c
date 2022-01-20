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
      zIndex: {
        100: '100',
      },
      keyframes: {
        fromTopShow: {
          from: {
            opacity: 0,
            transform: 'translate(-50%,-100%)',
          },
          to: {
            opacity: 1,
            transform: 'translate(-50%,0)',
          },
        },
      },
      animation: {
        fromTopShow: 'fromTopShow 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
