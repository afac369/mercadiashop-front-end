-// tailwind.config.js
-module.exports = {
+/** @type {import('tailwindcss').Config} */
+module.exports = {
   content: [
     "./pages/**/*.{ts,tsx}",
     "./components/**/*.{ts,tsx}",
     "./app/**/*.{ts,tsx}",
   ],
   theme: {
     extend: {
       backgroundImage: {
         hero: "url('/bg-mercadiashop.jpg')",
       },
     },
   },
-  plugins: [],
-};
-safelist: ["bg-[url('/bg-mercadiashop.jpg')]"];
+  safelist: ["bg-[url('/bg-mercadiashop.jpg')]"],
+  plugins: [],
+};
