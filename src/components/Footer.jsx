export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="logo-mark footer-logo">FLIK</div>
          <p>
            (주)플릭커머스 · 대표 홍길동 · 사업자등록번호 000-00-00000
            <br />
            서울특별시 강남구 테헤란로 000, 00층 · 고객센터 1588-0000
          </p>
          <p className="fine">
            이 사이트는 개발·학습용 데모입니다. 실제 주문과 결제는 이루어지지 않습니다.
          </p>
        </div>
        <nav aria-label="정책">
          <a href="#terms">이용약관</a>
          <a href="#privacy"><b>개인정보처리방침</b></a>
          <a href="#partner">입점 문의</a>
        </nav>
      </div>
    </footer>
  );
}
