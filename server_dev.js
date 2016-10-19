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

app.get('/products.json', function (req, res) {
  res.sendFile(__dirname + '/src/mock/products.json')
});

app.get('/order.json', function (req, res) {
  res.sendFile(__dirname + '/src/mock/order.json')
});

app.get('/province.json', function (req, res) {
  res.sendFile(__dirname + '/src/mock/province.json')
});

app.get('/city.json', function (req, res) {
  res.sendFile(__dirname + '/src/mock/city.json')
});

app.get('/area.json', function (req, res) {
  res.sendFile(__dirname + '/src/mock/area.json')
});

app.listen(port, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.info("Listening on port %s!", port);
  }
});