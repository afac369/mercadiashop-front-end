#!/usr/bin/env bash
set -euo pipefail
mkdir -p components pages styles

# --- Theme toggle (sin next-themes)
cat > components/ThemeToggle.tsx <<'TSX'
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Mode = "dark" | "light";

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("theme") as Mode | null)) || "dark";
    setMode(saved);
    if (typeof document !== "undefined") document.documentElement.dataset.theme = saved;
  }, []);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    if (typeof window !== "undefined") localStorage.setItem("theme", next);
    if (typeof document !== "undefined") document.documentElement.dataset.theme = next;
  }

  return (
    <button onClick={toggle} aria-label="Cambiar tema" className="chip hover:opacity-100">
      {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{mode === "dark" ? "Claro" : "Oscuro"}</span>
    </button>
  );
}
TSX

# --- Toast provider
cat > components/ToastProvider.tsx <<'TSX'
import { createContext, useContext, useState, useCallback, useEffect } from "react";

type ToastItem = { id: string; message: string };
type Ctx = { toast: (message: string) => void };
const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string) => {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => [...prev, { id, message }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 2500);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] space-y-2">
        {items.map((t) => (
          <div key={t.id} className="glass rounded-xl px-4 py-2 text-sm shadow-lg">
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
TSX

# --- Hero Carousel (Embla)
cat > components/HeroCarousel.tsx <<'TSX'
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const slides = [
  {
    title: "Tecnología que inspira",
    subtitle: "Ofertas exclusivas esta semana",
    cta: "Ver productos",
    href: "#productos",
    bg: "from-cyan-500/20 via-emerald-400/10 to-violet-500/20",
  },
  {
    title: "Audio premium",
    subtitle: "Hasta -25% en headphones",
    cta: "Comprar ahora",
    href: "#productos",
    bg: "from-violet-500/20 via-cyan-400/10 to-emerald-400/20",
  },
  {
    title: "Setup gamer",
    subtitle: "Accesorios y periféricos",
    cta: "Armar setup",
    href: "#productos",
    bg: "from-emerald-500/20 via-cyan-400/10 to-violet-500/20",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const prev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 4500);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="rounded-3xl glass overflow-hidden">
      <div className="relative" ref={emblaRef}>
        <div className="flex">
          {slides.map((s, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%]">
              <div className={`relative px-6 py-16 md:px-16 md:py-24 bg-gradient-to-r ${s.bg}`}>
                <h1 className="text-4xl md:text-6xl font-extrabold heading-gradient">{s.title}</h1>
                <p className="mt-3 text-white/80">{s.subtitle}</p>
                <div className="mt-6">
                  <Link href={s.href} className="btn-primary">{s.cta}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={prev} aria-label="Anterior" className="absolute left-3 top-1/2 -translate-y-1/2 chip">‹</button>
        <button onClick={next} aria-label="Siguiente" className="absolute right-3 top-1/2 -translate-y-1/2 chip">›</button>
      </div>
    </section>
  );
}
TSX

# --- LayoutPro con ThemeToggle en el header
cat > components/LayoutPro.tsx <<'TSX'
import Head from "next/head";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { formatCLP } from "../utils/currency";
import MegaMenu from "./MegaMenu";
import ThemeToggle from "./ThemeToggle";

export default function LayoutPro({ children }: { children: React.ReactNode }) {
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
        <header className="sticky top-0 z-40">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between gap-3">
              <Link href="/" className="text-lg md:text-xl font-extrabold tracking-tight">
                Mercad<span className="heading-gradient">IA</span>shop
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="/#productos">Productos</a>
                <MegaMenu />
                <a href="/#contacto">Contacto</a>
              </nav>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link href="/carrito" className="chip">
                  <span>Carrito</span>
                  <span className="rounded-full bg-emerald-400 text-black px-2 py-0.5 text-[10px] font-bold">{totalQty}</span>
                  <span className="opacity-80">{formatCLP(totalPrice)}</span>
                </Link>
              </div>
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
TSX

# --- ProductCard: next/image + toast al agregar
cat > components/ProductCard.tsx <<'TSX'
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useToast } from "./ToastProvider";
import { formatCLP } from "../utils/currency";

type Props = { id: string; name: string; price: number; image?: string; description?: string };

export default function ProductCard({ id, name, price, image, description }: Props) {
  const { add } = useCart();
  const { toast } = useToast();

  return (
    <article className="card card-hover overflow-hidden">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
        {image ? (
          <Image src={image} alt={name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center small-muted">Imagen</div>
        )}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-emerald-400/40" />
      </div>
      <h3 className="mt-3 font-semibold line-clamp-2">{name}</h3>
      {description && <p className="text-sm small-muted line-clamp-2">{description}</p>}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-extrabold">{formatCLP(price)}</span>
        <button
          className="btn-primary"
          onClick={() => { add({ id, name, price, image }); toast("Agregado al carrito"); }}
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
TSX

# --- Home: usar HeroCarousel
cat > pages/index.tsx <<'TSX'
import LayoutPro from "../components/LayoutPro";
import HeroCarousel from "../components/HeroCarousel";
import Categories from "../components/Categories";
import BannerPromo from "../components/BannerPromo";
import ProductsGrid from "../components/ProductsGrid";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../lib/types";

type Props = { products: Product[] };

export default function Home({ products }: Props) {
  return (
    <LayoutPro>
      <HeroCarousel />
      <BannerPromo />
      <Categories />
      <ProductsGrid products={products} />
    </LayoutPro>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase
    .from("productos")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return { props: { products: (data as Product[]) ?? [] } };
}
TSX

# --- _app: envolver con ToastProvider (además de CartProvider)
cat > pages/_app.tsx <<'TSX'
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
TSX

# --- variables para tema claro
awk '1; END {
  print "";
  print "[data-theme=\"light\"]{";
  print "  --bg:#f7f8fc;";
  print "  --fg:#0b1220;";
  print "  --muted:rgba(11,18,32,.65);";
  print "}";
  print "[data-theme=\"light\"] .glass{ background-color: rgba(255,255,255,.7); border-color: rgba(17,24,39,.08); }";
}' styles/globals.css > styles/globals.css.tmp && mv styles/globals.css.tmp styles/globals.css || true

echo "Listo: crea/actualiza componentes y páginas."
