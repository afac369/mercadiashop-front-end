//components/ThemeToggle.tsx
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button aria-label="Cambiar tema" className="chip hover:opacity-100" disabled>
        <Sun className="h-4 w-4" />
        <span className="hidden sm:inline">Claro</span>
      </button>
    );
  }

  const isDark = theme === "dark";

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button onClick={toggle} aria-label={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`} className="chip hover:opacity-100">
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="hidden sm:inline">{isDark ? "Oscuro" : "Claro"}</span>
    </button>
  );
}
