/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        veniviciGreen: '#4CAF50',
        veniviciGold: '#D4AF37',
        veniviciGray: '#F5F5F5', // Existing neutral gray
        veniviciLightGray: '#F9F9F9', // New lighter gray for subtle backgrounds
        veniviciDark: '#333333',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Added for styling blog post content
  ],
};