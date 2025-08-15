// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[420px] rounded-2xl overflow-hidden">
      {/* Fondo */}
      <Image
        src="/bg-mercadiashop.jpg"   // archivo en /public
        alt=""
        fill
        priority
        className="object-cover"
      />

      {/* Overlay opcional */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 p-10">
        <h1 className="text-5xl font-extrabold">Audio premium</h1>
        <p className="mt-2 opacity-80">Hasta -25% en headphones</p>
      </div>
    </section>
  );
}
