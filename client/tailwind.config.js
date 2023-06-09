/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#5543b2",
        color2: "#705ade",
        color3: "#383838",
        color4: "#687280",
        color5: "#f6f6f6",
      },
      fontFamily: {
        primary: ["Poppins"],
        secondary: ["Baloo Chettan 2"],
      },
      keyframes: {
        overlayShow: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        contentShow: {
          "0%": {
            opacity: 0,
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        contentShow: "contentShow 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayShow: "overlayShow 600ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
