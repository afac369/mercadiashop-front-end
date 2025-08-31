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
        {/* Tema: declara soporte y colores por esquema */}
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0b1220" />
        {/* Script crítico: aplica el tema guardado ANTES del primer pintado */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var t = localStorage.getItem('theme');
    var dark = t === 'dark';
    var root = document.documentElement;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
  } catch (e) {}
})();
            `.trim(),
          }}
        />
      </Head>
      <body className="bg-white text-slate-900 dark:bg-neutral-950 dark:text-neutral-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
