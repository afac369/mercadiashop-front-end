import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const slides = [
  {
    title: "Tecnología que inspira",
    subtitle: "Ofertas exclusivas esta semana",
    cta: "Ver productos",
    href: "#productos",
    bg: "from-cyan-500/20 via-emerald-400/10 to-violet-500/20",
  },
  {
    title: "Audio premium",
    subtitle: "Hasta -25% en headphones",
    cta: "Comprar ahora",
    href: "#productos",
    bg: "from-violet-500/20 via-cyan-400/10 to-emerald-400/20",
  },
  {
    title: "Setup gamer",
    subtitle: "Accesorios y periféricos",
    cta: "Armar setup",
    href: "#productos",
    bg: "from-emerald-500/20 via-cyan-400/10 to-violet-500/20",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const prev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 4500);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="rounded-3xl glass overflow-hidden">
      <div className="relative" ref={emblaRef}>
        <div className="flex">
          {slides.map((s, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%]">
              <div className={`relative px-6 py-16 md:px-16 md:py-24 bg-gradient-to-r ${s.bg}`}>
                <h1 className="text-4xl md:text-6xl font-extrabold heading-gradient">{s.title}</h1>
                <p className="mt-3 text-slate-700 dark:text-white/80">{s.subtitle}</p>
                <div className="mt-6">
                  <Link href={s.href} className="inline-block rounded-lg bg-black px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-black">{s.cta}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={prev} aria-label="Anterior" className="absolute left-3 top-1/2 -translate-y-1/2 chip">‹</button>
        <button onClick={next} aria-label="Siguiente" className="absolute right-3 top-1/2 -translate-y-1/2 chip">›</button>
      </div>
    </section>
  );
}
