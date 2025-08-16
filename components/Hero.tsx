// components/Hero.tsx
import Image from "next/image";
import Link from "next/link";

const BG = "/bg-mercadiashop.jpg";

export default function Hero() {
  return (
    <section className="relative isolate mx-auto mt-6 max-w-7xl overflow-hidden rounded-3xl">
      {/* Fondo como "background" */}
      <Image
        src={BG}
        alt="MercadIAshop - fondo"
        fill
        priority
        className="object-cover"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />

      {/* Capa de degradado para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/55 via-slate-900/35 to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 px-6 py-16 md:px-10 md:py-24">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
          Tecnología que inspira
        </h1>
        <p className="mt-3 max-w-xl text-white/85">
          Ofertas exclusivas esta semana
        </p>
        <div className="mt-6">
          <Link
            href="/#productos"
            className="inline-flex items-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-white/90"
          >
            Ver productos
          </Link>
        </div>
      </div>
    </section>
  );
}
