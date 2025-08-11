import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Cpu, Headphones, Home, Gamepad2, Sprout, Dumbbell } from "lucide-react";

const CATEGORIES = [
  { id: "tech", name: "Tecnología", icon: Cpu },
  { id: "audio", name: "Audio", icon: Headphones },
  { id: "hogar", name: "Hogar", icon: Home },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "deco", name: "Deco", icon: Sprout },
  { id: "fitness", name: "Fitness", icon: Dumbbell },
];

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="hover:opacity-80"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
      >
        Categorías
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute left-1/2 z-50 mt-3 w-[680px] -translate-x-1/2 rounded-2xl glass p-6 shadow-2xl"
        >
          <div className="grid grid-cols-3 gap-4">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.id}
                  href={"/#productos"}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:border-emerald-400/40"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 border border-white/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs small-muted">Ver productos</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
