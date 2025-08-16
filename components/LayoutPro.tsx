// pages/home-pro.tsx
import type { NextPage } from "next";
import Head from "next/head";
import LayoutPro from "../components/LayoutPro";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";

const HomePro: NextPage = () => {
  return (
    <LayoutPro>
      <Head>
        <title>MercadIAshop — Tecnología y más</title>
      </Head>

      {/* Hero con fondo */}
      <Hero />

      {/* Resto de la home */}
      <section id="ofertas" className="mx-auto mt-8 max-w-7xl px-4">
        {/* …tu bloque de “Ofertas / banner” que ya tenías… */}
      </section>

      <section id="categorias" className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-bold">Categorías</h2>
        <Categories />
      </section>

      <section id="productos" className="mx-auto max-w-7xl px-4 py-8">
        <ProductGrid />
      </section>
    </LayoutPro>
  );
};

export default HomePro;
