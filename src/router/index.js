"use strict";

import React, {Component} from 'react';
import {Router, Route, Link, IndexRoute, browerHistory, hashHistory} from 'react-router';
import {Pay} from '../component/Pay';

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Pay}></Route>
  </Router>
);

export default router;