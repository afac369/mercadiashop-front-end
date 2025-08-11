
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl glass bg-grid px-6 py-16 md:px-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold heading-gradient">
          Tu nueva tienda favorita: MercadIAshop
        </h1>
        <p className="mt-4 text-white/80">
          Tecnología, accesorios y más. Envíos a todo Chile y soporte 24/7.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="#productos" className="btn-primary">Ver productos</Link>
          <a href="#categorias" className="btn-ghost">Explorar categorías</a>
        </div>
        <div className="mt-8 flex items-center justify-center gap-6 text-xs small-muted">
          <span className="chip">Envíos rápidos</span>
          <span className="chip">Pagos seguros</span>
          <span className="chip">Garantía 30 días</span>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
    </section>
  );
}
