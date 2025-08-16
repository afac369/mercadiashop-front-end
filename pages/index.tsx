import type { GetServerSideProps } from "next";
import Head from "next/head";
import BannerPromo from "../components/BannerPromo";
import SearchFilters from "../components/SearchFilters";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../lib/supabaseClient";
import type { Product } from "../lib/types";

type Props = {
  products: Product[];
};

export default function Home({ products }: Props) {
  return (
    <>
      <Head>
        <title>MercadIAshop — Tecnología y más</title>
      </Head>

      <BannerPromo />
      <SearchFilters />

      <section className="mx-auto max-w-7xl px-4 py-8">
        <ProductGrid products={products} />
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("is_active", true);

  if (error) {
    console.error(error);
    return { props: { products: [] } };
  }

  return { props: { products: (data as Product[]) ?? [] } };
};
