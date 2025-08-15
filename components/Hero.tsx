// components/Hero.tsx
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative rounded-3xl overflow-hidden min-h-[360px] md:min-h-[420px]">
      {/* Fondo */}
      <Image
        src="/bg-mercadiashop.jpg"
        alt="MercadIAshop"
        fill
        className="object-cover"
        priority
      />

      {/* Capa suave para legibilidad del texto */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      {/* Contenido */}
      <div className="relative z-10 p-8 md:p-14">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Tecnología que inspira
        </h1>
        <p className="mt-2 text-sm md:text-base opacity-80">
          Ofertas exclusivas esta semana
        </p>

        <Link
          href="#productos"
          className="inline-block mt-6 px-5 py-2 rounded-xl font-semibold bg-black text-white hover:opacity-90 transition"
        >
          Ver productos
        </Link>
      </div>
    </section>
  );
}
