// pages/producto/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Toast from '../../components/Toast';
import MiniCart from '../../components/MiniCart';
import { supabase } from '../../lib/supabaseClient';

type Product = {
  id: string;
  name: string;
  description?: string | null;
  images?: string[] | null;
  image_url?: string | null;
  price_cents?: number | null;
  currency?: string | null;
  stock?: number | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase.from('productos').select('id').eq('is_active', true).limit(100);
  const paths = (data ?? []).map((p) => ({ params: { id: String(p.id) } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = String(params?.id);
  const { data, error } = await supabase
    .from('productos')
    .select('id,name,description,images,image_url,price_cents,currency,stock,is_active,created_at')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error || !data) return { notFound: true, revalidate: 30 };
  return { props: { product: data }, revalidate: 60 };
};

export default function PDP({ product }: { product: Product }) {
  const [toast, setToast] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const img = (Array.isArray(product.images) && product.images[0]) || product.image_url || '/placeholder.svg';
  const price = (product.price_cents ?? 0) / 100;
  const inStock = (product.stock ?? 0) > 0;
  const currency = product.currency || 'CLP';

  function addToCart() {
    setToast(true);
    setOpenCart(true);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', {
        items: [{ item_id: product.id, item_name: product.name, price }],
      });
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [img],
    description: product.description || '',
    offers: {
      '@type': 'Offer',
      priceCurrency: currency,
      price: price.toFixed(0),
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/producto/${product.id}`,
    },
  };

  return (
    <>
      <Head>
        <title>{product.name} | MercadIAshop</title>
        <meta name="description" content={product.description || product.name} />
        <meta property="og:title" content={`${product.name} | MercadIAshop`} />
        <meta property="og:image" content={img as string} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <main className="container mx-auto p-4 grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="relative w-full aspect-square">
          <Image
            src={img as string}
            alt={product.name}
            fill
            className="object-cover rounded-2xl"
            sizes="(min-width:1024px) 50vw, 100vw"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-slate-700 whitespace-pre-line">{product.description}</p>
          <p className="mt-4 text-2xl font-bold">
            {currency} ${price.toLocaleString()}
          </p>
          <p className={`mt-1 text-sm ${inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
            {inStock ? 'En stock' : 'Sin stock'}
          </p>
          <button
            className="mt-4 w-full md:w-auto rounded-xl bg-black text-white px-6 py-3"
            onClick={addToCart}
            disabled={!inStock}
          >
            Agregar al carrito
          </button>
        </div>
      </main>

      <MiniCart
        open={openCart}
        onClose={() => setOpenCart(false)}
        items={[{ id: product.id, name: product.name, price, image: img, qty: 1 }]}
      />
      <Toast open={toast} text="Agregado al carrito" onClose={() => setToast(false)} />
    </>
  );
}
