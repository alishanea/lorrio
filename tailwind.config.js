/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        laterite: {
          50: '#fdf8f6',
          100: '#fbeee9',
          200: '#f7dad0',
          300: '#efbfae',
          400: '#e59b81',
          500: '#d97452',
          600: '#c85a32',
          700: '#a64426',
          800: '#893b24',
          900: '#723423',
          950: '#3d1810',
        },
      },
    },
  },
  plugins: [],
};
