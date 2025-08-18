import type { NextPage } from "next";
import Head from "next/head";
import LayoutPro from "../components/LayoutPro";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";

const HomePro = () => (
  <LayoutPro>
    <Head>
      <title>MercadIAshop — Compra en el futuro, compra hoy ...</title>
      <meta
        name="description"
        content="Tu nueva tienda favorita: envíos rápidos, pagos seguros y soporte 24/7."
      />
    </Head>

    <section id="hero">
      <Hero />
    </section>

    <section id="ofertas" className="mx-auto mt-8 max-w-7xl px-4">
      {/* aquí tu bloque de “Ofertas / banner” si quieres */}
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

export default HomePro() 