import dynamic from "next/dynamic";
import LayoutPro from "../components/LayoutPro";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import BannerPromo from "../components/BannerPromo";
import SkeletonGrid from "../components/SkeletonGrid";
import { supabase } from "../lib/supabaseClient";
import type { GetServerSideProps } from "next";

const ProductsGrid = dynamic(() => import("../components/ProductsGrid"), {
  loading: () => <SkeletonGrid count={9} />,
  ssr: true,
});

type Product = {
  id: string; name: string; price: number; image_url?: string | null; description?: string | null;
}
export default function HomePro({ products }: { products: Product[] }) {
  return (
    <LayoutPro>
      <Hero />
      <BannerPromo />
      <Categories />
      <ProductsGrid products={products} />
    </LayoutPro>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await supabase.from("productos").select("*").eq("is_active", true).order("created_at", { ascending: false });
  return { props: { products: data ?? [] } };
};
