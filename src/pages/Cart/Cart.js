import React from 'react';
import CartListSection from './CartListSection';
import CartTotalSection from './CartTotalSection';
import CartButton from './CartButton';
import CartTotalSectionFooter from './CartTotalSectionFooter';
import { BASE_URL } from '../../config';
import './Cart.scss';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
      totalAmount: 0,
      delivery: 0,
    };
  }

  getCartData = () => {
    console.log('지우고옴');
    fetch(`${BASE_URL}/orders/cart`, {
      headers: {
        Authorization: localStorage.getItem('TOKKEN'),
      },
    })
      .then(res => res.json())
      .then(cartData => {
        this.setState({
          cartData: cartData.RESULT,
        });
      });
  };

  componentDidMount() {
    // fetch(`${BASE_URL}/orders/cart`, {
    //   headers: {
    //     Authorization: localStorage.getItem('TOKKEN'),
    //   },
    // })
    //   .then(res => res.json())
    //   .then(cartData => {
    //     this.setState({
    //       cartData: cartData.RESULT,
    //     });
    //   });
    this.getCartData();
  }

  calculateTotal = price => {
    this.setState({
      totalAmount: Number(this.state.cartData.price) + price,
    });
  };

  quantityUpdate = idx => {
    const copy = this.state.cartData.map((product, index) => {
      if (idx === index) {
        return { ...product, quantity: product.quantity + 1 };
      } else {
        return product;
      }
    });
    this.setState({
      cartData: copy,
    });
  };

  quantitySubstract = idx => {
    const copySub = this.state.cartData.map((product, index) => {
      if (idx === index) {
        return { ...product, quantity: product.quantity - 1 };
      } else {
        return product;
      }
    });
    this.setState({
      cartData: copySub,
    });
  };

  ordered = idx => {
    fetch(`${BASE_URL}/orders/cart`, {
      headers: {
        Authorization: localStorage.getItem('TOKKEN'),
      },
      method: 'POST',
      body: JSON.stringify({
        item_id: this.state.cartData[idx].item_id,
        quantity: this.state.cartData[idx].quantity,
      }),
    })
      .then(res => res.json())
      .then(order => {
        alert('성공');
        //   this.props.push.history('/Payment');
      });
  };

  deleteproduct = idx => {
    console.log(this.state.cartData[idx].item_id);
    fetch(
      `${BASE_URL}/orders/cart?item_id=${this.state.cartData[idx].item_id}`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          item_id: this.state.cartData[idx].item_id,
          //quantity: this.state.cartData[idx].quantity,
        }),
        headers: {
          Authorization: localStorage.getItem('TOKKEN'),
        },
      }
    )
      .then(res => res.json())
      .then(res => {
        alert('성공');
        //this.history.
        this.getCartData();
      });
  };

  reviseQuantity = idx => {
    fetch(`${BASE_URL}/orders/cart`, {
      headers: {
        Authorization: localStorage.getItem('TOKKEN'),
      },
      method: 'PATCH',
      body: JSON.stringify({
        item_id: this.state.cartData[idx].item_id,
        quantity: this.state.cartData[idx].quantity,
      }),
    })
      .then(res => res.json())
      .then(revise => {
        alert('성공');
      });
  };

  render() {
    const { cartData } = this.state;

    // let originTotal = cartData.reduce((origin, arrayItem, index) => {
    //   origin =
    //     origin +
    //     Number(arrayItem[index].price) * Number(arrayItem[index].quantity);
    //   return origin;
    // });
    let originTotal = 0;
    for (let i = 0; i < cartData.length; i++) {
      originTotal += cartData[i].price * cartData[i].quantity;
    }

    // let total = cartData.reduce((total, arrayItem, index) => {
    //   total =
    //     total +
    //     Number(arrayItem[index].discount) * Number(arrayItem[index].quantity);
    //   return total;
    // });
    let total = 0;
    for (let i = 0; i < cartData.length; i++) {
      total += cartData[i].discount * cartData[i].quantity;
    }

    let deliveryFee = total > 30000 ? 0 : 2500;

    const component = this;
    const carts = this.state.cartData.map(function (cart, index) {
      return (
        <CartListSection
          name={cart.name}
          price={cart.price}
          discount={cart.discount}
          image={cart.image}
          total={total}
          deliveryFee={deliveryFee}
          quantity={cart.quantity}
          calculateTotal={component.calculateTotal}
          quantityUpdate={component.quantityUpdate}
          quantitySubstract={component.quantitySubstract}
          index={index}
          key={cart.cart_id}
          ordered={component.ordered}
          deleteproduct={component.deleteproduct}
          reviseQuantity={component.reviseQuantity}
        />
      );
    });

    return (
      <>
        <main>
          <div className="cart">
            <section className="cartTitleSection">
              <div className="cartTitle">SHOPPING CART</div>
            </section>
            <section className="cartListSetion">
              <div className="cartList">
                <div className="cartListTableTitleBox">
                  <p className="cartListTableTitle">
                    일반상품 ({cartData.length})
                  </p>
                </div>
                <table className="cartListTable">
                  <thead className="cartListTableIndex">
                    <tr>
                      <th> 이미지 </th>
                      <th> 상품정보 </th>
                      <th> 판매가 </th>
                      <th> 수량 </th>
                      <th> 배송비 </th>
                      <th> 합계 </th>
                      <th> 선택 </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </section>
            {carts}
            <CartTotalSectionFooter
              cartData={cartData}
              originTotal={originTotal}
              total={total}
              deliveryFee={deliveryFee}
            />
            <CartTotalSection
              cartData={cartData}
              originTotal={originTotal}
              total={total}
              deliveryFee={deliveryFee}
            />
            <CartButton cartData={cartData} />
          </div>
        </main>
      </>
    );
  }
}

export default Cart;