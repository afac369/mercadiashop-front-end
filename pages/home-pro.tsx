import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import LayoutPro from "../components/LayoutPro";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../lib/supabaseClient";
import type { Product } from "../lib/types";

type Props = { products: Product[] };

const HomePro: NextPage<Props> = ({ products }) => (
  <LayoutPro>
    <Head>
      <title>MercadIAshop — Compra en el futuro, compra hoy ...</title>
    </Head>

    <Hero />

    <section id="productos" className="mx-auto max-w-7xl px-4 py-8">
      <ProductGrid products={products} /> {/* <-- ahora sí pasamos la prop */}
    </section>

    <section id="categorias" className="mx-auto max-w-7xl px-4 py-8">
      <Categories />
    </section>
  </LayoutPro>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { props: { products: [] } };
  }

  return { props: { products: (data as Product[]) ?? [] } };
};

export default HomePro;
