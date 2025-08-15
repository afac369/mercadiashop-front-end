import { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { formatCLP } from "../utils/currency";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (typeof document === "undefined") return null;
  const cart: any = useCart() as any; // tolerante a tipos distintos del contexto
  const items: Array<any> = cart?.items ?? [];
  const total: number = cart?.totalPrice ?? 0;

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  return createPortal(
    <Fragment>
      {open && (
        <>
          <div onClick={onClose} className="fixed inset-0 z-[98] bg-black/40 backdrop-blur-sm" />
          <aside className="fixed right-0 top-0 z-[99] h-full w-[92vw] max-w-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 shadow-2xl transition-transform duration-300"
                 style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}>
            <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
              <h3 className="font-bold text-lg">Tu carrito</h3>
              <button onClick={onClose} className="chip">Cerrar</button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-180px)]">
              {items.length === 0 && <p className="text-sm opacity-70">Tu carrito está vacío.</p>}
              {items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 p-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{it?.name ?? "Producto"}</div>
                    <div className="text-sm opacity-70">
                      {it?.qty ? `${it.qty} × ` : ""}{formatCLP(it?.price ?? 0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="opacity-70">Total</span>
                <span className="text-lg font-extrabold">{formatCLP(total)}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => cart?.clear?.()} className="btn-ghost flex-1">Vaciar</button>
                <a href="/checkout" className="btn-primary flex-1 text-center">Ir a pagar</a>
              </div>
            </div>
          </aside>
        </>
      )}
    </Fragment>,
    document.body
  );
}
