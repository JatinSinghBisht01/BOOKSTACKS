/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'img': "url('/src/images/1.jpeg')",
        'col':'linear-gradient(rgba(141, 49, 174, 0.3), rgba(141, 49, 174, 0.5))',
        
        
      },
  
    },
  },
  plugins: [],
}