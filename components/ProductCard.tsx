import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useToast } from "./ToastProvider";
import { formatCLP } from "../utils/currency";

type Props = { id: string; name: string; price: number; image?: string; description?: string };

export default function ProductCard({ id, name, price, image, description }: Props) {
  const { add } = useCart();
  const { toast } = useToast();

  return (
    <Link href={`/producto/${id}`}>
      <article className="card card-hover overflow-hidden">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
          {image ? (
            <Image src={image} alt={name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
          ) : (
            <div className="h-full w-full grid place-items-center small-muted">Imagen</div>
          )}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-emerald-400/40" />
        </div>
        <h3 className="mt-3 font-semibold line-clamp-2">{name}</h3>
        {description && <p className="text-sm small-muted line-clamp-2">{description}</p>}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-extrabold">{formatCLP(price)}</span>
          <button
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); add({ id, name, price, image }); toast("Agregado al carrito"); }}
          >
            Agregar
          </button>
        </div>
      </article>
    </Link>
  );
}
