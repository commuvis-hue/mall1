import { Link } from '../router';
import { formatPrice, arrivalLabel } from '../data/products';

export default function OrderComplete() {
  let order = null;
  try { order = JSON.parse(sessionStorage.getItem('flik-last-order')); } catch {}
  return (
    <main className="container page">
      <div className="complete">
        <div className="complete-burst" aria-hidden="true">🎉</div>
        <h1>주문이 완료됐어요</h1>
        {order ? (
          <p>
            {order.name}님, 주문번호 <b>{order.orderNo}</b>로 {order.count}개 상품
            {' '}{formatPrice(order.total)} 결제가 접수됐어요.<br />번개배송 상품은 {arrivalLabel()}.
          </p>
        ) : (
          <p>주문 내역은 마이플릭에서 확인할 수 있어요.</p>
        )}
        <p className="fine">데모 사이트라 실제 결제는 이루어지지 않았습니다.</p>
        <Link to="/" className="btn btn-primary">쇼핑 계속하기</Link>
      </div>
    </main>
  );
}
