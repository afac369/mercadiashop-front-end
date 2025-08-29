// components/MiniCart.tsx
export type MiniCartItem = {
  id: string;
  name: string;
  price: number; // en moneda base
  image?: string;
  qty?: number;
};

export default function MiniCart({
  open,
  items,
  onClose,
}: {
  open: boolean;
  items: MiniCartItem[];
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition ${open ? 'visible bg-black/40' : 'invisible bg-transparent'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-xl p-4 transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mini carrito"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Tu carrito</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100" aria-label="Cerrar carrito">✕</button>
        </div>
        <div className="space-y-3 overflow-auto max-h-[70vh] pr-1">
          {items.length === 0 && <p className="text-sm text-slate-500">Aún no agregaste productos.</p>}
          {items.map((it) => (
            <div key={it.id} className="flex gap-3 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.image || '/placeholder.svg'} alt={it.name} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium">{it.name}</p>
                <p className="text-sm">${it.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
        <a
          href="/carrito"
          className="mt-4 block w-full text-center rounded-xl bg-black text-white py-2 font-medium"
        >
          Ir al checkout
        </a>
      </aside>
    </>
  );
}
