/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'warm-cream': '#FDFBF7',
        'warm-brown': '#A26734',
        'warm-brown-light': '#C99E78',
        'warm-brown-lighter': '#E6CBAA',
        'warm-brown-dark': '#8F5734',
        'warm-brown-medium': '#B58D67',
        'warm-text': '#3D352E',
        'warm-text-light': '#65584C',
        'warm-border': '#EAE5DD',
        'warm-bg-light': '#F9F5F0',
        'warm-bg-lighter': '#F0EBE4'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
