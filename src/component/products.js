import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';

import {Product} from './common/product';
import {showProductList} from '../action/index';

class Products extends Component {
  render() {
    let content;

    if (this.props.products && this.props.products.data && this.props.products.data.length) {
      content = <Product products={this.props.products.data}></Product>
    } else {
      content = <div className="loading" id="product-list-loading"><span>加载中...</span></div>;
    }

    return (
      <section className="app-container">
        <header>
          <a href="javascript:;" className="btn btn-back" onClick={this.goBack}></a>
          <div className="title">购买商品</div>
        </header>
        <section className="app-main" id="product-list">
          {content}
        </section>
      </section>
    );
  }

  componentDidMount() {

    this.getData();

  }

  getData() {
    var self = this;
    let {dispatch} = this.props;

    fetch('/products.json')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTimeout(function () {
          dispatch(showProductList(data));
        }, 2000)
      })
      .catch(err => {
        console.log(err);
      });
  }

  goBack() {
    console.log('go back to app!');
  }
}

function select(state) {
    return state;
}

export default connect(select)(Products);