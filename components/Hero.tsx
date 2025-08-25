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

      {/* Overlay translúcido eliminado para máxima claridad */}

      {/* Contenido por encima del overlay */}
      <div className="relative z-20 px-6 py-10 md:px-10">
        {/* Contenido de texto eliminado a petición del usuario */}
      </div>
    </section>
  );
}