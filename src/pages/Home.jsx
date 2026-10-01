import { useEffect, useState, useRef } from 'react';
import { Link } from '../router';
import { useStore } from '../store';
import { CATEGORIES, PRODUCTS, formatPrice, getProduct } from '../data/products';
import ProductCard from '../components/ProductCard';
import Thumb from '../components/Thumb';
import useCountdown from '../components/useCountdown';
import { ChevronLeft, ChevronRight, BoltIcon } from '../components/Icons';

const SLIDES = [
  { title: '가을 신상\n최대 70%', sub: '패션 신상품 2,400종 할인', to: '/category/fashion', theme: 'violet', emoji: '🧥' },
  { title: '밤 12시 전 주문\n내일 아침 도착', sub: '번개배송 상품만 모았어요', to: '/search?q=&fast=1', theme: 'coral', emoji: '⚡' },
  { title: '산지직송\n제철 과일 페스타', sub: '딸기·감귤 오늘만 특가', to: '/category/food', theme: 'sun', emoji: '🍊' },
];

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [paused]);
  const s = SLIDES[i];

  return (
    <section
      className={`hero hero-${s.theme}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="hero-copy" key={i}>
        <h1>{s.title}</h1>
        <p>{s.sub}</p>
        <Link to={s.to} className="btn btn-light">기획전 보기</Link>
      </div>
      <div className="hero-art" aria-hidden="true" key={`a${i}`}>{s.emoji}</div>
      <div className="hero-ctrl">
        <button aria-label="이전 배너" onClick={() => setI((i - 1 + SLIDES.length) % SLIDES.length)}><ChevronLeft /></button>
        <span>{i + 1} / {SLIDES.length}</span>
        <button aria-label="다음 배너" onClick={() => setI((i + 1) % SLIDES.length)}><ChevronRight /></button>
      </div>
    </section>
  );
}

function DealClock() {
  const { h, m, s } = useCountdown();
  const top = PRODUCTS.filter((p) => p.deal).sort((a, b) => b.discount - a.discount)[0];
  return (
    <Link to={`/product/${top.id}`} className="deal-clock">
      <div className="deal-clock-head">
        <BoltIcon width={18} height={18} /> 오늘의 타임딜 종료까지
      </div>
      <div className="clock" aria-label={`${h}시간 ${m}분 ${s}초 남음`}>
        <span>{h}</span><i>:</i><span>{m}</span><i>:</i><span>{s}</span>
      </div>
      <div className="deal-clock-item">
        <Thumb product={top} size="sm" />
        <div>
          <p>{top.name}</p>
          <strong><em>{top.discount}%</em> {formatPrice(top.price)}</strong>
        </div>
      </div>
    </Link>
  );
}

function Rail({ children, label }) {
  const ref = useRef();
  const scroll = (dir) => ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <div className="rail-wrap">
      <button className="rail-btn left" aria-label={`${label} 이전`} onClick={() => scroll(-1)}><ChevronLeft /></button>
      <div className="rail" ref={ref}>{children}</div>
      <button className="rail-btn right" aria-label={`${label} 다음`} onClick={() => scroll(1)}><ChevronRight /></button>
    </div>
  );
}

export default function Home() {
  const { state } = useStore();
  const [tab, setTab] = useState(CATEGORIES[0].id);
  const deals = PRODUCTS.filter((p) => p.deal);
  const ranking = [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 10);
  const recent = state.recent.map(getProduct).filter(Boolean);

  return (
    <main className="container home">
      <div className="hero-grid">
        <Hero />
        <DealClock />
      </div>

      <nav className="cat-rail" aria-label="카테고리 바로가기">
        {CATEGORIES.map((c) => (
          <Link key={c.id} to={`/category/${c.id}`} className="cat-bubble" style={{ '--h': c.hue }}>
            <span className="bubble">{c.emoji}</span>
            <span>{c.name}</span>
          </Link>
        ))}
      </nav>

      <section className="section">
        <div className="section-head">
          <h2>타임딜 · 오늘 자정까지</h2>
          <Link to="/search?q=&deal=1" className="more">전체보기</Link>
        </div>
        <Rail label="타임딜">
          {deals.map((p) => (
            <div className="rail-item" key={p.id}><ProductCard product={p} /></div>
          ))}
        </Rail>
      </section>

      <section className="section ranking">
        <div className="section-head">
          <h2>지금 가장 많이 담는 상품</h2>
          <span className="muted">실시간 판매량 기준</span>
        </div>
        <div className="grid grid-5">
          {ranking.map((p, idx) => (
            <ProductCard key={p.id} product={p} rank={idx + 1} />
          ))}
        </div>
      </section>

      <section className="promo-band">
        <div>
          <h2>플릭 패스로 매일 무료배송</h2>
          <p>월 2,900원으로 무료배송·무료반품·전용 쿠폰까지 한 번에.</p>
        </div>
        <a href="#pass" className="btn btn-sun">한 달 무료로 시작하기</a>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>카테고리별 추천</h2>
        </div>
        <div className="tabs" role="tablist">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={tab === c.id}
              className={`tab ${tab === c.id ? 'on' : ''}`}
              onClick={() => setTab(c.id)}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
        <div className="grid grid-5" role="tabpanel">
          {PRODUCTS.filter((p) => p.category === tab).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {recent.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>최근 본 상품</h2></div>
          <Rail label="최근 본 상품">
            {recent.map((p) => (
              <div className="rail-item" key={p.id}><ProductCard product={p} compact /></div>
            ))}
          </Rail>
        </section>
      )}
    </main>
  );
}
