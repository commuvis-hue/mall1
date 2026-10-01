import { Link } from '../router';

export default function NotFound() {
  return (
    <main className="container page">
      <div className="empty">
        <div className="empty-emoji">🫥</div>
        <p>찾는 페이지가 없어요. 주소를 확인하거나 홈에서 다시 시작해 주세요.</p>
        <Link to="/" className="btn btn-primary">홈으로</Link>
      </div>
    </main>
  );
}
