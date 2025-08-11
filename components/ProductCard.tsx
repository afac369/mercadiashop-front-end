
import { useCart } from "../context/CartContext";
import { formatCLP } from "../utils/currency";

type Props = { id: string; name: string; price: number; image?: string; description?: string; };

export default function ProductCard({ id, name, price, image, description }: Props) {
  const { add } = useCart();
  return (
    <article className="card card-hover overflow-hidden">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center small-muted">Imagen</div>
        )}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
      </div>
      <h3 className="mt-3 font-semibold">{name}</h3>
      {description && <p className="text-sm small-muted">{description}</p>}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-extrabold">{formatCLP(price)}</span>
        <button
          className="btn-primary"
          onClick={() => add({ id, name, price, image })}
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
