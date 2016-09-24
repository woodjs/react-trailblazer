"use strict";

import React, {Component} from 'react';

export class Header extends Component {
  render() {
    return (
      <header>
        <a href="#" className="btn btn-back"></a>
        <div className="title">购买商品</div>
      </header>
    );
  }
}