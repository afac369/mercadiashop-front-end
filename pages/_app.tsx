import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../components/ToastProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </CartProvider>
  );
}
