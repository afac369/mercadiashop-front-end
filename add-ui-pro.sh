#!/usr/bin/env bash
set -euo pipefail

mkdir -p components pages

# components/MegaMenu.tsx
cat > components/MegaMenu.tsx <<'TSX'
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Cpu, Headphones, Home, Gamepad2, Sprout, Dumbbell } from "lucide-react";

const CATEGORIES = [
  { id: "tech", name: "Tecnología", icon: Cpu },
  { id: "audio", name: "Audio", icon: Headphones },
  { id: "hogar", name: "Hogar", icon: Home },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "deco", name: "Deco", icon: Sprout },
  { id: "fitness", name: "Fitness", icon: Dumbbell },
];

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="hover:opacity-80"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
      >
        Categorías
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute left-1/2 z-50 mt-3 w-[680px] -translate-x-1/2 rounded-2xl glass p-6 shadow-2xl"
        >
          <div className="grid grid-cols-3 gap-4">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.id}
                  href={"/#productos"}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:border-emerald-400/40"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 border border-white/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs small-muted">Ver productos</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
TSX

# components/BannerPromo.tsx
cat > components/BannerPromo.tsx <<'TSX'
import { useEffect, useState } from "react";
import Link from "next/link";

function useCountdown(target: number) {
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const clamp = Math.max(left, 0);
  const s = Math.floor(clamp / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return { d, h, m, r };
}

export default function BannerPromo() {
  const target = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 días
  const { d, h, m, r } = useCountdown(target);
  return (
    <section className="mt-8 rounded-3xl glass overflow-hidden">
      <div className="relative px-6 py-8 md:px-12 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/10 to-violet-400/20" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm small-muted">Ofertas de lanzamiento</div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Hasta <span className="heading-gradient">-30%</span> en accesorios tech
            </h3>
            <p className="small-muted mt-1">Termina en {d}d {h}h {m}m {r}s</p>
          </div>
          <Link href="#productos" className="btn-primary self-start">Comprar ahora</Link>
        </div>
      </div>
    </section>
  );
}
TSX

# components/ProductSkeleton.tsx
cat > components/ProductSkeleton.tsx <<'TSX'
export default function ProductSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-[4/3] rounded-xl bg-white/10" />
      <div className="mt-3 h-4 w-2/3 rounded bg-white/10" />
      <div className="mt-2 h-3 w-4/5 rounded bg-white/10" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-5 w-20 rounded bg-white/10" />
        <div className="h-9 w-24 rounded-xl bg-white/10" />
      </div>
    </div>
  );
}
TSX

# components/SkeletonGrid.tsx
cat > components/SkeletonGrid.tsx <<'TSX'
import ProductSkeleton from "./ProductSkeleton";

export default function SkeletonGrid({ count = 9 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
TSX

# components/ProductsGrid.tsx
cat > components/ProductsGrid.tsx <<'TSX'
import ProductCard from "./ProductCard";
type Product = {
  id: string; name: string; price: number; image_url?: string | null; description?: string | null;
}
export default function ProductsGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <p className="small-muted">Aún no hay productos publicados.</p>
  }
  return (
    <section id="productos" className="py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          price={p.price}
          image={p.image_url ?? undefined}
          description={p.description ?? undefined}
        />
      ))}
    </section>
  )
}
TSX

# components/LayoutPro.tsx
cat > components/LayoutPro.tsx <<'TSX'
import Head from "next/head";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { formatCLP } from "../utils/currency";
import MegaMenu from "./MegaMenu";

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
            <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
              <Link href="/" className="text-lg md:text-xl font-extrabold tracking-tight">
                Mercad<span className="heading-gradient">IA</span>shop
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="/#productos">Productos</a>
                <MegaMenu />
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
TSX

# pages/home-pro.tsx
cat > pages/home-pro.tsx <<'TSX'
import dynamic from "next/dynamic";
import LayoutPro from "../components/LayoutPro";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import BannerPromo from "../components/BannerPromo";
import SkeletonGrid from "../components/SkeletonGrid";
import { supabase } from "../lib/supabaseClient";
import type { GetServerSideProps } from "next";

const ProductsGrid = dynamic(() => import("../components/ProductsGrid"), {
  loading: () => <SkeletonGrid count={9} />,
  ssr: true,
});

type Product = {
  id: string; name: string; price: number; image_url?: string | null; description?: string | null;
}
export default function HomePro({ products }: { products: Product[] }) {
  return (
    <LayoutPro>
      <Hero />
      <BannerPromo />
      <Categories />
      <ProductsGrid products={products} />
    </LayoutPro>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await supabase.from("productos").select("*").eq("is_active", true).order("created_at", { ascending: false });
  return { props: { products: data ?? [] } };
};
TSX

# Dependencia (si no está)
npm i lucide-react >/dev/null 2>&1 || true

echo "OK: Archivos UI Pro creados. Visita /home-pro después de hacer deploy."
