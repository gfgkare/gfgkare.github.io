/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideDown: "slideDown 0.3s ease-out forwards",
        slideIn: "slideIn 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
