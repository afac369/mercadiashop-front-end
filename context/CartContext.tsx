
import { createContext, useContext, useMemo, useState, ReactNode } from "react";
export type CartItem = { id: string; name: string; price: number; image?: string; qty: number; };
type CartContextType = { items: CartItem[]; add: (item: Omit<CartItem, "qty">, qty?: number) => void; remove: (id: string) => void; clear: () => void; totalQty: number; totalPrice: number; };
const CartContext = createContext<CartContextType | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const add: CartContextType["add"] = (item, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx >= 0) { const copy = [...prev]; copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty }; return copy; }
      return [...prev, { ...item, qty }];
    });
  };
  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);
  const { totalQty, totalPrice } = useMemo(() => {
    const totalQty = items.reduce((a, b) => a + b.qty, 0);
    const totalPrice = items.reduce((a, b) => a + b.price * b.qty, 0);
    return { totalQty, totalPrice };
  }, [items]);
  const value: CartContextType = { items, add, remove, clear, totalQty, totalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const ctx = useContext(CartContext); if (!ctx) throw new Error("useCart must be used within CartProvider"); return ctx; }
