// components/Hero.tsx  (o BannerPromo.tsx)
export default function Hero() {
  return (
    <div
      className="relative min-h-[420px] rounded-3xl overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: "url('/bg-mercadiashop.jpg')" }}
    >
      {/* velo para mejorar contraste del texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 to-white/60" />

      <div className="relative z-10 p-10 md:p-14">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Tecnología que inspira
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Ofertas exclusivas esta semana
        </p>
        {/* ...tus botones/enlaces */}
      </div>
    </div>
  );
}
<div className="relative min-h-[420px] rounded-3xl overflow-hidden hero-bg">
  <div className="absolute inset-0 bg-gradient-to-r from-white/85 to-white/60" />
  <div className="relative z-10 p-10 md:p-14">...</div>
</div>
