// pages/index.tsx
import LayoutPro from "../components/LayoutPro";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import BannerPromo from "../components/BannerPromo";
import ProductsGrid from "../components/ProductsGrid";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../lib/types";

type Props = { products: Product[] };

export default function Home({ products }: Props) {
  return (
    <LayoutPro>
      <Hero />
      <BannerPromo />
      <Categories />
      <ProductsGrid products={products} />
    </LayoutPro>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase
    .from("productos")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return { props: { products: (data as Product[]) ?? [] } };
}
