/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: { hero: "url('/bg-mercadiashop.jpg')" },
    },
  },
  safelist: ["bg-[url('/bg-mercadiashop.jpg')]"],
  plugins: [],
};
