import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './MainItem.scss';

class MainItem extends Component {
  goToDetail = () => {
    this.props.history.push(`/products/${this.props.id}`);
  };
  render() {
    const { name, image, discount, price, stock } = this.props;
    return (
      <li>
        <div className="wrap" onClick={this.goToDetail}>
          {stock === 0 && <div className="soldOut">SOLD OUT</div>}
          <div className="thumb">
            <div className="img">
              <img alt={name} src={image[0]}></img>
            </div>
          </div>
          <div className="content">
            <div className="tit">{name}</div>
            <div className={Number(discount) ? 'price sales' : 'price'}>
              <span className="cost">{Number(price).toLocaleString()} 원</span>
              {discount !== '0' && (
                <span className="salePrice">
                  할인 판매가 :
                  {(Number(price) - Number(discount)).toLocaleString()}원
                </span>
              )}
            </div>
          </div>
        </div>
      </li>
    );
  }
}
export default withRouter(MainItem);
