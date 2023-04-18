/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        overlayShow: {
          '0%': {opacity: 0},
          '100%': {opacity: 1}
        },
        contentShow: {
          '0%': {opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)'},
          '100%': {opacity: 1, transform: 'translate(-50%, -50%) scale(1)'}
        }
      },
      animation: {
        contentShow: 'contentShow 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayShow: 'overlayShow 600ms cubic-bezier(0.16, 1, 0.3, 1)' 
      }
    },
  },
  plugins: [],
}