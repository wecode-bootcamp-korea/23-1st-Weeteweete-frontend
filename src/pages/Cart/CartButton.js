import React from 'react';
import './CartButton.scss';

class CartButton extends React.Component {
  render() {
    return (
      <section>
        <div className="cartButton">
          <button
            className="cartOrderbtn"
            onClick={() => {
              this.props.orderedAll();
            }}
          >
            {' '}
            전체상품주문
          </button>
          <button className="cartKeepShopping"> 쇼핑계속하기</button>
        </div>
      </section>
    );
  }
}

export default CartButton;
