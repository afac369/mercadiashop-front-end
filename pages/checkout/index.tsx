import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../lib/orders";
import { formatCLP } from "../../utils/currency";

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const sessionId = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return window.localStorage.getItem("sid") || undefined;
  }, []);

  useEffect(() => {
    // intenta precargar email si lo guardaste antes
    try {
      if (typeof window !== "undefined") {
        const e = window.localStorage.getItem("email_hint");
        if (e) setEmail(e);
      }
    } catch {}
  }, []);

  async function handleConfirmar() {
    try {
      setLoading(true);
      if (items.length === 0) throw new Error("Tu carrito está vacío.");

      const payload = {
        email: email || undefined,
        session_id: sessionId,
        currency: "CLP",
        items: items.map((i) => ({ product_id: i.id, quantity: i.qty })),
      };

      const r = await createOrder(payload);

      // Persistencia ligera para la página de éxito (no altera UI)
      try {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("last_order_total_cents", String(r.total_cents));
          if (email) window.localStorage.setItem("email_hint", email);
        }
      } catch {}

      // Limpia carrito y redirige a página de éxito con el order_id
      clear();
      window.location.href = `/checkout/success?order_id=${encodeURIComponent(r.order_id)}`;
    } catch (e: any) {
      alert(e?.message || "Error al crear la orden");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Checkout | MercadIAshop</title>
        <meta name="description" content="Confirma tu compra en MercadIAshop." />
      </Head>

      <main className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

        <section className="rounded-2xl border border-black/10 p-4 mb-6">
          <h2 className="font-medium mb-3">Tu pedido</h2>
          {items.length === 0 ? (
            <p className="text-sm opacity-70">Tu carrito está vacío.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{it.name}</div>
                    <div className="text-sm opacity-70">
                      {it.qty} × {formatCLP(it.price)}
                    </div>
                  </div>
                  <div className="font-semibold">{formatCLP(it.qty * it.price)}</div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <span className="opacity-70">Total</span>
            <span className="text-lg font-extrabold">{formatCLP(Math.round(totalPrice))}</span>
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 p-4 mb-6">
          <h2 className="font-medium mb-3">Contacto</h2>
          <label className="block text-sm mb-1">Email (opcional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full rounded-xl border px-3 py-2"
          />
        </section>

        <div className="flex gap-2">
          <a href="/productos" className="btn-ghost">Seguir comprando</a>
          <button
            onClick={handleConfirmar}
            disabled={loading || items.length === 0}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? "Procesando…" : "Confirmar pedido"}
          </button>
        </div>
      </main>
    </>
  );
}
