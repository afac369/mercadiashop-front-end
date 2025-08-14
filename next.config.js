// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      // imágenes locales, data/blobs y remotas (incl. Supabase)
      "img-src 'self' data: blob: https:",
      // permite el script del Messenger de Dialogflow
      "script-src 'self' https://www.gstatic.com",
      // permite el iframe del Messenger
      "frame-src 'self' https://www.gstatic.com",
      // fetch/XHR necesarios (Supabase + Dialogflow/Google)
      "connect-src 'self' https://*.supabase.co https://vitals.vercel-insights.com https://*.googleapis.com https://dialogflow.clients6.google.com",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'"
    ].join('; ')
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

module.exports = nextConfig;
