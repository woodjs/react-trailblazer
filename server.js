"use strict";

let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let express = require('express');
let config = require('./webpack.config');

let app = new express();
let port = 3000;
let compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  quite: true,
  publicPath: config.output.publicPath,
  stats: {colors: true}
}));

app.use(webpackHotMiddleware(compiler));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(port, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.info("Listening on port %s!", port);
  }
});