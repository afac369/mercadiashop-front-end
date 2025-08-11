#!/usr/bin/env bash
set -euo pipefail
mkdir -p components styles

# styles/globals.css (refinado visual: sombras, helpers)
cat > styles/globals.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root{
  --bg:#0b1220;
  --fg:#e6f0ff;
  --muted:rgba(230,240,255,.7);
  --primary:#22d3ee;       /* cyan-400 */
  --secondary:#a78bfa;     /* violet-400 */
  --accent:#22c55e;        /* emerald-500 */
}

html,body,#__next{height:100%}
body{
  background:
    radial-gradient(1200px 600px at 10% -10%, rgba(34,211,238,.15), transparent),
    radial-gradient(900px 500px at 100% 0%, rgba(167,139,250,.12), transparent),
    radial-gradient(800px 600px at 50% 120%, rgba(34,197,94,.08), transparent),
    var(--bg);
  color: var(--fg);
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, Segoe UI, Roboto, Inter, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
}

/* grid sutil para textura */
.bg-grid {
  background-image:
    linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
  background-size: 24px 24px;
}

@layer utilities{
  .glass{ @apply bg-white/8 backdrop-blur-md border border-white/10; }
  .btn{ @apply inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-transform duration-150; }
  .btn-primary{ @apply btn text-black bg-emerald-400 hover:bg-emerald-300 active:scale-[.98] shadow-lg shadow-emerald-400/20; }
  .btn-ghost{ @apply btn border border-white/15 hover:bg-white/10; }
  .chip{ @apply inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs border border-white/15 bg-white/5; }
  .card{ @apply rounded-2xl glass p-4; }
  .card-hover{ @apply transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10; }
  .heading-gradient{ @apply bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent; }
}

a{ @apply hover:opacity-80; }
h1,h2,h3{ @apply tracking-tight; }
.small-muted{ color: var(--muted); }
CSS

# Hero más potente
cat > components/Hero.tsx <<'TSX'
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl glass bg-grid px-6 py-16 md:px-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold heading-gradient">
          Tu nueva tienda favorita: MercadIAshop
        </h1>
        <p className="mt-4 text-white/80">
          Tecnología, accesorios y más. Envíos a todo Chile y soporte 24/7.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="#productos" className="btn-primary">Ver productos</Link>
          <a href="#categorias" className="btn-ghost">Explorar categorías</a>
        </div>
        <div className="mt-8 flex items-center justify-center gap-6 text-xs small-muted">
          <span className="chip">Envíos rápidos</span>
          <span className="chip">Pagos seguros</span>
          <span className="chip">Garantía 30 días</span>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
    </section>
  );
}
TSX

# Categorías con hover “neón”
cat > components/Categories.tsx <<'TSX'
import { Cpu, Headphones, Home, Gamepad2, Sprout, Dumbbell } from "lucide-react";

type Category = { id: string; name: string; icon: any; };

const defaultCategories: Category[] = [
  { id: "tech", name: "Tecnología", icon: Cpu },
  { id: "audio", name: "Audio", icon: Headphones },
  { id: "hogar", name: "Hogar", icon: Home },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "deco", name: "Deco", icon: Sprout },
  { id: "fitness", name: "Fitness", icon: Dumbbell },
];

export default function Categories({ categories = defaultCategories }: { categories?: Category[] }) {
  return (
    <section id="categorias" className="pt-10">
      <h2 className="text-2xl font-bold mb-4">Categorías</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <a key={c.id} href="/#productos" className="card card-hover group text-center p-5">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white/5 border border-white/10 group-hover:border-emerald-400/40">
                <Icon className="h-6 w-6 opacity-90" />
              </div>
              <div className="mt-3 text-sm">{c.name}</div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
TSX

# ProductCard con next/image + hover pro
cat > components/ProductCard.tsx <<'TSX'
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { formatCLP } from "../utils/currency";

type Props = { id: string; name: string; price: number; image?: string; description?: string; };

export default function ProductCard({ id, name, price, image, description }: Props) {
  const { add } = useCart();
  return (
    <article className="card card-hover overflow-hidden">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
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
          onClick={() => add({ id, name, price, image })}
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
TSX

echo "Polish UI actualizado."
