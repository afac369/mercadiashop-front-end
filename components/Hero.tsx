// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative rounded-2xl min-h-[360px] overflow-hidden">
      {/* Fondo */}
      <Image
        src="/bg-mercadiashop.jpg?v=3" // ?v=3 fuerza refresco de caché
        alt="MercadIAshop"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay translúcido encima de la imagen */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Contenido por encima del overlay */}
      <div className="relative z-20 px-6 py-10 md:px-10">
        <h1 className="text-5xl md:text-6xl font-extrabold">Tecnología que inspira</h1>
        <p className="mt-3 opacity-80">Ofertas exclusivas esta semana</p>
        <a
          href="#productos"
          className="mt-6 inline-block rounded-xl px-5 py-2 font-semibold bg-black text-white"
        >
          Ver productos
        </a>
      </div>
    </section>
  );
}
