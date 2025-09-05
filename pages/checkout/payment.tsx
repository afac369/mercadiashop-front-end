import Head from "next/head";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../lib/orders";
import { formatCLP } from "../../utils/currency";
import { useState, useMemo, useEffect } from "react";

export default function PaymentPage() {
  const { items, totalPrice, clear } = useCart();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sessionId = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return window.localStorage.getItem("sid") || undefined;
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const e = window.localStorage.getItem("email_hint");
        if (e) setEmail(e);
      }
    } catch {}
  }, []);

  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  async function handlePayment() {
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

      try {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("last_order_total_cents", String(r.total_cents));
          if (email) window.localStorage.setItem("email_hint", email);
        }
      } catch {}

      clear();
      router.push(`/checkout/success?order_id=${encodeURIComponent(r.order_id)}`);
    } catch (e: any) {
      alert(e?.message || "Error al crear la orden");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Métodos de Pago | MercadIAshop</title>
        <meta name="description" content="Selecciona tu método de pago en MercadIAshop." />
      </Head>

      <main className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Elige tu método de pago</h1>

        <section className="rounded-2xl border border-black/10 p-4 mb-6">
          <h2 className="font-medium mb-3">Resumen del pedido</h2>
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
          <h2 className="font-medium mb-3">Métodos de pago</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                id="creditCard"
                className="mr-2"
                checked={paymentMethod === "creditCard"}
                onChange={() => setPaymentMethod("creditCard")}
              />
              <label htmlFor="creditCard">Tarjeta de crédito</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                id="paypal"
                className="mr-2"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              <label htmlFor="paypal">PayPal</label>
            </div>
          </div>
        </section>

        {paymentMethod === "creditCard" && (
          <section className="rounded-2xl border border-black/10 p-4 mb-6">
            <h2 className="font-medium mb-3">Datos de la tarjeta</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm mb-1">Número de la tarjeta</label>
                <input type="text" placeholder="**** **** **** ****" className="w-full rounded-xl border px-3 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Fecha de expiración</label>
                  <input type="text" placeholder="MM/YY" className="w-full rounded-xl border px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm mb-1">CVC</label>
                  <input type="text" placeholder="***" className="w-full rounded-xl border px-3 py-2" />
                </div>
              </div>
            </div>
          </section>
        )}

        {paymentMethod === "paypal" && (
          <section className="rounded-2xl border border-black/10 p-4 mb-6 text-center">
            <h2 className="font-medium mb-3">Pagar con PayPal</h2>
            <p className="text-sm opacity-70 mb-4">Serás redirigido a PayPal para completar tu pago.</p>
            <button className="btn-primary bg-[#0070BA] hover:bg-[#005ea6]">Ir a PayPal</button>
          </section>
        )}

        <div className="flex gap-2">
          <button onClick={() => router.back()} className="btn-ghost">Volver</button>
          <button
            onClick={handlePayment}
            disabled={loading || items.length === 0}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Pagar"}
          </button>
        </div>
      </main>
    </>
  );
}
