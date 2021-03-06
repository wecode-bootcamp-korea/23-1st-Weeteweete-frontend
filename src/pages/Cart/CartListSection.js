import React from 'react';
import './CartListSection.scss';

class CartListSection extends React.Component {
  add = e => {
    this.props.changeQuantity(this.props.index, e.target.name);
    this.props.calculateTotal(this.props.price);
  };

  substract = e => {
    if (this.props.quantity > 1) {
      this.props.changeQuantity(this.props.index, e.target.name);
      this.props.calculateTotal(-1 * this.props.price);
    } else {
      alert('최소 수량은 1개입니다. ');
    }
  };

  render() {
    const { name, price, discount, image, quantity, deliveryFee, index } =
      this.props;

    return (
      <section className="cartListSetion">
        <div className="cartList">
          <table className="cartListTable">
            <tbody className="cartListTableBody">
              <tr>
                <td>
                  <img className="cartImage" alt={name} src={image} />
                </td>
                <td className="productInfo">{name}</td>
                <td>
                  <p className="realPrice">
                    {Number(price).toLocaleString()}원
                  </p>
                  <p> {Number(price - discount).toLocaleString()}원 </p>
                </td>
                <td>
                  <div className="quantityTable">
                    <input
                      className="cartQuantity"
                      value={quantity}
                      type="text"
                      min="1"
                      max="100"
                      disabled
                    />
                    <div className="quantitybtn">
                      <button
                        className="quantityPlus"
                        onClick={this.add}
                        name="quantityPlus"
                      >
                        <img
                          alt="plusQuantity"
                          src="https:img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_up.gif"
                        />
                      </button>
                      <button
                        className="quantityMinus"
                        onClick={this.substract}
                        name="quantityMinus"
                      >
                        <img
                          alt="plusQuantity"
                          src="https:img.echosting.cafe24.com/skin/base_ko_KR/product/btn_count_down.gif"
                        />
                      </button>
                      <button
                        className="quantityChange"
                        onClick={() => this.props.reviseQuantity(index)}
                      >
                        변경
                      </button>
                    </div>
                  </div>
                </td>
                <td> {deliveryFee.toLocaleString()}</td>
                <td>
                  {(Number(price - discount) * quantity).toLocaleString()}원
                </td>
                <td className="selecteMenu">
                  <p>
                    <button
                      className="cartOrder"
                      onClick={() => this.props.ordered(index)}
                    >
                      주문하기
                    </button>
                  </p>
                  <p>
                    <button
                      className="cartDelete"
                      onClick={() => this.props.deleteproduct(index)}
                    >
                      x 삭제
                    </button>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default CartListSection;
