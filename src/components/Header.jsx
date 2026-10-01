import { useEffect, useRef, useState } from 'react';
import { Link, useRouter } from '../router';
import { useStore } from '../store';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { SearchIcon, CartIcon, HeartIcon, MenuIcon, UserIcon, XIcon } from './Icons';

const HOT_KEYWORDS = ['헤드폰', '딸기', '선크림', '에어프라이어', '요가매트', '기저귀'];

export default function Header() {
  const { navigate, path, search } = useRouter();
  const { state, dispatch, cartCount } = useStore();
  const [q, setQ] = useState(() => new URLSearchParams(search).get('q') || '');
  const [focused, setFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const boxRef = useRef();

  useEffect(() => setMenuOpen(false), [path, search]);

  useEffect(() => {
    const close = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setFocused(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const go = (keyword) => {
    const k = keyword.trim();
    if (!k) return;
    dispatch({ type: 'SEARCH', q: k });
    setQ(k);
    setFocused(false);
    navigate(`/search?q=${encodeURIComponent(k)}`);
  };

  const suggestions = q.trim()
    ? PRODUCTS.filter((p) => p.name.includes(q.trim())).slice(0, 6)
    : [];

  return (
    <header className="header">
      <div className="topbar">
        <div className="container topbar-inner">
          <p>첫 구매 고객 <strong>15% 쿠폰</strong> 즉시 지급 · 19,800원 이상 무료배송</p>
          <nav aria-label="고객 메뉴">
            <a href="#login">로그인</a>
            <a href="#join">회원가입</a>
            <a href="#help">고객센터</a>
          </nav>
        </div>
      </div>

      <div className="container header-main">
        <button
          className="menu-btn"
          aria-expanded={menuOpen}
          aria-label="카테고리 열기"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <XIcon /> : <MenuIcon />}
          <span>카테고리</span>
        </button>

        <Link to="/" className="logo" aria-label="FLIK 홈">
          <span className="logo-mark">FLIK</span>
          <span className="logo-sub">플릭</span>
        </Link>

        <div className="search" ref={boxRef}>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              go(q);
            }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="찾고 싶은 상품을 검색해 보세요"
              aria-label="상품 검색"
            />
            <button type="submit" aria-label="검색">
              <SearchIcon />
            </button>
          </form>
          {focused && (
            <div className="search-pop">
              {suggestions.length > 0 ? (
                <ul className="suggest-list">
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <button onMouseDown={() => { setFocused(false); navigate(`/product/${p.id}`); }}>
                        <span>{p.emoji}</span> {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  {state.searches.length > 0 && (
                    <div className="pop-section">
                      <div className="pop-head">
                        <h4>최근 검색어</h4>
                        <button onMouseDown={() => dispatch({ type: 'CLEAR_SEARCHES' })}>전체 삭제</button>
                      </div>
                      <div className="chips">
                        {state.searches.map((s) => (
                          <button key={s} className="chip" onMouseDown={() => go(s)}>{s}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="pop-section">
                    <h4>지금 뜨는 검색어</h4>
                    <ol className="hot-list">
                      {HOT_KEYWORDS.map((k, i) => (
                        <li key={k}>
                          <button onMouseDown={() => go(k)}>
                            <b>{i + 1}</b> {k}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <nav className="header-actions" aria-label="내 메뉴">
          <Link to="/wish" className="action">
            <HeartIcon />
            <span>찜</span>
            {state.wish.length > 0 && <em className="count">{state.wish.length}</em>}
          </Link>
          <Link to="/cart" className="action">
            <CartIcon />
            <span>장바구니</span>
            {cartCount > 0 && <em className="count">{cartCount}</em>}
          </Link>
          <a href="#my" className="action hide-sm">
            <UserIcon />
            <span>마이플릭</span>
          </a>
        </nav>
      </div>

      <nav className="container cat-strip" aria-label="카테고리">
        {CATEGORIES.map((c) => (
          <Link key={c.id} to={`/category/${c.id}`} className={path === `/category/${c.id}` ? 'on' : ''}>
            {c.name}
          </Link>
        ))}
      </nav>

      {menuOpen && (
        <div className="mega">
          <div className="container mega-grid">
            {CATEGORIES.map((c) => (
              <Link key={c.id} to={`/category/${c.id}`} className="mega-item" style={{ '--h': c.hue }}>
                <span className="mega-emoji">{c.emoji}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
