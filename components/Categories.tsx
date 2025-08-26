import { useState } from 'react';
import { Cpu, Headphones, Home, Gamepad2, Sprout, Dumbbell, ChevronRight } from "lucide-react";

type Category = {
  id: string;
  name: string;
  icon: React.ElementType;
  subcategories?: Category[];
};

const defaultCategories: Category[] = [
    {
        id: "tech",
        name: "Tecnología",
        icon: Cpu,
        subcategories: [
            { id: "laptops", name: "Laptops", icon: Cpu },
            { id: "smartphones", name: "Smartphones", icon: Cpu },
            { id: "tablets", name: "Tablets", icon: Cpu },
        ],
    },
    {
        id: "audio",
        name: "Audio",
        icon: Headphones,
        subcategories: [
            { id: "auriculares", name: "Auriculares", icon: Headphones },
            { id: "parlantes", name: "Parlantes", icon: Headphones },
        ],
    },
    { id: "hogar", name: "Hogar", icon: Home },
    { id: "gaming", name: "Gaming", icon: Gamepad2 },
    { id: "deco", name: "Deco", icon: Sprout },
    { id: "fitness", name: "Fitness", icon: Dumbbell },
];

const CategoryItem = ({ category, onSelect }: { category: Category, onSelect: (id: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    if (hasSubcategories) {
      e.preventDefault();
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    } else {
      onSelect(category.id);
    }
  };

  const handleSelect = () => {
    if (!hasSubcategories) {
      onSelect(category.id);
    }
  };

  return (
    <div className="py-1">
      <a
        href={hasSubcategories ? '#' : `/#productos?category=${category.id}`}
        onClick={handleToggle}
        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700 cursor-pointer"
      >
        <div className="flex items-center">
          <category.icon className="h-5 w-5 mr-3" />
          <span>{category.name}</span>
        </div>
        {hasSubcategories && (
          <ChevronRight
            className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          />
        )}
      </a>
      {hasSubcategories && isExpanded && (
        <div className="pl-8 mt-1 border-l border-gray-600">
          {category.subcategories?.map(subCategory => (
            <CategoryItem key={subCategory.id} category={subCategory} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Categories({ categories = defaultCategories }: { categories?: Category[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    // You can add logic here to filter products based on the selected category
    console.log("Selected category:", id);
  };

  return (
    <section id="categorias" className="pt-10">
      <h2 className="text-2xl font-bold mb-4">Categorías</h2>
      <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
        {categories.map((c) => (
          <CategoryItem key={c.id} category={c} onSelect={handleSelectCategory} />
        ))}
      </div>
    </section>
  );
}
