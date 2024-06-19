/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'login-page': "url('https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg')"
      },
      inset:{
        '18':'18%',
        '20':'20%',
        '50' : '50%'
      },
      flex: {
        '3': '3 3 0%',
        '6': '6 6 0%',
        '9':'9 9 0%'

      },
    },
    fontFamily: {
      "Js-Ss": ["Josefin Sans", "sans-serif"],
      "lora": ["Lora", "sans-serif"],
      "varela" : ["Varela", "sans-serif"]
    },
  },
  plugins: [],
};
