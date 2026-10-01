import { useRouter, matchPath } from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import MobileNav from './components/MobileNav';
import Home from './pages/Home';
import ListPage from './pages/ListPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderComplete from './pages/OrderComplete';
import NotFound from './pages/NotFound';

function Routes() {
  const { path, search } = useRouter();
  const key = path + search;
  let m;
  if (path === '/') return <Home />;
  if ((m = matchPath('/category/:id', path))) return <ListPage key={key} mode="category" categoryId={m.id} />;
  if ((m = matchPath('/product/:id', path))) return <ProductDetail key={key} id={m.id} />;
  if (path === '/search') return <ListPage key={key} mode="search" />;
  if (path === '/wish') return <ListPage key={key} mode="wish" />;
  if (path === '/categories') return <ListPage key={key} mode="categories" />;
  if (path === '/cart') return <Cart />;
  if (path === '/checkout') return <Checkout />;
  if (path === '/order-complete') return <OrderComplete />;
  return <NotFound />;
}

export default function App() {
  return (
    <>
      <Header />
      <Routes />
      <Footer />
      <MobileNav />
      <Toast />
    </>
  );
}
