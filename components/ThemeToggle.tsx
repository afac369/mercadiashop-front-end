import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Mode = "dark" | "light";

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("theme") as Mode | null)) || "dark";
    setMode(saved);
    if (typeof document !== "undefined") document.documentElement.dataset.theme = saved;
  }, []);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    if (typeof window !== "undefined") localStorage.setItem("theme", next);
    if (typeof document !== "undefined") document.documentElement.dataset.theme = next;
  }

  return (
    <button onClick={toggle} aria-label="Cambiar tema" className="chip hover:opacity-100">
      {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{mode === "dark" ? "Claro" : "Oscuro"}</span>
    </button>
  );
}
