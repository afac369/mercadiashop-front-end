// components/MegaMenu.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(v => !v)} className="chip" aria-expanded={open} aria-haspopup="menu">
        Categorías
      </button>
      {open && (
        <div role="menu" className="absolute left-0 mt-2 w-[640px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 shadow-xl">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold mb-2">Computación</div>
              <ul className="space-y-1">
                <li><Link href="/categoria/notebooks">Notebooks</Link></li>
                <li><Link href="/categoria/accesorios">Accesorios</Link></li>
                <li><Link href="/categoria/almacenamiento">Almacenamiento</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2">Gaming</div>
              <ul className="space-y-1">
                <li><Link href="/categoria/teclados">Teclados</Link></li>
                <li><Link href="/categoria/mouse">Mouse</Link></li>
                <li><Link href="/categoria/audio">Audio</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
