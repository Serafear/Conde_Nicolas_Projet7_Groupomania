module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: theme => ({
        'blue-d8': "#D8FFFF",
        'lav-bl': "#F9E7E7",
        'amar': "#E83151",
        'ox-bl': "#000022",
        'snow': "#FBF5F3",
        'an-br': "#C89B7B",
        'rufous': "#A40606",
        'pap-wh': "#FFF1D0",
        'pal-si': "#C1BCAC",
        'gunmetal': "#22333B",
        'cultured': "#F2F4F3",
        'grullo': "#A9927D",
        'pinky-1': "#FFD7D7"
      }),
      height: theme =>({
        'c130': '130rem',
        'c100': '100rem',
        'c80': '80rem',
        'c50': '50rem'
      }),
      margin: theme =>({
        'c130': '130rem',
        'c100': '100rem',
        'c80': '80rem',
        'c50': '50rem',
        'c40': '40rem',
        'c30': '30rem',
        'c35': '35rem',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
