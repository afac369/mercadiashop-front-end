// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";              // <-- IMPORTA TAILWIND
import { CartProvider } from "../context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
