// pages/home-pro.tsx
import Hero from "../components/Hero";
import LayoutPro from "../components/LayoutPro";

export default function HomePro() {
  return (
    <LayoutPro>
      <Hero />

      {/* Sección de promos (opcional) */}
      <section className="mt-10 rounded-2xl p-6 bg-gradient-to-r from-emerald-100/60 to-sky-100/60">
        <div className="max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold">
            Hasta -30% en accesorios tech
          </h2>
          <p className="small-muted">Termina en 6d 23h 59m 59s</p>
        </div>
      </section>

      {/* Ancla para el botón del hero */}
      <section id="productos" className="mt-12">
        {/* Aquí puedes renderizar tu grid/listado de productos */}
        {/* Ejemplo: <ProductsGrid /> */}
      </section>
    </LayoutPro>
  );
}
