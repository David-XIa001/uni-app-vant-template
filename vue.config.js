const defaultSettings = require('./src/config')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = defaultSettings.name
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
