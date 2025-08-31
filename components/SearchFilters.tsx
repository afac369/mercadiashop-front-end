import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CATS = ["tech","audio","hogar","gaming","deco","fitness"];

export default function SearchFilters() {
  const router = useRouter();
  const q0   = typeof router.query.q === "string" ? router.query.q : "";
  const cat0 = typeof router.query.category === "string" ? router.query.category : "";
  const min0 = typeof router.query.min === "string" ? router.query.min : "";
  const max0 = typeof router.query.max === "string" ? router.query.max : "";

  const [q, setQ] = useState(q0);
  const [category, setCategory] = useState(cat0);
  const [min, setMin] = useState(min0);
  const [max, setMax] = useState(max0);

  useEffect(() => { setQ(q0); setCategory(cat0); setMin(min0); setMax(max0); }, [q0,cat0,min0,max0]);

  function apply() {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    router.push(`/?${params.toString()}`);
  }

  function clearAll() {
    setQ(""); setCategory(""); setMin(""); setMax("");
    router.push(`/`);
  }

  return (
    <section className="mt-6 glass rounded-2xl p-4">
      <div className="grid md:grid-cols-5 gap-3">
        <input
          placeholder="Buscar por nombre…"
          value={q} onChange={e => setQ(e.target.value)}
          className="rounded-xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 px-3 py-2"
        />
        <select
          value={category} onChange={e => setCategory(e.target.value)}
          className="rounded-xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 px-3 py-2"
        >
          <option value="">Todas las categorías</option>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="number" min="0" placeholder="Mín $" value={min} onChange={e=>setMin(e.target.value)}
               className="rounded-xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 px-3 py-2"/>
        <input type="number" min="0" placeholder="Máx $" value={max} onChange={e=>setMax(e.target.value)}
               className="rounded-xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 px-3 py-2"/>
        <div className="flex gap-2">
          <button onClick={apply} className="inline-block rounded-lg bg-black px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-black flex-1">Aplicar</button>
          <button onClick={clearAll} className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-white">Limpiar</button>
        </div>
      </div>
    </section>
  );
}
