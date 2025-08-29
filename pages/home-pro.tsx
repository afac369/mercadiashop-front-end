// pages/home-pro.tsx
import type { GetStaticProps } from "next";
import Head from "next/head";
import LayoutPro from "../components/LayoutPro";
import ProductGrid, { type Product } from "../components/ProductGrid";
import { supabase } from "../lib/supabaseClient";

type DBRow = {
  id: string;
  name: string;
  description?: string | null;
  images?: string[] | null;   // si usas jsonb
  image_url?: string | null;  // si usas una sola
  price_cents?: number | null;
  currency?: string | null;
  is_active?: boolean | null;
  created_at?: string | null;
};

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase
    .from("productos")
    .select("id,name,description,images,image_url,price_cents,currency,is_active,created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(48);

  if (error) {
    console.error("productos fetch error:", error);
  }

  const products: Product[] =
    (data as DBRow[] | null)?.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description ?? null,
      image_url: (Array.isArray(r.images) && r.images[0]) || r.image_url || null,
      price: (r.price_cents ?? 0) / 100,
    })) ?? [];

  return {
    props: { products },
    revalidate: 60, // ISR 1 min
  };
};

export default function HomePro({ products }: { products: Product[] }) {
  return (
    <LayoutPro>
      <Head>
        <title>MercadIAshop · Tecnología que inspira</title>
        <meta name="description" content="Explora nuestro catálogo de tecnología y accesorios." />
      </Head>

      {/* ...tu HERO/sections previas... */}

      <section id="productos" className="mx-auto max-w-7xl px-4 py-8">
        <ProductGrid products={products} />
      </section>
    </LayoutPro>
  );
}
