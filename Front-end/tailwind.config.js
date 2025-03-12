/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-once': 'spin 1s linear forwards',  // Spins once for 1 second and stops
      },
      keyframes: {
        spin: {
          '0%': {
            transform: 'rotate(0deg)', // Start at 0 degrees
          },
          '100%': {
            transform: 'rotate(360deg)', // End at 360 degrees
          },
        },
      },
      colors: {
        primary: "#FF7A00",
        secondary: "#2E2E2E",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          sm: "1rem",
        },
      },
    },
  },
  plugins: [],
};
