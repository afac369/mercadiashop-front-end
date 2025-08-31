//pages/index.tsx
import Head from "next/head";
import LayoutPro from "../components/LayoutPro";
import Hero from "../components/Hero";
import HeroCarousel from "../components/HeroCarousel";
import Categories from "../components/Categories";
import BannerPromo from "../components/BannerPromo";
import SearchFilters from "../components/SearchFilters";
import ProductsGrid from "../components/ProductsGrid";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../lib/types";
import type { GetServerSideProps } from "next";

type Props = { products: Product[] };

export default function Home({ products }: Props) {
  return (
    <LayoutPro>
      <Head>
        <title>MercadIAshop: Compra Tecnología y Electrónicos de Vanguardia Online</title>
        <meta
          name="description"
          content="Descubre las mejores ofertas en smartphones, laptops, audio y accesorios en MercadIAshop. Tecnología de punta con envío rápido y seguro a todo el país."
        />
      </Head>
      <Hero />
      <HeroCarousel />
      <BannerPromo />
      <Categories />
      <SearchFilters />
      <ProductsGrid products={products} />
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
