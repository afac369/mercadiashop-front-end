// components/Toast.tsx
import { useEffect } from 'react';

export default function Toast({
  open,
  text,
  onClose,
  timeout = 2500,
}: {
  open: boolean;
  text: string;
  onClose: () => void;
  timeout?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, timeout);
    return () => clearTimeout(t);
  }, [open, timeout, onClose]);

  if (!open) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-2xl px-4 py-2 shadow-lg bg-black/80 text-white text-sm"
    >
      {text}
    </div>
  );
}
