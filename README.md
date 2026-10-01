# FLIK 플릭 — React 쇼핑몰 데모

쿠팡 같은 대형 오픈마켓의 구조(검색, 카테고리, 타임딜, 랭킹, 상세, 장바구니, 결제)를 참고해
트렌디한 비주얼로 새로 만든 개발용 쇼핑몰입니다. React 18 + Vite, 외부 라이브러리 없음.

## 실행
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 생성
```

## Vercel 배포
1. 이 폴더를 GitHub 저장소에 push
2. vercel.com → Add New → Project → 저장소 Import
3. Framework Preset: **Vite** (자동 감지), Build: `npm run build`, Output: `dist`
4. Deploy

또는 CLI: `npm i -g vercel && vercel --prod`

`vercel.json`의 rewrite 설정 덕분에 `/product/1` 같은 주소로 새로고침해도 404가 나지 않습니다.

## 구조
```
src/
  data/products.js    상품·카테고리 목업 데이터 (API로 교체할 지점)
  router.jsx          의존성 없는 History API 라우터
  store.jsx           장바구니·찜·최근 본 상품 (localStorage 저장)
  components/         Header, ProductCard, Thumb, Stars, Toast, MobileNav ...
  pages/              Home, ListPage, ProductDetail, Cart, Checkout, OrderComplete
  styles.css          디자인 토큰 + 전체 스타일 (반응형)
```

## 실제 서비스로 확장하려면
- 상품 이미지: `components/Thumb.jsx`를 `<img src={product.image} />`로 교체
- 데이터: `data/products.js` 대신 API(fetch) 또는 Supabase/Firebase 연동
- 결제: `pages/Checkout.jsx`의 `submit`에 토스페이먼츠·포트원 등 PG SDK 연결
- 라우팅이 복잡해지면 `react-router-dom`으로 교체해도 됩니다
