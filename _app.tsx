import '@/styles/globals.css'; // o '../styles/globals.css' si no estás usando aliases
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
