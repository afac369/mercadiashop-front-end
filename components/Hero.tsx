// components/Hero.tsx (ejemplo)
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl min-h-[380px]">
      <Image
        src="/bg-mercadiashop.jpg"
        alt=""
        fill                // ocupa todo el contenedor
        priority
        className="object-cover"
      />
      {/* Overlay opcional */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/60 to-transparent" />
      
      {/* Contenido encima del fondo */}
      <div className="relative z-10 p-10">
        <h1 className="text-4xl font-black">Audio premium</h1>
        <p className="opacity-80 mt-2">Hasta -25% en headphones</p>
      </div>
    </section>
  );
}
