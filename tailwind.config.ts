import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#553555',
      secondary: '#ADF1D2',
      primaryGradient: '#95548c',
      black: '#070707',
      white: "#fff",

    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        headers: 'Farray, sans-serif',
      },
      backgroundImage: {
        primaryGradient: "linear-gradient(45deg, #553555 0%, #95548c 50%, #553555 100%)"
      }
    },
  },
  plugins: [],
} satisfies Config;
