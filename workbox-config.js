module.exports = {
  "globDirectory": "build/",

  "globPatterns": [
    "**/*.{json,ico,html,png,js,txt,css}"
  ],
  "swSrc": "public/src-sw.js",
  "swDest": "build/sw.js"
};



// module.exports = {
//   "globDirectory": "build/",

//   "globPatterns": [
//     "**/*.{json,ico,html,png,js,txt,css}"
//   ],
//   "swDest": "build/sw.js"
//   // "runtimeCaching": [{
//   //   "urlPattern": "https://newsapi.org/v2/top-headlines?country=in&apiKey=dfcd91fa823d419c81a1cdbbf7f0f68a",
//   //   "handler": "NetworkFirst",
//   //   "options": {
//   //     // Use a custom cache name.
//   //     "cacheName": 'news',
//   //   }
//   // }
//   // ]
// };