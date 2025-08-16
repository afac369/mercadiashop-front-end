// components/ProductGrid.tsx
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

const mock: Product[] = [
  { id: "1", name: "Producto 1", price: 19990, image: "/bg-mercadiashop.jpg" },
  { id: "2", name: "Producto 2", price: 29990, image: "/bg-mercadiashop.jpg" },
  { id: "3", name: "Producto 3", price: 39990, image: "/bg-mercadiashop.jpg" },
  { id: "4", name: "Producto 4", price: 49990, image: "/bg-mercadiashop.jpg" },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {mock.map((p) => (
        <Link
          href={`/producto/${p.id}`}
          key={p.id}
          className="rounded-2xl border border-white/10 p-3 hover:border-white/20 transition"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-black/10">
            {p.image ? (
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                style={{ objectFit: "cover" }}
                priority={false}
              />
            ) : null}
          </div>
          <div className="font-medium">{p.name}</div>
          <div className="text-sm opacity-80">${p.price.toLocaleString("es-CL")}</div>
        </Link>
      ))}
    </div>
  );
}
