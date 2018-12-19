

const webpack = require('webpack');

const merge = require('webpack-merge');

const base = require('./webpack.base.conf');

const _ = require('lodash');

// 处理命令行参数
const args = _.clone(process.argv);
process.argv = [ process.argv[0], process.argv[1] ]


let mode = 'dev';

for (const value of args) {
  if( value === '--prod' ){mode = 'prod'};
  if( value === '--dev' ){mode = 'dev'};
}

let config = merge(
  base,
  require( `./webpack.${mode}.conf` )
)

function build(){
  // ts预处理函数
  // require('typescript/lib/tscserver');
  
  webpack(config, ( err, stats )=>{
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }
  
    const info = stats.toJson();
  
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
  
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

  })  
}

build();