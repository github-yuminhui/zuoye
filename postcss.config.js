// module.exports = { 
//     plugins: { 
//       'autoprefixer': {browsers: 'last 5 version'} 
//     } 
//   }

  module.exports = {
    plugins: [
      require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']})// 自动添加css前缀
    ]
  }

// module.exports = {
//   plugins: {
//     'autoprefixer': {
//       overrideBrowserslist: [
//         "Android 4.1",
//         "iOS 7.1",
//         "Chrome > 31",
//         "ff > 31",
//         "ie >= 8"
//       ]
//     },
//     'postcss-pxtorem': {
//       rootValue: 37.5,
//       propList: ['*']
//     }
//   }
  
