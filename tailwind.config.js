// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // For App Router
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Add any other directories where you use Tailwind classes
  ],
  theme: {
    extend: { maxWidth: {
        '8xl': '1440px', // Example: a custom width larger than 7xl
        '9xl': '1600px', // Another example
         '7.5xl': '88rem',
        'custom-hero-width': '1350px', // Or any specific pixel value
      }},
  },
  plugins: [],
};