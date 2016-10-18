import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';

import {Product} from './common/product';

export class Products extends Component {

  getData() {
    fetch('/products.json')
      .then(res => {
        return res.json();
      })
      .then(data => {
        return console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    return (
      <section className="app-container">
        <header>
          <a href="javascript:;" className="btn btn-back" onClick={this.goBack}></a>
          <div className="title">购买商品</div>
        </header>
        <section className="app-main" id="product-list">
          <div className="loading" id="product-list-loading"><span>加载中...</span></div>
        </section>
      </section>
    );
  }

  componentDidMount() {
    let data = this.getData();

  }

  goBack() {
    console.log('go back to app!');
  }
}