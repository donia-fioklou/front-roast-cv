/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all React component files
  ],
  theme: {
    extend: {
      colors: {
        bgColor: 'rgba(240,240,240,255)', // Add your custom RGB color here
        btColor: 'rgba(21,21,21,255)',
      },
    },
  },
  plugins: [],
}

