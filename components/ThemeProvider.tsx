//components/ThemeProvider.tsx
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"       // inicia en tema claro por defecto
      enableSystem               // respeta preferencia del SO si luego eliges "system"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
