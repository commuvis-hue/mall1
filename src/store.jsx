import { createContext, useContext, useEffect, useReducer, useState, useCallback, useRef } from 'react';

const StoreContext = createContext(null);
const STORAGE_KEY = 'flik-store-v1';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { cart: [], wish: [], recent: [], searches: [] };
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cart.find((i) => i.id === action.id && i.option === action.option);
      const cart = exists
        ? state.cart.map((i) =>
            i === exists ? { ...i, qty: Math.min(99, i.qty + action.qty) } : i
          )
        : [...state.cart, { id: action.id, qty: action.qty, option: action.option, checked: true }];
      return { ...state, cart };
    }
    case 'SET_QTY':
      return {
        ...state,
        cart: state.cart.map((i, idx) =>
          idx === action.index ? { ...i, qty: Math.max(1, Math.min(99, action.qty)) } : i
        ),
      };
    case 'TOGGLE_CHECK':
      return {
        ...state,
        cart: state.cart.map((i, idx) => (idx === action.index ? { ...i, checked: !i.checked } : i)),
      };
    case 'CHECK_ALL':
      return { ...state, cart: state.cart.map((i) => ({ ...i, checked: action.value })) };
    case 'REMOVE':
      return { ...state, cart: state.cart.filter((_, idx) => idx !== action.index) };
    case 'REMOVE_CHECKED':
      return { ...state, cart: state.cart.filter((i) => !i.checked) };
    case 'TOGGLE_WISH':
      return {
        ...state,
        wish: state.wish.includes(action.id)
          ? state.wish.filter((w) => w !== action.id)
          : [action.id, ...state.wish],
      };
    case 'VIEW':
      return { ...state, recent: [action.id, ...state.recent.filter((r) => r !== action.id)].slice(0, 12) };
    case 'SEARCH':
      return {
        ...state,
        searches: [action.q, ...state.searches.filter((s) => s !== action.q)].slice(0, 8),
      };
    case 'CLEAR_SEARCHES':
      return { ...state, searches: [] };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const [toast, setToast] = useState(null);
  const timer = useRef();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const showToast = useCallback((message, action) => {
    clearTimeout(timer.current);
    setToast({ message, action, key: Date.now() });
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const cartCount = state.cart.reduce((n, i) => n + i.qty, 0);

  return (
    <StoreContext.Provider value={{ state, dispatch, toast, showToast, cartCount }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
