import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'byp-red': '#E71B23',
      },
      fontFamily: {
        'gill-sans': ['Gill Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
