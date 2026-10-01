import { useMemo, useState } from 'react';
import { useRouter, Link } from '../router';
import { useStore } from '../store';
import { CATEGORIES, PRODUCTS, getCategory } from '../data/products';
import ProductCard from '../components/ProductCard';

const SORTS = [
  { id: 'rec', label: '추천순' },
  { id: 'sold', label: '판매량순' },
  { id: 'low', label: '낮은가격순' },
  { id: 'high', label: '높은가격순' },
  { id: 'review', label: '리뷰많은순' },
];

const PRICE_RANGES = [
  { id: 'all', label: '전체', min: 0, max: Infinity },
  { id: 'u3', label: '3만원 이하', min: 0, max: 30000 },
  { id: '3-10', label: '3~10만원', min: 30000, max: 100000 },
  { id: '10-30', label: '10~30만원', min: 100000, max: 300000 },
  { id: 'o30', label: '30만원 이상', min: 300000, max: Infinity },
];

export default function ListPage({ mode, categoryId }) {
  const { search } = useRouter();
  const { state } = useStore();
  const params = new URLSearchParams(search);
  const q = params.get('q') || '';
  const [sort, setSort] = useState('rec');
  const [fastOnly, setFastOnly] = useState(params.get('fast') === '1');
  const [dealOnly, setDealOnly] = useState(params.get('deal') === '1');
  const [range, setRange] = useState('all');
  const [minRating, setMinRating] = useState(0);

  const base = useMemo(() => {
    if (mode === 'category') return PRODUCTS.filter((p) => p.category === categoryId);
    if (mode === 'wish') return state.wish.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    if (mode === 'search') return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    return PRODUCTS;
  }, [mode, categoryId, q, state.wish]);

  const items = useMemo(() => {
    const r = PRICE_RANGES.find((x) => x.id === range);
    let list = base.filter(
      (p) =>
        (!fastOnly || p.fast) &&
        (!dealOnly || p.deal) &&
        p.price >= r.min && p.price < r.max &&
        p.rating >= minRating
    );
    const sorters = {
      rec: (a, b) => b.rating * Math.log(b.reviews) - a.rating * Math.log(a.reviews),
      sold: (a, b) => b.sold - a.sold,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      review: (a, b) => b.reviews - a.reviews,
    };
    return [...list].sort(sorters[sort]);
  }, [base, fastOnly, dealOnly, range, minRating, sort]);

  const cat = categoryId && getCategory(categoryId);
  const title =
    mode === 'category' ? cat?.name :
    mode === 'wish' ? '찜한 상품' :
    mode === 'search' ? (q ? `‘${q}’ 검색 결과` : dealOnly ? '타임딜 전체' : fastOnly ? '번개배송 상품' : '전체 상품') :
    '전체 카테고리';

  if (mode === 'categories') {
    return (
      <main className="container page">
        <h1 className="page-title">전체 카테고리</h1>
        <div className="mega-grid static">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`} className="mega-item" style={{ '--h': c.hue }}>
              <span className="mega-emoji">{c.emoji}</span>
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="container page list-page">
      <aside className="filters" aria-label="필터">
        <h2>필터</h2>
        <label className="check">
          <input type="checkbox" checked={fastOnly} onChange={(e) => setFastOnly(e.target.checked)} />
          <span>⚡ 번개배송만 보기</span>
        </label>
        <label className="check">
          <input type="checkbox" checked={dealOnly} onChange={(e) => setDealOnly(e.target.checked)} />
          <span>⏰ 타임딜 상품만</span>
        </label>
        <fieldset>
          <legend>가격</legend>
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className="radio">
              <input type="radio" name="price" checked={range === r.id} onChange={() => setRange(r.id)} />
              <span>{r.label}</span>
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>평점</legend>
          {[0, 4.5, 4.7].map((v) => (
            <label key={v} className="radio">
              <input type="radio" name="rating" checked={minRating === v} onChange={() => setMinRating(v)} />
              <span>{v === 0 ? '전체' : `★ ${v} 이상`}</span>
            </label>
          ))}
        </fieldset>
      </aside>

      <section className="list-main">
        <div className="list-head">
          <h1 className="page-title">
            {cat && <span className="title-emoji">{cat.emoji}</span>}
            {title}
            <small>{items.length}개</small>
          </h1>
          <div className="sort" role="radiogroup" aria-label="정렬">
            {SORTS.map((s) => (
              <button key={s.id} role="radio" aria-checked={sort === s.id} className={sort === s.id ? 'on' : ''} onClick={() => setSort(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="empty">
            <div className="empty-emoji">{mode === 'wish' ? '💜' : '🔍'}</div>
            <p>{mode === 'wish' ? '하트를 눌러 마음에 드는 상품을 모아 보세요.' : '조건에 맞는 상품이 없어요. 필터를 줄이거나 다른 검색어를 입력해 보세요.'}</p>
            <Link to="/" className="btn btn-primary">추천 상품 보러 가기</Link>
          </div>
        ) : (
          <div className="grid grid-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </main>
  );
}
