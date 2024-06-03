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
      colors: {
        "navy": "#2E266F",
        "leery-lemon": "#EFC81A",
        "ambrosia-ivory": "#FFF5EC",
        "swinging-wine": "#6F6A40",
        "gray-light": "#8692A6",
        "gray-dark": "#696F79",
      },
      backgroundImage: {
        "bg-pattern": "url('/assets/BG.png')",
        "bg-login": "url('/assets/bgLogin.png')",
      },
    },
  },
  plugins: [],
};
