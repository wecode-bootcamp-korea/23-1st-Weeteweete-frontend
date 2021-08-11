import React from 'react';
import './PaymentOrderDetails.scss';

class PaymentOrderDetails extends React.Component {
  render() {
    return (
      <main className="paymentOrderDetails">
        <section className="orderProductList">
          <ul>
            <li>
              <i className="faExclamation">!</i>
              상품의 옵션 및 수량 변경은 상품상세 또는 장바구니에서 가능합니다.
            </li>
          </ul>
          <header className="tableTitle">
            <h3>국내배송상품 주문내역</h3>
          </header>
          <table className="orderDetailsTable">
            {ORDER_DETAILS_LIST.map(list => {
              const { key, content } = list;
              return (
                <th className="tableStyle" key={key}>
                  {content}
                </th>
              );
            })}
            <tr>
              <td className="tableline">{'img'}</td>
              <td className="tableline">{'product'}</td>
              <th className="tableline">{'price'}</th>
              <th className="tableline">{'quantity'}</th>
              <th className="tableline">{'delivery'}</th>
              <th className="tableline">{'delivery fee'}</th>
              <th className="tableline">{'total'}</th>
            </tr>
            <th colspan="9" className="totalPrice">
              <strong>기본배송</strong> 상품구매금액 {''}+ 배송비 {''} -
              상품할인금액 {''} = 합계:
              <span>
                {''}
                <strong>원</strong>
              </span>
            </th>
          </table>
          <ul>
            <li>
              <i className="faExclamation">!</i>
              상품의 옵션 및 수량 변경은 상품상세 또는 장바구니에서 가능합니다.
            </li>
          </ul>
        </section>
      </main>
    );
  }
}

const ORDER_DETAILS_LIST = [
  { key: 0, content: '이미지' },
  { key: 1, content: '상품정보' },
  { key: 2, content: '판매가' },
  { key: 3, content: '수량' },
  { key: 4, content: '배송구분' },
  { key: 5, content: '배송비' },
  { key: 6, content: '합계' },
];

export default PaymentOrderDetails;