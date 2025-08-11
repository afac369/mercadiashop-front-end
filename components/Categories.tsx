
import { Cpu, Headphones, Home, Gamepad2, Sprout, Dumbbell } from "lucide-react";

type Category = { id: string; name: string; icon: any; };

const defaultCategories: Category[] = [
  { id: "tech", name: "Tecnología", icon: Cpu },
  { id: "audio", name: "Audio", icon: Headphones },
  { id: "hogar", name: "Hogar", icon: Home },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "deco", name: "Deco", icon: Sprout },
  { id: "fitness", name: "Fitness", icon: Dumbbell },
];

export default function Categories({ categories = defaultCategories }: { categories?: Category[] }) {
  return (
    <section id="categorias" className="pt-10">
      <h2 className="text-2xl font-bold mb-4">Categorías</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <a key={c.id} href="/#productos" className="card card-hover group text-center p-5">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white/5 border border-white/10 group-hover:border-emerald-400/40">
                <Icon className="h-6 w-6 opacity-90" />
              </div>
              <div className="mt-3 text-sm">{c.name}</div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
