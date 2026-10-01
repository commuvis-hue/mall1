import { StarIcon } from './Icons';

const Row = () => [0, 1, 2, 3, 4].map((i) => <StarIcon key={i} width={13} height={13} />);

export default function Stars({ rating, reviews }) {
  return (
    <div className="stars" aria-label={`평점 ${rating}점, 리뷰 ${reviews.toLocaleString()}개`}>
      <span className="stars-track" style={{ '--pct': `${(rating / 5) * 100}%` }} aria-hidden="true">
        <Row />
        <span className="stars-fill"><Row /></span>
      </span>
      <span className="stars-count">({reviews.toLocaleString()})</span>
    </div>
  );
}
