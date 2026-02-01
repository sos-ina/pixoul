/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Klapt', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Lato', 'Amiri', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
