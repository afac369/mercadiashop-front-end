//components/ThemeToggle.tsx
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

type Mode = "dark" | "light";

export default function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Resuelve el tema actual (light/dark) considerando "system"
  const resolved: Mode = (theme === "system" ? systemTheme : theme) === "dark" ? "dark" : "light";

  function toggle() {
    setTheme(resolved === "dark" ? "light" : "dark");
  }

  // Evita desajustes de hidratación
  if (!mounted) {
    return (
      <button aria-label="Cambiar tema" className="chip hover:opacity-100" disabled>
        <Sun className="h-4 w-4" />
        <span className="hidden sm:inline">Claro</span>
      </button>
    );
  }

  return (
    <button onClick={toggle} aria-label="Cambiar tema" className="chip hover:opacity-100">
      {resolved === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{resolved === "dark" ? "Claro" : "Oscuro"}</span>
    </button>
  );
}
