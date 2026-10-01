import { Link, useRouter } from '../router';
import { useStore } from '../store';
import { getProduct, formatPrice, FREE_SHIPPING_MIN, SHIPPING_FEE } from '../data/products';
import Thumb from '../components/Thumb';
import { XIcon, BoltIcon } from '../components/Icons';

export function useCartSummary() {
  const { state } = useStore();
  const lines = state.cart.map((item, index) => ({ ...item, index, product: getProduct(item.id) })).filter((l) => l.product);
  const checked = lines.filter((l) => l.checked);
  const original = checked.reduce((n, l) => n + l.product.originalPrice * l.qty, 0);
  const subtotal = checked.reduce((n, l) => n + l.product.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
  return { lines, checked, original, subtotal, discount: original - subtotal, shipping, total: subtotal + shipping };
}

export function Summary({ s, cta, onCta, disabled }) {
  const remain = FREE_SHIPPING_MIN - s.subtotal;
  return (
    <aside className="summary">
      <h2>결제 예정 금액</h2>
      <dl>
        <dt>상품금액</dt><dd>{formatPrice(s.original)}</dd>
        <dt>할인금액</dt><dd className="minus">−{formatPrice(s.discount)}</dd>
        <dt>배송비</dt><dd>{s.shipping ? `+${formatPrice(s.shipping)}` : '무료'}</dd>
      </dl>
      {s.subtotal > 0 && remain > 0 && (
        <div className="free-ship">
          <p>{formatPrice(remain)} 더 담으면 무료배송</p>
          <div className="bar"><span style={{ width: `${(s.subtotal / FREE_SHIPPING_MIN) * 100}%` }} /></div>
        </div>
      )}
      <div className="sum-total">
        <span>총 결제금액</span>
        <strong>{formatPrice(s.total)}</strong>
      </div>
      <button className="btn btn-primary block" disabled={disabled} onClick={onCta}>{cta}</button>
    </aside>
  );
}

export default function Cart() {
  const { dispatch } = useStore();
  const { navigate } = useRouter();
  const s = useCartSummary();
  const allChecked = s.lines.length > 0 && s.lines.every((l) => l.checked);

  if (s.lines.length === 0) {
    return (
      <main className="container page">
        <h1 className="page-title">장바구니</h1>
        <div className="empty">
          <div className="empty-emoji">🛒</div>
          <p>장바구니가 비어 있어요. 오늘의 타임딜부터 둘러보세요.</p>
          <Link to="/" className="btn btn-primary">쇼핑 계속하기</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container page">
      <h1 className="page-title">장바구니 <small>{s.lines.length}개</small></h1>
      <div className="cart-layout">
        <section>
          <div className="cart-toolbar">
            <label className="check">
              <input type="checkbox" checked={allChecked} onChange={(e) => dispatch({ type: 'CHECK_ALL', value: e.target.checked })} />
              <span>전체선택 ({s.checked.length}/{s.lines.length})</span>
            </label>
            <button className="text-btn" onClick={() => dispatch({ type: 'REMOVE_CHECKED' })}>선택삭제</button>
          </div>
          <ul className="cart-list">
            {s.lines.map((l) => (
              <li key={`${l.id}-${l.option}`} className="cart-line">
                <input type="checkbox" checked={l.checked} onChange={() => dispatch({ type: 'TOGGLE_CHECK', index: l.index })} aria-label={`${l.product.name} 선택`} />
                <Link to={`/product/${l.id}`} className="cart-thumb"><Thumb product={l.product} size="sm" /></Link>
                <div className="cart-info">
                  <Link to={`/product/${l.id}`} className="cart-name">{l.product.name}</Link>
                  <p className="cart-opt">옵션: {l.option}</p>
                  {l.product.fast && <span className="fast-badge"><BoltIcon width={13} height={13} />번개배송</span>}
                </div>
                <div className="stepper sm">
                  <button onClick={() => dispatch({ type: 'SET_QTY', index: l.index, qty: l.qty - 1 })} aria-label="수량 줄이기">−</button>
                  <span>{l.qty}</span>
                  <button onClick={() => dispatch({ type: 'SET_QTY', index: l.index, qty: l.qty + 1 })} aria-label="수량 늘리기">+</button>
                </div>
                <div className="cart-price">
                  <span className="original">{formatPrice(l.product.originalPrice * l.qty)}</span>
                  <strong>{formatPrice(l.product.price * l.qty)}</strong>
                </div>
                <button className="remove" onClick={() => dispatch({ type: 'REMOVE', index: l.index })} aria-label="삭제"><XIcon width={18} height={18} /></button>
              </li>
            ))}
          </ul>
        </section>
        <Summary s={s} cta={`${s.checked.length}개 상품 구매하기`} disabled={!s.checked.length} onCta={() => navigate('/checkout')} />
      </div>
    </main>
  );
}
