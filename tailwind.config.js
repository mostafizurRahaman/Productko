/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   daisyui: {
      themes: [
         {
            mytheme: {
               primary: "#4f80ff",
               secondary: "#ffffff",
               accent: "#031d5b",
               neutral: "#333C4D",
               "base-100": "#FFFFFF",
               info: "#7da1fa",
               success: "#36D399",
               warning: "#FBBD23",
               error: "#F87272",
            },
         },
      ],
   },
   theme: {
      extend: {},
   },
   plugins: [require("daisyui")],
};
