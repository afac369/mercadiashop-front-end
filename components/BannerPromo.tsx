import { useEffect, useState } from "react";
import Link from "next/link";

function useCountdown(target: number) {
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const clamp = Math.max(left, 0);
  const s = Math.floor(clamp / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return { d, h, m, r };
}

export default function BannerPromo() {
  const target = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 días
  const { d, h, m, r } = useCountdown(target);
  return (
    <section className="mt-8 rounded-3xl glass overflow-hidden">
      <div className="relative px-6 py-8 md:px-12 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/10 to-violet-400/20" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm small-muted">Ofertas de lanzamiento</div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Hasta <span className="heading-gradient">-30%</span> en accesorios tech
            </h3>
            <p className="small-muted mt-1">Termina en {d}d {h}h {m}m {r}s</p>
          </div>
          <Link href="#productos" className="inline-block rounded-lg bg-black px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-black self-start">Comprar ahora</Link>
        </div>
      </div>
    </section>
  );
}
