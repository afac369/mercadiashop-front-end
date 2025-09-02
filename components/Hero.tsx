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

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-transparent z-10"></div>

      {/* Contenido por encima del overlay */}
      <div className="relative z-20 px-6 py-10 md:px-10 text-white">
        <h1 className="text-4xl font-extrabold tracking-tight">MercadIAshop</h1>
        <p className="mt-2 text-lg">Compra en el futuro, compra hoy.</p>
      </div>
    </section>
  );
}
