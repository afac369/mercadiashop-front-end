//components/Header.tsx
import Link from 'next/link';
import { useMemo } from 'react';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';
import { formatCLP } from '../utils/currency';
import { ShoppingCart } from 'lucide-react';

type Props = {
  onOpenCart?: () => void; // usa esto para abrir tu CartDrawer si lo tienes
};

export default function Header({ onOpenCart }: Props) {
  const { totalQty, totalPrice } = useCart();
  const totalLabel = useMemo(() => formatCLP(Math.round(totalPrice || 0)), [totalPrice]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Marca + navegación */}
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold text-lg">
              MercadIAshop
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/productos" className="hover:underline">
                Productos
              </Link>
              <Link href="/categorias" className="hover:underline">
                Categorías
              </Link>
              <Link href="/contacto" className="hover:underline">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Tema + Carrito */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition hover:bg-black hover:text-white"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
                <span
                  className={`absolute inline-flex h-2.5 w-2.5 rounded-full ${
                    totalQty > 0 ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                />
              </span>
              <span className="tabular-nums">{totalQty}</span>
              <span className="text-gray-500">{totalLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}