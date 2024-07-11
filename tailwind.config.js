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
        'custom-blue': '#1E3A8A', // Custom color name and value
        'custom-maroon': '#8f1b1b',
        'custom-green': '#065F46',
      },
    },
  },
  plugins:  [
    require('flowbite/plugin'),
    flowbite.plugin(),
],
});