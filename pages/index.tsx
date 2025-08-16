import LayoutPro from "../components/LayoutPro";
import HeroCarousel from "../components/HeroCarousel";
import Categories from "../components/Categories";
import BannerPromo from "../components/BannerPromo";
import SearchFilters from "../components/SearchFilters";
import ProductGrid from "../components/ProductGrid";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../lib/types";
import type { GetServerSideProps } from "next";

type Props = { products: Product[] };

export default function Home({ products }: Props) {
  return (
    <LayoutPro>
      <HeroCarousel />
      <BannerPromo />
      <Categories />
      <SearchFilters />
      <ProductGrid products={products} />
    </LayoutPro>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const q  = typeof ctx.query.q === "string" ? ctx.query.q.trim() : "";
  const category = typeof ctx.query.category === "string" ? ctx.query.category : "";
  const min = Number.isFinite(Number(ctx.query.min)) ? Number(ctx.query.min) : undefined;
  const max = Number.isFinite(Number(ctx.query.max)) ? Number(ctx.query.max) : undefined;

  let query = supabase.from("productos").select("*").eq("is_active", true);
  if (q) query = query.ilike("name", `%${q}%`);
  if (category) query = query.eq("category", category);
  if (typeof min === "number") query = query.gte("price", min);
  if (typeof max === "number") query = query.lte("price", max);
  query = query.order("created_at", { ascending: false });

  const { data } = await query;
  return { props: { products: (data as Product[]) ?? [] } };
};
