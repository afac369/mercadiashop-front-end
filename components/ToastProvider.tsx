import { createContext, useContext, useState, useCallback, useEffect } from "react";

type ToastItem = { id: string; message: string };
type Ctx = { toast: (message: string) => void };
const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string) => {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => [...prev, { id, message }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 2500);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] space-y-2">
        {items.map((t) => (
          <div key={t.id} className="glass rounded-xl px-4 py-2 text-sm shadow-lg">
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
