// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    // relative: requerido por <Image fill />
    <section className="relative min-h-[420px] md:min-h-[520px] overflow-hidden">
      {/* Fondo real desde /public */}
      <Image
        src="/bg-mercadiashop.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />

      {/* Velo suave para que el texto se lea mejor (si quieres, bájale la opacidad) */}
      <div className="absolute inset-0 bg-white/20" />

      {/* Contenido */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Tecnología que inspira
        </h1>
        <p className="mt-3 text-sm opacity-80">Ofertas exclusivas esta semana</p>
        <a href="#productos" className="mt-6 inline-block chip">
          Ver productos
        </a>
      </div>
    </section>
  );
}
