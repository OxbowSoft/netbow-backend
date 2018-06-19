var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    target: 'node',
    entry: './server/init.ts',
    externals: nodeModules,
    output: {
        path: __dirname + '/dist',
        filename: 'backend.js',
        publicPath: path.resolve(__dirname, '/dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node-modules/
            },
            { 
                test: /\.tsx?$/, 
                loader: "ts-loader" 
            }              
        ]
    }
};