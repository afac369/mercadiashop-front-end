#!/usr/bin/env bash
set -euo pipefail
mkdir -p components public

# 1) Drawer de carrito
cat > components/CartDrawer.tsx <<'TSX'
import { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { formatCLP } from "../utils/currency";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (typeof document === "undefined") return null;
  const cart: any = useCart() as any; // tolerante a tipos distintos del contexto
  const items: Array<any> = cart?.items ?? [];
  const total: number = cart?.totalPrice ?? 0;

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  return createPortal(
    <Fragment>
      {open && (
        <>
          <div onClick={onClose} className="fixed inset-0 z-[98] bg-black/40 backdrop-blur-sm" />
          <aside className="fixed right-0 top-0 z-[99] h-full w-[92vw] max-w-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 shadow-2xl transition-transform duration-300"
                 style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}>
            <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
              <h3 className="font-bold text-lg">Tu carrito</h3>
              <button onClick={onClose} className="chip">Cerrar</button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-180px)]">
              {items.length === 0 && <p className="text-sm opacity-70">Tu carrito está vacío.</p>}
              {items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 p-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{it?.name ?? "Producto"}</div>
                    <div className="text-sm opacity-70">
                      {it?.qty ? `${it.qty} × ` : ""}{formatCLP(it?.price ?? 0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="opacity-70">Total</span>
                <span className="text-lg font-extrabold">{formatCLP(total)}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => cart?.clear?.()} className="btn-ghost flex-1">Vaciar</button>
                <a href="/checkout" className="btn-primary flex-1 text-center">Ir a pagar</a>
              </div>
            </div>
          </aside>
        </>
      )}
    </Fragment>,
    document.body
  );
}
TSX

# 2) Barra superior de beneficios (ocultable)
cat > components/FreeShippingBar.tsx <<'TSX'
import { useEffect, useState } from "react";

export default function FreeShippingBar() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const v = localStorage.getItem("freebar:hidden");
    if (v === "1") setVisible(false);
  }, []);
  if (!visible) return null;
  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-b-2xl bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-violet-400/30 text-sm px-4 py-2 flex items-center justify-between">
          <span>🚚 Envío gratis sobre $50.000 · 3 cuotas sin interés</span>
          <button
            onClick={() => { localStorage.setItem("freebar:hidden","1"); setVisible(false); }}
            className="chip"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
TSX

# 3) Buscador + filtros UI
cat > components/SearchFilters.tsx <<'TSX'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CATS = ["tech","audio","hogar","gaming","deco","fitness"];

export default function SearchFilters() {
  const router = useRouter();
  const q0   = typeof router.query.q === "string" ? router.query.q : "";
  const cat0 = typeof router.query.category === "string" ? router.query.category : "";
  const min0 = typeof router.query.min === "string" ? router.query.min : "";
  const max0 = typeof router.query.max === "string" ? router.query.max : "";

  const [q, setQ] = useState(q0);
  const [category, setCategory] = useState(cat0);
  const [min, setMin] = useState(min0);
  const [max, setMax] = useState(max0);

  useEffect(() => { setQ(q0); setCategory(cat0); setMin(min0); setMax(max0); }, [q0,cat0,min0,max0]);

  function apply() {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    router.push(`/?${params.toString()}`);
  }

  function clearAll() {
    setQ(""); setCategory(""); setMin(""); setMax("");
    router.push(`/`);
  }

  return (
    <section className="mt-6 glass rounded-2xl p-4">
      <div className="grid md:grid-cols-5 gap-3">
        <input
          placeholder="Buscar por nombre…"
          value={q} onChange={e => setQ(e.target.value)}
          className="rounded-xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 px-3 py-2"
        />
        <select
          value={category} onChange={e => setCategory(e.target.value)}
          className="rounded-xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 px-3 py-2"
        >
          <option value="">Todas las categorías</option>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="number" min="0" placeholder="Mín $" value={min} onChange={e=>setMin(e.target.value)}
               className="rounded-xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 px-3 py-2"/>
        <input type="number" min="0" placeholder="Máx $" value={max} onChange={e=>setMax(e.target.value)}
               className="rounded-xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 px-3 py-2"/>
        <div className="flex gap-2">
          <button onClick={apply} className="btn-primary flex-1">Aplicar</button>
          <button onClick={clearAll} className="btn-ghost">Limpiar</button>
        </div>
      </div>
    </section>
  );
}
TSX

# 4) Favicon SVG
cat > public/favicon.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop stop-color="#22d3ee"/>
      <stop offset="1" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect rx="14" width="64" height="64" fill="url(#g)"/>
  <path d="M19 42h26M22 22h20M22 32h20" stroke="#000" stroke-opacity=".85" stroke-width="4" stroke-linecap="round"/>
</svg>
SVG

# 5) SEO/OG + integrar barra y drawer en LayoutPro
cat > components/LayoutPro.tsx <<'TSX'
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatCLP } from "../utils/currency";
import MegaMenu from "./MegaMenu";
import ThemeToggle from "./ThemeToggle";
import FreeShippingBar from "./FreeShippingBar";
import CartDrawer from "./CartDrawer";

export default function LayoutPro({ children }: { children: React.ReactNode }) {
  const { totalQty, totalPrice } = useCart();
  const [openCart, setOpenCart] = useState(false);

  const title = "MercadIAshop — Tecnología y más";
  const description = "Tu nueva tienda favorita: envíos rápidos, pagos seguros y soporte 24/7.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="theme-color" content="#0b1220" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="MercadIAshop"/>
        <meta property="og:image" content="/favicon.svg"/>
      </Head>

      <FreeShippingBar />

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
                <button onClick={() => setOpenCart(true)} className="chip">
                  <span>Carrito</span>
                  <span className="rounded-full bg-emerald-400 text-black px-2 py-0.5 text-[10px] font-bold">{totalQty}</span>
                  <span className="opacity-80">{formatCLP(totalPrice)}</span>
                </button>
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

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}
TSX

# 6) Integrar filtros en la Home (SSR con Supabase)
cat > pages/index.tsx <<'TSX'
import LayoutPro from "../components/LayoutPro";
import HeroCarousel from "../components/HeroCarousel";
import Categories from "../components/Categories";
import BannerPromo from "../components/BannerPromo";
import SearchFilters from "../components/SearchFilters";
import ProductsGrid from "../components/ProductsGrid";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../lib/types";
import type { GetServerSideProps } from "next";

type Props = { products: Product[] };

export default function Home({ products }: Props) {
  return (
    <LayoutPro>
      <HeroCarousel />
      <BannerPromo />
      <Categories />
      <SearchFilters />
      <ProductsGrid products={products} />
    </LayoutPro>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const q  = typeof ctx.query.q === "string" ? ctx.query.q.trim() : "";
  const category = typeof ctx.query.category === "string" ? ctx.query.category : "";
  const min = Number.isFinite(Number(ctx.query.min)) ? Number(ctx.query.min) : undefined;
  const max = Number.isFinite(Number(ctx.query.max)) ? Number(ctx.query.max) : undefined;

  let query = supabase.from("productos").select("*").eq("is_active", true);
  if (q) query = query.ilike("name", `%${q}%`);
  if (category) query = query.eq("category", category);
  if (typeof min === "number") query = query.gte("price", min);
  if (typeof max === "number") query = query.lte("price", max);
  query = query.order("created_at", { ascending: false });

  const { data } = await query;
  return { props: { products: (data as Product[]) ?? [] } };
};
TSX

echo "OK: e-com pro suite aplicada."
