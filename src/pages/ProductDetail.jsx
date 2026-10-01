import { useEffect, useState } from 'react';
import { Link, useRouter } from '../router';
import { useStore } from '../store';
import { PRODUCTS, getProduct, getCategory, formatPrice, arrivalLabel } from '../data/products';
import Thumb from '../components/Thumb';
import Stars from '../components/Stars';
import ProductCard from '../components/ProductCard';
import { HeartIcon, BoltIcon } from '../components/Icons';
import NotFound from './NotFound';

const OPTIONS = {
  fashion: ['S', 'M', 'L', 'XL'],
  digital: ['블랙', '화이트', '실버'],
  beauty: ['단품', '2개 세트', '3개 세트'],
};

const REVIEWS = [
  { name: '김*연', rating: 5, text: '배송이 정말 다음날 아침에 왔어요. 포장도 꼼꼼하고 사진이랑 똑같아요.' },
  { name: '박*준', rating: 5, text: '가격 대비 만족도 최고입니다. 재구매 의사 있어요.' },
  { name: '이*나', rating: 4, text: '전체적으로 좋은데 생각보다 사이즈가 조금 커요. 참고하세요.' },
];

export default function ProductDetail({ id }) {
  const product = getProduct(id);
  const { navigate } = useRouter();
  const { state, dispatch, showToast } = useStore();
  const [view, setView] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('info');
  const options = OPTIONS[product?.category] || ['기본'];
  const [option, setOption] = useState(options[0]);

  useEffect(() => {
    if (product) dispatch({ type: 'VIEW', id: product.id });
  }, [product?.id]);

  if (!product) return <NotFound />;

  const cat = getCategory(product.category);
  const wished = state.wish.includes(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id)
    .concat(PRODUCTS.filter((p) => p.category !== product.category && p.deal))
    .slice(0, 5);

  const add = () => {
    dispatch({ type: 'ADD_TO_CART', id: product.id, qty, option });
    showToast(`${qty}개를 장바구니에 담았어요`, { label: '장바구니 보기', to: '/cart' });
  };
  const buyNow = () => {
    dispatch({ type: 'ADD_TO_CART', id: product.id, qty, option });
    navigate('/cart');
  };

  return (
    <main className="container page">
      <nav className="crumbs" aria-label="경로">
        <Link to="/">홈</Link> <span>›</span> <Link to={`/category/${cat.id}`}>{cat.name}</Link>
      </nav>

      <div className="pdp">
        <div className="gallery">
          <div className="gallery-main">
            <Thumb product={product} size="lg" variant={view} />
            {product.deal && <span className="card-flag big">타임딜</span>}
          </div>
          <div className="gallery-thumbs">
            {[0, 1, 2, 3].map((v) => (
              <button key={v} className={view === v ? 'on' : ''} onClick={() => setView(v)} aria-label={`이미지 ${v + 1}`}>
                <Thumb product={product} size="xs" variant={v} />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <p className="brand">FLIK 공식 셀러 · {cat.name}</p>
          <h1>{product.name}</h1>
          <Stars rating={product.rating} reviews={product.reviews} />

          <div className="pdp-price">
            <div>
              <span className="discount big">{product.discount}%</span>
              <span className="original">{formatPrice(product.originalPrice)}</span>
            </div>
            <strong>{formatPrice(product.price)}</strong>
            <p className="coupon">첫 구매 쿠폰 적용 시 <b>{formatPrice(Math.round(product.price * 0.85 / 10) * 10)}</b></p>
          </div>

          <dl className="ship">
            <dt>배송</dt>
            <dd>
              {product.fast ? (
                <span className="fast-badge"><BoltIcon width={14} height={14} />번개배송 <span>{arrivalLabel()}</span></span>
              ) : '일반배송 · 2~3일 소요'}
              <small>19,800원 이상 무료배송 · 30일 무료반품</small>
            </dd>
            <dt>적립</dt>
            <dd>최대 {Math.round(product.price * 0.05).toLocaleString()}P (플릭 패스 5%)</dd>
          </dl>

          <div className="opt">
            <span className="opt-label">옵션</span>
            <div className="chips">
              {options.map((o) => (
                <button key={o} className={`chip ${option === o ? 'on' : ''}`} onClick={() => setOption(o)} aria-pressed={option === o}>{o}</button>
              ))}
            </div>
          </div>

          <div className="qty-row">
            <div className="stepper" aria-label="수량">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="수량 줄이기">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(Math.min(99, qty + 1))} aria-label="수량 늘리기">+</button>
            </div>
            <div className="total">
              총 상품금액 <strong>{formatPrice(product.price * qty)}</strong>
            </div>
          </div>

          <div className="buy-row">
            <button className={`icon-btn ${wished ? 'on' : ''}`} onClick={() => dispatch({ type: 'TOGGLE_WISH', id: product.id })} aria-label="찜하기" aria-pressed={wished}>
              <HeartIcon filled={wished} />
            </button>
            <button className="btn btn-outline" onClick={add}>장바구니 담기</button>
            <button className="btn btn-primary" onClick={buyNow}>바로 구매</button>
          </div>
        </div>
      </div>

      <div className="pdp-tabs" role="tablist">
        {[['info', '상품정보'], ['review', `리뷰 ${product.reviews.toLocaleString()}`], ['qna', '문의']].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      <section className="pdp-panel">
        {tab === 'info' && (
          <div className="info-panel">
            <Thumb product={product} size="lg" variant={2} />
            <div>
              <h3>이런 분께 추천해요</h3>
              <p>매일 쓰는 물건일수록 좋은 걸 고르고 싶은 분, 빠른 배송이 중요한 분께 잘 맞는 상품이에요. 판매량 상위 {Math.max(1, 40 - product.discount)}% 안에 드는 인기 상품입니다.</p>
              <table className="spec">
                <tbody>
                  <tr><th>판매자</th><td>FLIK 공식 셀러</td></tr>
                  <tr><th>원산지</th><td>상세페이지 참조</td></tr>
                  <tr><th>누적 판매</th><td>{product.sold.toLocaleString()}개</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'review' && (
          <ul className="reviews">
            {REVIEWS.map((r, i) => (
              <li key={i}>
                <div className="review-head"><b>{r.name}</b><span className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span></div>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        )}
        {tab === 'qna' && (
          <div className="empty small">
            <p>아직 등록된 문의가 없어요. 궁금한 점을 판매자에게 물어보세요.</p>
            <button className="btn btn-outline">상품 문의하기</button>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head"><h2>함께 보면 좋은 상품</h2></div>
        <div className="grid grid-5">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <div className="sticky-buy">
        <strong>{formatPrice(product.price * qty)}</strong>
        <button className="btn btn-outline" onClick={add}>담기</button>
        <button className="btn btn-primary" onClick={buyNow}>바로 구매</button>
      </div>
    </main>
  );
}
