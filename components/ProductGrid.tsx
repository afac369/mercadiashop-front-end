// components/ProductGrid.tsx
import type { Product } from "../lib/types";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  if (!products?.length) {
    return <p className="small-muted">No hay productos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((_, i) => (
        // usa el índice para la key si tu tipo Product no garantiza un id
        <div key={i} className="rounded-xl border border-white/10 p-6">
          {/* Aquí puedes renderizar tu tarjeta real (ProductCard) */}
          Producto {i + 1}
        </div>
      ))}
    </div>
  );
}
