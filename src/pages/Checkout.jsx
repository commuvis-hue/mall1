import { useState } from 'react';
import { useRouter, Link } from '../router';
import { useStore } from '../store';
import { useCartSummary, Summary } from './Cart';
import Thumb from '../components/Thumb';

const PAYMENTS = ['플릭페이', '신용카드', '카카오페이', '네이버페이', '계좌이체'];

export default function Checkout() {
  const { navigate } = useRouter();
  const { dispatch } = useStore();
  const s = useCartSummary();
  const [form, setForm] = useState({ name: '', phone: '', address: '', memo: '문 앞에 놓아주세요' });
  const [pay, setPay] = useState(PAYMENTS[0]);
  const [error, setError] = useState('');

  if (s.checked.length === 0) {
    return (
      <main className="container page">
        <div className="empty">
          <div className="empty-emoji">🧾</div>
          <p>결제할 상품이 없어요. 장바구니에서 상품을 선택해 주세요.</p>
          <Link to="/cart" className="btn btn-primary">장바구니로 이동</Link>
        </div>
      </main>
    );
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = () => {
    if (!form.name || !form.phone || !form.address) {
      setError('받는 분, 연락처, 주소를 모두 입력해 주세요.');
      return;
    }
    const orderNo = `FL${Date.now().toString().slice(-9)}`;
    try {
      sessionStorage.setItem('flik-last-order', JSON.stringify({ orderNo, total: s.total, count: s.checked.length, name: form.name }));
    } catch {}
    dispatch({ type: 'REMOVE_CHECKED' });
    navigate('/order-complete');
  };

  return (
    <main className="container page">
      <h1 className="page-title">주문/결제</h1>
      <div className="cart-layout">
        <section className="checkout">
          <div className="panel">
            <h2>배송지</h2>
            <div className="form-grid">
              <label>받는 분<input value={form.name} onChange={set('name')} placeholder="홍길동" autoComplete="name" /></label>
              <label>연락처<input value={form.phone} onChange={set('phone')} placeholder="010-0000-0000" inputMode="tel" autoComplete="tel" /></label>
              <label className="full">주소<input value={form.address} onChange={set('address')} placeholder="서울시 강남구 테헤란로 000" autoComplete="street-address" /></label>
              <label className="full">배송 요청사항
                <select value={form.memo} onChange={set('memo')}>
                  <option>문 앞에 놓아주세요</option>
                  <option>경비실에 맡겨주세요</option>
                  <option>배송 전 연락 주세요</option>
                </select>
              </label>
            </div>
          </div>

          <div className="panel">
            <h2>주문 상품 {s.checked.length}개</h2>
            <ul className="order-items">
              {s.checked.map((l) => (
                <li key={`${l.id}-${l.option}`}>
                  <Thumb product={l.product} size="xs" />
                  <span>{l.product.name} · {l.option} · {l.qty}개</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <h2>결제 수단</h2>
            <div className="pay-grid">
              {PAYMENTS.map((p) => (
                <button key={p} className={`pay ${pay === p ? 'on' : ''}`} onClick={() => setPay(p)} aria-pressed={pay === p}>{p}</button>
              ))}
            </div>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
        </section>
        <Summary s={s} cta={`${s.total.toLocaleString()}원 결제하기`} onCta={submit} />
      </div>
    </main>
  );
}
