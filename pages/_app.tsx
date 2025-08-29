// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../components/ToastProvider';
import Analytics from '../components/Analytics';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ToastProvider>
        <Analytics />
        <Component {...pageProps} />
      </ToastProvider>
    </CartProvider>
  );
}

