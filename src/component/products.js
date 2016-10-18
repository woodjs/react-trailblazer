import React, {Component} from 'react';

import products from '../mock/products';
import {Product} from './common/product';

export class Products extends Component {

  getData() {
    return products;
  }

  render() {
    let data = this.getData();

    return (
      <section className="app-container">
        <header>
          <a href="javascript:;" className="btn btn-back"></a>
          <div className="title">购买商品</div>
        </header>
        <section  className="app-main" id="product-list">
          <Product products={data}></Product>
        </section>
      </section>
    );
  }
}