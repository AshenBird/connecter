const path = require('path');

const _resolve = p => path.resolve( __dirname, `../${p}` );

const srcResolve = p => _resolve(`src/${p}`)


module.exports = {
  resolve:_resolve,
  srcResolve
}