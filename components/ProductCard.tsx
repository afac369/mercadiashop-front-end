
import { useCart } from "../context/CartContext"; import { formatCLP } from "../utils/currency";
type Props = { id: string; name: string; price: number; image?: string; description?: string; };
export default function ProductCard({ id, name, price, image, description }: Props) {
  const { add } = useCart();
  return (<article className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur">
    <div className="aspect-[4/3] rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
      {image ? <img src={image} alt={name} className="w-full h-full object-cover" /> : <span className="opacity-60">Imagen</span>}
    </div>
    <h3 className="mt-4 font-semibold">{name}</h3>
    {description && <p className="text-sm text-white/70">{description}</p>}
    <div className="mt-3 flex items-center justify-between">
      <span className="font-bold">{formatCLP(price)}</span>
      <button className="rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 text-sm" onClick={() => add({ id, name, price, image })}>Agregar</button>
    </div>
  </article>);
}
