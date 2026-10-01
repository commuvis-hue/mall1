import { useEffect, useState } from 'react';

// 오늘 자정까지 남은 시간
export default function useCountdown() {
  const calc = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(24, 0, 0, 0);
    const diff = Math.max(0, end - now);
    return {
      h: String(Math.floor(diff / 3.6e6)).padStart(2, '0'),
      m: String(Math.floor((diff % 3.6e6) / 6e4)).padStart(2, '0'),
      s: String(Math.floor((diff % 6e4) / 1000)).padStart(2, '0'),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}
