import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../components/ToastProvider';
import Analytics from '../components/Analytics';

// Genera y persiste un session_id simple para asociar órdenes (sin tocar UI)
function ensureSessionId() {
  if (typeof window === 'undefined') return;
  const KEY = 'sid';
  const existing = window.localStorage.getItem(KEY);
  if (!existing) {
    const sid = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(KEY, sid);
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ensureSessionId();
  }, []);

  return (
    <CartProvider>
      <ToastProvider>
        <Analytics />
        <Component {...pageProps} />
      </ToastProvider>
    </CartProvider>
  );
}
