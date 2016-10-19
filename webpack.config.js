"use strict";

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let isProductionEnv = (process.argv.indexOf('-p') > -1) ? true : false;

module.exports = {
  devtool: isProductionEnv ? false : 'cheap-module-eval-source-map',
  entry: isProductionEnv ? ['./src/app'] : [
    'webpack-hot-middleware/client',
    './src/app'
  ],
  output: {
    publicPath: '/lib/',  // html引用静态资源时的资源路径，幽灵文件夹
    path: path.join(__dirname, 'lib'),  // 打包输出的路径
    filename: 'app.js'  // 打包后的文件名
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /^node_modules$/
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192',
      exclude: /^node_modules$/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }]
  },
  plugins: function () {
    let temp = [];

    if (isProductionEnv) {
      temp.push(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }));
    } else {
      temp.push(new webpack.optimize.OccurrenceOrderPlugin());
      temp.push(new webpack.HotModuleReplacementPlugin());
    }

    temp.push(new ExtractTextPlugin('app.css'));

    return temp;
  }(),
  resolve: {
    extensions: ['', '.js']  // 后缀名自动补全
  }
};