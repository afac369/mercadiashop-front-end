// components/Hero.tsx
'use client';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl min-h-[420px] md:min-h-[520px] bg-center bg-cover"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,15,25,.55), rgba(10,15,25,.55)), url('/bg-mercadiashop.jpg?v=2')"
      }}
    >
      <div className="relative z-10 px-6 py-10 md:px-12 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Tecnología que inspira
        </h1>
        <p className="mt-3 text-white/85">Ofertas exclusivas esta semana</p>
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
