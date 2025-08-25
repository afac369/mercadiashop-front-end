// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
       <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
       <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
