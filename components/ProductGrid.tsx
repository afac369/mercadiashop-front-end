import Image from "next/image";
import Link from "next/link";
import type { Product } from "../lib/types";
import { formatCLP } from "../utils/currency";

type Props = {
  products?: Product[];        // <- opcional
};

export default function ProductGrid({ products = [] }: Props) {  // <- valor por defecto
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((p) => (
        <Link
          key={p.id}
          href={`/producto/${p.id}`}
          className="rounded-xl border border-white/10 hover:border-white/20 transition p-3"
        >
          <div className="relative aspect-square overflow-hidden rounded-lg bg-black/5">
            {p.image_url ? (
              <Image
                src={p.image_url}
                alt={p.name}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm opacity-60">
                Sin imagen
              </div>
            )}
          </div>
          <div className="mt-2 text-sm font-medium truncate">{p.name}</div>
          <div className="text-xs opacity-80">
            {typeof formatCLP === "function" ? formatCLP(p.price) : `$${p.price}`}
          </div>
        </Link>
      ))}
    </div>
  );
}
