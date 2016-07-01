"use strict";

import React, {Component} from 'react';
import {Router, Route, IndexRoute, browerHistory, hashHistory} from 'react-router';
import {Header} from '../component/common/index';

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Header}></Route>
  </Router>
);

export default router;