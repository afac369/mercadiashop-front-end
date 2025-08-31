const BASE = process.env.NEXT_PUBLIC_BACKEND_URL!;

export type OrderItemInput = { product_id: string; quantity: number };

export async function createOrder(input: {
  email?: string;
  session_id?: string;
  currency?: string; // por defecto 'CLP' en el backend
  items: OrderItemInput[];
}) {
  if (!BASE) throw new Error("Falta NEXT_PUBLIC_BACKEND_URL");
  const res = await fetch(`${BASE}/api/orders/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`createOrder failed: ${res.status} ${txt}`);
  }
  return res.json() as Promise<{ ok: boolean; order_id: string; total_cents: number }>;
}
