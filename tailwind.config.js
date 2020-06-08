module.exports = {

  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  variants: {},
  plugins: [],
  theme: {
    // screens: {
    //   sm: '640px',
    //   md: '768px',
    //   lg: '1024px',
    //   xl: '1280px',
    // },
    // fontFamily: {
    //   display: ['Gilroy', 'sans-serif'],
    //   body: ['Graphik', 'sans-serif'],
    // },
    // borderWidth: {
    //   default: '1px',
    //   '0': '0',
    //   '2': '2px',
    //   '4': '4px',
    // },
    extend: {
      colors: {
        gray17: '#2B2B2B',
        white17: '#EEE6D8',
      },
    },
  },
};
