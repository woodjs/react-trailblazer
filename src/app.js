"use strict";

import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import store from './store/index';
import {Header} from './components/common/index';

import './static/scss/app.scss';

store.subscribe(function () {
  console.log(store.getState());
});

ReactDom.render(
  <Provider store={store}>
    <Header />
  </Provider>,
  document.getElementById('root')
);