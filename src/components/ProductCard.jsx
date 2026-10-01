import { Link } from '../router';
import { useStore } from '../store';
import { formatPrice, arrivalLabel } from '../data/products';
import Thumb from './Thumb';
import Stars from './Stars';
import { HeartIcon, BoltIcon, CartIcon } from './Icons';

export default function ProductCard({ product, rank, compact }) {
  const { state, dispatch, showToast } = useStore();
  const wished = state.wish.includes(product.id);

  const addToCart = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', id: product.id, qty: 1, option: '기본' });
    showToast('장바구니에 담았어요', { label: '장바구니 보기', to: '/cart' });
  };

  return (
    <article className={`card ${compact ? 'card-compact' : ''}`}>
      <Link to={`/product/${product.id}`} className="card-link">
        <div className="card-media">
          <Thumb product={product} />
          {rank && <span className="card-rank">{rank}</span>}
          {product.deal && !rank && <span className="card-flag">타임딜</span>}
        </div>
        <div className="card-body">
          <h3 className="card-name">{product.name}</h3>
          <div className="card-price-row">
            <span className="discount">{product.discount}%</span>
            <span className="original">{formatPrice(product.originalPrice)}</span>
          </div>
          <div className="price">{formatPrice(product.price)}</div>
          {product.fast ? (
            <div className="fast-badge">
              <BoltIcon width={14} height={14} />
              번개배송 <span>{arrivalLabel()}</span>
            </div>
          ) : (
            <div className="ship-note">무료배송</div>
          )}
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>
      </Link>
      <button
        className={`wish-btn ${wished ? 'on' : ''}`}
        aria-label={wished ? '찜 해제' : '찜하기'}
        aria-pressed={wished}
        onClick={() => dispatch({ type: 'TOGGLE_WISH', id: product.id })}
      >
        <HeartIcon filled={wished} width={20} height={20} />
      </button>
      <button className="quick-cart" aria-label="장바구니 담기" onClick={addToCart}>
        <CartIcon width={18} height={18} />
      </button>
    </article>
  );
}
