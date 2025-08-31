// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es" suppressHydrationWarning>
      <Head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        {/* Social */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MercadIAshop" />
        {/* Tema: indica soporte light/dark y ajusta theme-color según esquema */}
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0b1220" />
      </Head>
      {/* NO forzamos tema claro; añadimos variantes dark para que el toggle funcione */}
      <body className="bg-white text-slate-900 dark:bg-neutral-950 dark:text-neutral-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
