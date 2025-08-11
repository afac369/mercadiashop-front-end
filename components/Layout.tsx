
import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import { useCart } from "../context/CartContext";
import { formatCLP } from "../utils/currency";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  const { totalQty, totalPrice } = useCart();
  return (
    <>
      <Head>
        <title>MercadIAshop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b1220" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="relative min-h-screen overflow-x-hidden">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-20 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/20 blur-3xl" />

        <header className="sticky top-0 z-40">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
              <Link href="/" className="text-lg md:text-xl font-extrabold tracking-tight">
                Mercad<span className="heading-gradient">IA</span>shop
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="/#productos">Productos</a>
                <a href="/#categorias">Categorías</a>
                <a href="/#contacto">Contacto</a>
              </nav>
              <Link href="/carrito" className="chip">
                <span>Carrito</span>
                <span className="rounded-full bg-emerald-400 text-black px-2 py-0.5 text-[10px] font-bold">{totalQty}</span>
                <span className="opacity-80">{formatCLP(totalPrice)}</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>

        <footer className="mt-16 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-6 small-muted">
            <div>
              <div className="font-bold">MercadIAshop</div>
              <p className="mt-2">Tienda moderna impulsada por IA.</p>
            </div>
            <div>
              <div className="font-semibold">Ayuda</div>
              <ul className="mt-2 space-y-1">
                <li><a href="#contacto">Soporte</a></li>
                <li><a href="#">Políticas</a></li>
              </ul>
            </div>
            <div className="md:text-right small-muted">© {new Date().getFullYear()} MercadIAshop.</div>
          </div>
        </footer>
      </div>
    </>
  );
}
