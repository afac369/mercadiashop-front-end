// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[420px] rounded-3xl overflow-hidden">
      {/* Fondo con Next/Image */}
      <Image
        src="/bg-mercadiashop.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      {/* Overlay opcional para contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 to-white/60" />
      {/* Contenido encima */}
      <div className="relative z-10 p-8 md:p-14">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Tecnología que inspira
        </h1>
        <p className="mt-3 opacity-80 text-sm md:text-base">
          Ofertas exclusivas esta semana
        </p>
      </div>
    </section>
  );
}
