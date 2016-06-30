"use strict";

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/app'
  ],
  output: {
    path: path.join(__dirname, 'lib'),  // 打包输出的路径
    filename: '[name].js',  // 打包后的文件名
    publicPath: '/lib/'  // html引用时静态资源时的资源路径
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
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css')
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    extensions: ['', '.js']  // 后缀名自动补全
  }
};