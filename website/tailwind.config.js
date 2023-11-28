/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte}',
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:["Poppins"]
      },
      colors: {
        'primary': {
          '50': '#f0fcf9', 
          '100': '#e1f7f1', 
          '200': '#b7eddc', 
          '300': '#91e3c6', 
          '400': '#4acf97', 
          '500': '#11ba66', 
          '600': '#0da858', 
          '700': '#0a8c42', 
          '800': '#067030', 
          '900': '#035421', 
          '950': '#023612'
        },
        "text-main":"#2D2E32"
      },
      boxShadow: {
        "sm":"rgba(0, 0, 0, 0.12) 0px 0px 8px",
        "md":"rgba(0, 0, 0, 0.12) 0px 4px 10px",
        "lg":"rgba(0, 0, 0, 0.12) 0px 6px 16px",
        "xl":"rgba(0, 0, 0, 0.18) 0px 8px 20px",
      },
      borderRadius: {
        lg:"0.75rem"
      },
    },
  },
  darkMode: 'class',
}