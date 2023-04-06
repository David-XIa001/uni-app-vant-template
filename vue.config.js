const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = '你的小程序'
module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
