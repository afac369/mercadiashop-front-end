// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10">
      <Image
        src="/bg-mercadiashop.jpg"
        alt="Fondo MercadIAshop"
        fill
        priority
        className="object-cover opacity-30"
      />
      <div className="relative z-10 p-10 md:p-16">
        <h1 className="text-5xl font-black tracking-tight">Tecnología que inspira</h1>
        <p className="mt-2 opacity-80">Ofertas exclusivas esta semana</p>
      </div>
    </div>
  );
}
