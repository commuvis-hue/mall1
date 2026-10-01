// 실제 이미지 대신 그라디언트 + 이모지로 상품 썸네일을 그립니다.
// 실서비스에서는 <img src={product.image} /> 로 교체하세요.
export default function Thumb({ product, size = 'md', variant = 0 }) {
  const h = (product.hue + variant * 40) % 360;
  const style = {
    '--h1': `hsl(${h} 95% 72%)`,
    '--h2': `hsl(${(h + 50) % 360} 90% 60%)`,
    '--rot': `${(variant % 2 ? -1 : 1) * (6 + variant * 4)}deg`,
  };
  return (
    <div className={`thumb thumb-${size}`} style={style} role="img" aria-label={product.name}>
      <span className="thumb-emoji">{product.emoji}</span>
    </div>
  );
}
