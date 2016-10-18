import React, {Component} from 'react';

export class Product extends Component {

  render() {

    return (
      <div>
        {
          this.props.products && this.props.products.map((item, index) => {

            let content1, content2;

            if (item.isHasDiscount) {
              content1 = (<div className="product-discount-info"><label>优惠规则</label><p>{item.discountInfo}</p></div>);
              content2 = (<div className={item.productClassName ? 'product-buy ' + item.productClassName : "product-buy"}>
                <div className="price-info-item">优惠：<span>-{item.discountPrice}</span></div>
                <div className="price-info-item">实付款：<span className="real-price">{item.actualPrice}</span></div>
                <a className="btn btn-buy tap-area" href="javascript:;" data-href={item.url} data-productid={item.productId} onClick={this.buy}>购买</a>
              </div>);
            }

            return (
              <section className="box-product-info">
                <div className="product-title">{item.title}</div>
                <div className="product-price"><span>{item.originPrice}</span>/年</div>
                <div className="product-expire">购买后有效期至{item.date}</div>
                {content1}
                {content2}
              </section>
            );
          })
        }
      </div>
    );
  }

  buy() {
    alert('buy');
  }
}