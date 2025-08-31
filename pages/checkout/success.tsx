import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { formatCLP } from "../../utils/currency";

export default function CheckoutSuccess() {
  const router = useRouter();
  const orderId = useMemo(() => String(router.query.order_id || ""), [router.query]);
  const [total, setTotal] = useState<number | null>(null);

  // Si guardaste total en sessionStorage al crear la orden, lo mostramos.
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = window.sessionStorage.getItem("last_order_total_cents");
        if (raw) setTotal(parseInt(raw, 10) / 100);
      }
    } catch {}
  }, []);

  return (
    <>
      <Head>
        <title>¡Gracias por tu compra! | MercadIAshop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="container mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-semibold">¡Gracias por tu compra!</h1>
        <p className="mt-2 text-slate-700">
          Tu orden <span className="font-mono font-semibold">{orderId || "—"}</span> ha sido creada.
        </p>
        {total !== null && (
          <p className="mt-1">Total pagado: <strong>{formatCLP(Math.round(total))}</strong></p>
        )}
        <div className="mt-6 flex gap-3">
          <Link href="/productos" className="btn-primary">Seguir comprando</Link>
          <Link href="/" className="btn-ghost">Ir al inicio</Link>
        </div>
      </main>
    </>
  );
}
