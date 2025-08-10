
type Category = { id: string; name: string; emoji: string; };
const defaultCategories: Category[] = [
  { id: "tech", name: "Tecnología", emoji: "💻" },
  { id: "audio", name: "Audio", emoji: "🎧" },
  { id: "hogar", name: "Hogar", emoji: "🏠" },
  { id: "gaming", name: "Gaming", emoji: "🎮" },
  { id: "deco", name: "Deco", emoji: "🪴" },
  { id: "fitness", name: "Fitness", emoji: "💪" },
];
export default function Categories({ categories = defaultCategories }: { categories?: Category[] }) {
  return (<section id="categorias" className="py-8">
    <h2 className="text-2xl font-bold mb-4">Categorías</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((c) => (
        <a key={c.id} href="/#productos" className="rounded-xl bg-white/5 border border-white/10 p-4 text-center hover:bg-white/10">
          <div className="text-3xl">{c.emoji}</div><div className="mt-2 text-sm">{c.name}</div>
        </a>
      ))}
    </div>
  </section>);
}
