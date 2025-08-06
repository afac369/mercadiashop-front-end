import '@/styles/globals.css'; // o '../styles/globals.css' si no estás usando aliases
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
<div className="relative z-0">
  <div className="absolute inset-0 bg-black bg-opacity-60 z-[-1]"></div>
  <Component {...pageProps} />
</div>