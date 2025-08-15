import { useEffect, useState } from "react";

export default function FreeShippingBar() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const v = localStorage.getItem("freebar:hidden");
    if (v === "1") setVisible(false);
  }, []);
  if (!visible) return null;
  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-b-2xl bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-violet-400/30 text-sm px-4 py-2 flex items-center justify-between">
          <span>🚚 Envío gratis sobre $50.000 · 3 cuotas sin interés</span>
          <button
            onClick={() => { localStorage.setItem("freebar:hidden","1"); setVisible(false); }}
            className="chip"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
