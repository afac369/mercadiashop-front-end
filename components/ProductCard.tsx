import Image from 'next/image';
import { useCart } from '../context/CartContext';

type AddPayload = { id: string; name: string; price: number; image?: string };

type Props = {
  id: string;
  name: string;
  price: number;
  image?: string;   // preferido
  image2?: string;  // compatibilidad con código viejo
  description?: string;
  onAdd?: (p: AddPayload) => void;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  image2,
  description,
  onAdd,
}: Props) {
  const img = image ?? image2;
  const { add } = useCart();

  return (
    <article className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition">
      <a href={`/producto/${id}`} className="block relative aspect-square">
        <Image
          src={img || '/placeholder.svg'}
          alt={name}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 100vw"
          className="object-cover"
          priority={false}
        />
      </a>
      <div className="p-3">
        <a href={`/producto/${id}`} className="block font-medium line-clamp-2">
          {name}
        </a>

        {description && (
          <p className="mt-1 text-sm text-slate-600 line-clamp-2">{description}</p>
        )}

        <p className="mt-1 text-slate-700">${price.toLocaleString()}</p>

        <button
          className="mt-3 w-full rounded-xl bg-black text-white py-2 text-sm"
          onClick={() =>
            onAdd
              ? onAdd({ id, name, price, image: img })
              : add({ id, name, price, image: img }, 1)
          }
          aria-label={`Agregar ${name} al carrito`}
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
