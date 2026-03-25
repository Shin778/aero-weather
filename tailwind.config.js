/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // <--- ВОТ ЭТА СТРОКА ОБЯЗАТЕЛЬНА
  theme: {
    extend: {},
  },
  plugins: [],
};
