import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { opacity: "0", transform: 'translateY(-10px)' },
          '100%': { opacity: "10", transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: "0", transform: 'translateY(10px)' },
          '100%': { opacity: "1", transform: 'translateY(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
