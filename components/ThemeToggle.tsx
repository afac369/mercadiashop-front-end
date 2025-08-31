//components/ThemeToggle.tsx
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

type Mode = "light" | "dark";

export default function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Resuelve el tema actual (considerando "system"), por defecto 'light'
  const resolved: Mode = (theme === "system" ? systemTheme : theme) === "dark" ? "dark" : "light";
  const isDark = resolved === "dark";
  const currentLabel = isDark ? "Oscuro" : "Claro";
  const nextLabel = isDark ? "claro" : "oscuro";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  if (!mounted) {
    return (
      <button aria-label="Cambiar tema" className="chip hover:opacity-100" disabled>
        <Sun className="h-4 w-4" />
        <span className="hidden sm:inline">Claro</span>
      </button>
    );
    }

  return (
    <button onClick={toggle} aria-label={`Cambiar a modo ${nextLabel}`} className="chip hover:opacity-100">
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="hidden sm:inline">{currentLabel}</span>
    </button>
  );
}
