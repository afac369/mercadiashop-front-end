//components/ThemeToggle.tsx
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Aplica el tema guardado (por defecto: CLARO) y sincroniza con <html class="dark">
  useEffect(() => {
    setMounted(true);
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
      const dark = saved === "dark";
      setIsDark(dark);
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", dark);
      }
    } catch {}
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", next ? "dark" : "light");
      }
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next);
      }
    } catch {}
  }

  // Fallback mientras hidrata
  if (!mounted) {
    return (
      <button aria-label="Cambiar tema" className="chip hover:opacity-100" disabled>
        <Sun className="h-4 w-4" />
        <span className="hidden sm:inline">Claro</span>
      </button>
    );
  }

  return (
    <button onClick={toggle} aria-label={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`} className="chip hover:opacity-100">
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="hidden sm:inline">{isDark ? "Oscuro" : "Claro"}</span>
    </button>
  );
}
