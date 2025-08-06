import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative z-0">
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-[-1]"></div>

      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[-2]"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      ></div>

      <Component {...pageProps} />
    </div>
  );
}
