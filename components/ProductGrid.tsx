// components/ProductGrid.tsx
import ProductCard from "./ProductCard";

export type Product = {
  id: string;
  name: string;
  price: number;
  image_url?: string | null;
  description?: string | null;
};

export default function ProductGrid({ products = [] }: { products?: Product[] }) {
  if (!products || products.length === 0) {
    return <p className="small-muted">Aún no hay productos publicados.</p>;
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
  );
}
