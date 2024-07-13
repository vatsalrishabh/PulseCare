const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js",
      flowbite.content(),
  ],
 

  theme: {
    extend: {
      colors: {
        'custom-maroon0': '#e01212', // Custom color name and value
        'custom-maroon': '#8f1b1b',
        'custom-maroon2': '#6d0101',
        'custom-gray0': '#999',
        'custom-graybg':'#edeeee',
        'cutom-green':'#71a113',
      },
    },
  },
  plugins:  [
    require('flowbite/plugin'),
    flowbite.plugin(),
],
});