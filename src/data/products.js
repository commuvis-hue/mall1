export const CATEGORIES = [
  { id: 'fashion', name: '패션의류', emoji: '👗', hue: 330 },
  { id: 'beauty', name: '뷰티', emoji: '💄', hue: 350 },
  { id: 'food', name: '식품', emoji: '🍓', hue: 10 },
  { id: 'kitchen', name: '주방용품', emoji: '🍳', hue: 35 },
  { id: 'living', name: '생활·인테리어', emoji: '🛋️', hue: 160 },
  { id: 'digital', name: '가전디지털', emoji: '🎧', hue: 250 },
  { id: 'sports', name: '스포츠·레저', emoji: '⛺', hue: 120 },
  { id: 'baby', name: '출산·유아동', emoji: '🧸', hue: 45 },
  { id: 'pet', name: '반려동물', emoji: '🐶', hue: 25 },
  { id: 'books', name: '도서·음반', emoji: '📚', hue: 200 },
];

// [id, 카테고리, 이름, 정가, 할인율, 평점, 리뷰수, 이모지, 번개배송, 타임딜]
const RAW = [
  [1, 'digital', '노이즈캔슬링 무선 헤드폰 프로 2세대', 389000, 32, 4.8, 12840, '🎧', true, true],
  [2, 'digital', '초경량 14인치 노트북 i7 16GB 512GB', 1590000, 18, 4.7, 3210, '💻', true, false],
  [3, 'digital', '스마트워치 액티브 GPS 44mm', 329000, 25, 4.6, 8420, '⌚', true, true],
  [4, 'digital', '4K 미니 빔프로젝터 무선 미러링', 459000, 41, 4.5, 2190, '📽️', false, false],
  [5, 'digital', '게이밍 기계식 키보드 RGB 갈축', 129000, 35, 4.7, 5630, '⌨️', true, false],
  [6, 'fashion', '오버핏 헤비코튼 반팔 티셔츠 3팩', 59000, 45, 4.6, 21030, '👕', true, true],
  [7, 'fashion', '와이드 데님 팬츠 스톤워시', 69000, 30, 4.4, 7820, '👖', true, false],
  [8, 'fashion', '경량 패딩 베스트 남녀공용', 89000, 52, 4.5, 4410, '🧥', false, true],
  [9, 'fashion', '청키 러닝 스니커즈 화이트', 119000, 28, 4.7, 9930, '👟', true, false],
  [10, 'beauty', '수분 진정 시카 토너 500ml', 32000, 40, 4.9, 31200, '🧴', true, true],
  [11, 'beauty', '벨벳 립 틴트 6컬러 세트', 45000, 38, 4.6, 6720, '💋', true, false],
  [12, 'beauty', '톤업 선크림 SPF50+ 2개입', 38000, 47, 4.8, 18400, '🌞', true, false],
  [13, 'food', '설향 딸기 1kg 특품 산지직송', 29900, 22, 4.7, 15300, '🍓', true, true],
  [14, 'food', '무항생제 한우 1등급 등심 300g', 49900, 15, 4.8, 8820, '🥩', true, false],
  [15, 'food', '제주 감귤 5kg 로얄과', 27900, 33, 4.6, 22100, '🍊', true, false],
  [16, 'food', '콜드브루 원액 1L 2병', 24900, 44, 4.7, 11240, '☕', true, true],
  [17, 'kitchen', '무쇠 주물 냄비 22cm 인덕션 겸용', 139000, 48, 4.8, 3320, '🍲', false, false],
  [18, 'kitchen', '에어프라이어 오븐형 12L', 149000, 39, 4.7, 26700, '🍟', true, true],
  [19, 'kitchen', '핸드드립 커피 세트 5종', 59000, 26, 4.6, 2880, '🫖', true, false],
  [20, 'living', '구름 소파 3인용 패브릭', 590000, 35, 4.5, 1240, '🛋️', false, false],
  [21, 'living', '호텔식 구스다운 이불 퀸', 189000, 55, 4.7, 5530, '🛏️', true, true],
  [22, 'living', '무드 LED 스탠드 조명', 49000, 29, 4.6, 7710, '💡', true, false],
  [23, 'living', '대용량 수납 정리함 6개 세트', 34900, 31, 4.5, 19400, '📦', true, false],
  [24, 'sports', '원터치 팝업 텐트 4인용', 159000, 36, 4.6, 4120, '⛺', true, false],
  [25, 'sports', '요가매트 TPE 8mm 논슬립', 29900, 50, 4.7, 16800, '🧘', true, true],
  [26, 'sports', '접이식 전기 자전거 20인치', 890000, 21, 4.4, 980, '🚲', false, false],
  [27, 'baby', '원목 블록 놀이 세트 100피스', 49000, 34, 4.8, 6240, '🧸', true, false],
  [28, 'baby', '프리미엄 기저귀 밴드형 4단계 3팩', 69900, 27, 4.9, 41200, '👶', true, true],
  [29, 'pet', '그레인프리 강아지 사료 6kg', 59900, 23, 4.8, 13300, '🐶', true, false],
  [30, 'pet', '고양이 캣타워 대형 스크래쳐', 129000, 42, 4.6, 5110, '🐱', false, true],
  [31, 'books', '베스트셀러 소설 3권 세트', 45000, 10, 4.7, 3890, '📚', true, false],
  [32, 'books', '바이닐 LP 플레이어 블루투스', 199000, 30, 4.5, 1760, '💿', true, false],
];

export const PRODUCTS = RAW.map(
  ([id, category, name, originalPrice, discount, rating, reviews, emoji, fast, deal]) => {
    const cat = CATEGORIES.find((c) => c.id === category);
    return {
      id,
      category,
      name,
      originalPrice,
      discount,
      price: Math.round((originalPrice * (100 - discount)) / 100 / 10) * 10,
      rating,
      reviews,
      emoji,
      fast,
      deal,
      hue: (cat.hue + id * 17) % 360,
      sold: Math.round(reviews * 3.4),
    };
  }
);

export const getProduct = (id) => PRODUCTS.find((p) => p.id === Number(id));
export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);

export const formatPrice = (n) => `${n.toLocaleString('ko-KR')}원`;

export const FREE_SHIPPING_MIN = 19800;
export const SHIPPING_FEE = 3000;

export function arrivalLabel() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const day = '일월화수목금토'[d.getDay()];
  return `내일(${day}) 도착 보장`;
}
