import { Link, useRouter } from '../router';
import { useStore } from '../store';
import { HomeIcon, GridIcon, HeartIcon, CartIcon, UserIcon } from './Icons';

export default function MobileNav() {
  const { path } = useRouter();
  const { cartCount } = useStore();
  const items = [
    { to: '/', label: '홈', Icon: HomeIcon },
    { to: '/categories', label: '카테고리', Icon: GridIcon },
    { to: '/wish', label: '찜', Icon: HeartIcon },
    { to: '/cart', label: '장바구니', Icon: CartIcon, badge: cartCount },
    { to: '#my', label: '마이', Icon: UserIcon },
  ];
  return (
    <nav className="mobile-nav" aria-label="하단 메뉴">
      {items.map(({ to, label, Icon, badge }) =>
        to.startsWith('#') ? (
          <a key={label} href={to}><Icon /><span>{label}</span></a>
        ) : (
          <Link key={label} to={to} className={path === to ? 'on' : ''}>
            <Icon />
            <span>{label}</span>
            {badge > 0 && <em className="count">{badge}</em>}
          </Link>
        )
      )}
    </nav>
  );
}
