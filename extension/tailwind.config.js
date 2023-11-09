// export default {
//   content: ['./popup.html', './**/*.{js,ts,html}'],
//   theme: {
//     extend: {
//       fontFamily:{
//         sans:["Poppins"]
//       },
//       colors: {
//         primary: "#11ba66",
//         "text-main":"#2D2E32"
//       },
//     },
//   },
//   plugins: [],
// };

const withMT = require("@material-tailwind/html/utils/withMT");
 
module.exports = withMT({
  content: ['./popup.html', './**/*.{js,ts,html}'],
  theme: {
    extend: {
      fontFamily:{
        sans:["Poppins"]
      },
      colors: {
        primary: "#11ba66",
        "text-main":"#2D2E32"
      },
    },
  },
  plugins: [],
});
