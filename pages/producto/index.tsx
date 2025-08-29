// pages/productos/index.tsx
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import MiniCart, { MiniCartItem } from '../../components/MiniCart';
import Toast from '../../components/Toast';
import { supabase } from '../../lib/supabaseClient';

type Product = {
  id: string;
  name: string;
  description?: string | null;
  images?: string[] | null;   // si usas jsonb
  image_url?: string | null;  // si usas una sola
  price_cents?: number | null;
  currency?: string | null;
};

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase
    .from('productos')
    .select('id,name,description,images,image_url,price_cents,currency,is_active,created_at')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(48);

  if (error) console.error(error);
  return {
    props: { products: data ?? [] },
    revalidate: 60, // ISR: 1 minuto
  };
};

export default function Productos({ products }: { products: Product[] }) {
  const [openCart, setOpenCart] = useState(false);
  const [items, setItems] = useState<MiniCartItem[]>([]);
  const [toast, setToast] = useState<{ open: boolean; text: string }>({ open: false, text: '' });

  const listForJsonLd = useMemo(
    () =>
      products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/producto/${p.id}`,
      })),
    [products]
  );

  function handleAdd(p: { id: string; name: string; price: number; image?: string }) {
    setItems((prev) => [{ id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 }, ...prev]);
    setOpenCart(true);
    setToast({ open: true, text: 'Agregado al carrito' });
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', { items: [{ item_id: p.id, item_name: p.name, price: p.price }] });
    }
  }

  return (
    <>
      <Head>
        <title>Productos | MercadIAshop</title>
        <meta name="description" content="Explora nuestro catálogo de tecnología y accesorios." />
        {/* JSON-LD ItemList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: listForJsonLd }),
          }}
        />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Productos</h1>
        <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => {
            const img = (Array.isArray(p.images) && p.images[0]) || p.image_url || '/placeholder.svg';
            const price = (p.price_cents ?? 0) / 100;
            return (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={price}
                image={img as string}
                onAdd={handleAdd}
              />
            );
          })}
        </section>
      </main>

      <MiniCart open={openCart} items={items} onClose={() => setOpenCart(false)} />
      <Toast open={toast.open} text={toast.text} onClose={() => setToast({ open: false, text: '' })} />
    </>
  );
}
