const { resolve } = require('./utils');

let base = {
  entry: resolve('src/js/index.js'),
  output: {
    filename: 'poster.min.js',
    path: resolve('dist')
  }
}

module.exports = base;