// components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative overflow-hidden hero-bg">
      {/* capa de imagen de fondo */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-mercadiashop.jpg')" }}
        aria-hidden="true"
      />
      {/* opcional: velo/gradiente para mejorar contraste */}
      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-white/70 via-white/40 to-white/10 pointer-events-none" />

      {/* contenido */}
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Tecnología que inspira
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Ofertas exclusivas esta semana
        </p>
        <a href="#productos" className="mt-6 inline-block chip">
          Ver productos
        </a>
      </div>
    </section>
  );
}

