import React, {Component} from 'react';
import {Router, Route, Link, IndexRoute, browerHistory, hashHistory} from 'react-router';
import Products from '../component/Products';


const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Products}></Route>
  </Router>
);

export default router;