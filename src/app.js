import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import store from './store/index';
import router from './router/index';

import './static/scss/app.scss';

store.subscribe(function () {
  // console.log(store.getState());
});

ReactDom.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('container')
);