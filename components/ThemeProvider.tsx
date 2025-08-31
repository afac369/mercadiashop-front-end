//components/ThemeProvider.tsx
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"           // añade la clase 'dark' al <html>
      defaultTheme="system"       // respeta el tema del SO
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
