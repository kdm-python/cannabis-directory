/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // If you're using an HTML file (e.g., index.html)
    "./src/**/*.{js,jsx,ts,tsx}",  // If your React app is inside the src folder
    // You can also include other paths based on your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

