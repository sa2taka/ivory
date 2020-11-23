module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
      },
    },
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'focus-within'],
    borderWidth: ['responsive'],
    borderRadius: ['responsive'],
  },
  plugins: [],
};
