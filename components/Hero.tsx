// components/Hero.tsx
'use client';
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl min-h-[380px] md:min-h-[480px]">
      {/* capa imagen */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-mercadiashop.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* oscurecer un poco para que el texto destaque */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* contenido */}
      <div className="relative z-10 px-6 py-10 md:px-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Tecnología que inspira
        </h1>
        <p className="mt-3 text-white/80">Ofertas exclusivas esta semana</p>
        <a
          href="#productos"
          className="mt-6 inline-block rounded-xl px-5 py-2 font-semibold bg-white text-black"
        >
          Ver productos
        </a>
      </div>
    </section>
  );
}
