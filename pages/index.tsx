
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../lib/types";

type Props = { products: Product[] }

export default function Home({ products }: Props) {
  return (
    <Layout>
      <Hero />
      <Categories />
      <section id="productos" className="py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 && <p className="text-white/80">Aún no hay productos publicados.</p>}
        {products.map((p) => (
          <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image_url ?? undefined} description={p.description ?? undefined} />
        ))}
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("productos").select("*").eq("is_active", true).order("created_at", { ascending: false });
  if (error) { console.error("Supabase error:", error.message); }
  return { props: { products: data ?? [] } };
}
