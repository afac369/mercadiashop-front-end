//components/ThemeProvider.tsx
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"          // usa la clase 'dark' en <html>
      defaultTheme="light"       // arranca en CLARO
      enableSystem={false}       // deshabilita 'system' para evitar confusión
      storageKey="theme"         // clave persistida en localStorage
      themes={['light', 'dark']} // solo dos opciones
      disableTransitionOnChange
      forcedTheme="light"
    >
      {children}
    </NextThemesProvider>
  );
}
