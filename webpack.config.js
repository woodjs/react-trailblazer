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
    publicPath: '/static/',  // html引用静态资源时的资源路径，幽灵文件夹
    path: path.join(__dirname, 'lib'),  // 打包输出的路径
    filename: 'bundle.js'  // 打包后的文件名
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'  // 双引号必须加
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css')
  ],
  resolve: {
    extensions: ['', '.js']  // 后缀名自动补全
  }
};