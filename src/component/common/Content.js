"use strict";

import React, {Component} from 'react';

export class Content extends Component {
  handlePayItemClick() {
    alert(1);
  }

  render() {
    return (

      <section className="app-main">
        <section className="box-product-info">
          <div className="product-title">正版SGMW-EPC移动版（最齐全、最准确、最及时  ）</div>
          <div className="product-price"><span>￥600.00</span>/年</div>
          <div className="product-expire">购买后有效期至2016-09-20</div>
          <div className="product-discount-info">
            <label>优惠规则</label>
            <ul>
              <li>优惠规则优惠规则优惠规则优惠规则优惠规则优惠规则优惠规则优惠规则优惠规则优惠规则</li>
              <li className="discount-price">优惠：<span>-￥600.00</span></li>
            </ul>
          </div>
        </section>
        <section className="box-pay-list">
          <div className="pay-item pay-wx" onClick={this.handlePayItemClick}>
            <i className="icon"></i>
            <span>￥600.00</span>
            <div>微信支付</div>
          </div>
          <div className="pay-item pay-zfb">
            <i className="icon"></i>
            <span>￥600.00</span>
            <div>支付宝支付</div>
          </div>
        </section>
      </section>
    );
  }
}