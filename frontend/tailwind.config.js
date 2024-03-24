// // /** @type {import('tailwindcss').Config} */
// // export default {
// //   content: [
// //     "./index.html",
// //     "./src/**/*.{js,ts,jsx,tsx}",
// //     'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
// //   ],
// //   theme: {
// //     extend: {},
// //   },
// //   plugins: [require('flowbite/Plugin'), require('tailwind-scrollbar')],
// // }


// // // plugins: [flowbitePlugin],}
// // Import necessary modules
// import flowbitePlugin from 'flowbite/Plugin';
// import tailwindScrollbar from 'tailwind-scrollbar';
// // require('@tailwindcss/line-clamp')
// import  lineClamp from 'tailwindcss/line-clamp';

// /** @type {import('tailwindcss').Config} */
// const tailwindConfig = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [flowbitePlugin, tailwindScrollbar, lineClamp],
 
// };

// export default tailwindConfig;
import flowbitePlugin from 'flowbite/plugin';
import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin,
    tailwindScrollbar
  ],
};

export default tailwindConfig;

