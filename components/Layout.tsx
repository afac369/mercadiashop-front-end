
import Head from "next/head"; import Image from "next/image"; import Link from "next/link"; import { ReactNode } from "react"; import { useCart } from "../context/CartContext"; import { formatCLP } from "../utils/currency";
export default function Layout({ children }: { children: ReactNode }) {
  const { totalQty, totalPrice } = useCart();
  return (<>
    <Head><title>MercadIAshop</title><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="theme-color" content="#0b1220" /></Head>
    <div className="relative min-h-screen text-white">
      <Image src="/bg-mercadiashop.jpg" alt="Fondo MercadIAshop" fill priority sizes="100vw" className="object-cover -z-10 opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <header className="sticky top-0 z-20 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">Mercad<span className="text-emerald-400">IA</span>shop</Link>
          <nav className="flex items-center gap-6 text-sm">
            <a href="/#productos" className="hover:opacity-80">Productos</a>
            <a href="/#categorias" className="hover:opacity-80">Categorías</a>
            <a href="/#contacto" className="hover:opacity-80">Contacto</a>
            <Link href="/carrito" className="rounded-md border px-3 py-1 hover:bg-white/10 flex items-center gap-2">
              <span>Carrito</span>
              <span className="rounded-full bg-emerald-500/90 text-black px-2 py-0.5 text-xs font-bold">{totalQty}</span>
              <span className="opacity-80">{formatCLP(totalPrice)}</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/70">© {new Date().getFullYear()} MercadIAshop. Todos los derechos reservados.</footer>
    </div>
  </>);
}
