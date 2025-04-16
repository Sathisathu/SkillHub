/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors:{
      primary: '#9ACBD0',
      secondary: '#48A6A7',
      tertiary: '#F2EFE7',
      accent:'#006A71'
    }
  },
  },
  plugins: [],
}