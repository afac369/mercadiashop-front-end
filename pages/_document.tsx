// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          {/* Favicons */}
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="alternate icon" href="/favicon.ico" />
          {/* Social */}
          <meta name="theme-color" content="#0ea5e9" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="MercadIAshop" />
          {/* Performance: preconnect (opcional si usas fuentes externas) */}
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> */}
        </Head>
        <body className="bg-white text-slate-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
