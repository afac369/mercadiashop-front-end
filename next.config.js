// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Tailwind + styled-jsx necesitan inline styles en Next
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fuentes
      "font-src 'self' data: https://fonts.gstatic.com",
      // Imágenes locales + remotas (Supabase, etc.)
      "img-src 'self' data: blob: https:",
      // Scripts de Next en prod no requieren 'unsafe-eval'
      "script-src 'self'",
      // Llamadas a Supabase y métricas de Vercel
      "connect-src 'self' https://*.supabase.co https://vitals.vercel-insights.com",
      // Endurecimientos extra
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

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};
