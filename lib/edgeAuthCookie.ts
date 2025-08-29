// lib/edgeAuthCookie.ts
export const ADMIN_COOKIE = 'admin_session';
type Role = 'admin' | 'staff';
export type Payload = { uid: string; role: Role; exp: number };

/** base64url -> ArrayBuffer (siempre ArrayBuffer "puro") */
function base64urlToArrayBuffer(str: string): ArrayBuffer {
  const normalized = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  const b64 = normalized + pad;

  const binary = atob(b64);
  const ab = new ArrayBuffer(binary.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < binary.length; i++) view[i] = binary.charCodeAt(i);
  return ab;
}

/** Uint8Array -> ArrayBuffer (copia, NO usa .buffer) */
function u8ToArrayBuffer(u8: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(u8.byteLength);
  new Uint8Array(ab).set(u8);
  return ab;
}

export async function verifyEdge(token: string | undefined, secret: string): Promise<Payload | null> {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;

  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  // Firmas/datos como ArrayBuffer "puro"
  const signature = base64urlToArrayBuffer(sig);
  const dataBuf = u8ToArrayBuffer(encoder.encode(body));

  const ok = await crypto.subtle.verify('HMAC', key, signature, dataBuf);
  if (!ok) return null;

  // Decodifica payload
  const bodyBuf = base64urlToArrayBuffer(body);
  const json = new TextDecoder().decode(new Uint8Array(bodyBuf));
  const payload = JSON.parse(json) as Payload;

  if (!payload?.uid || !payload?.role || !payload?.exp) return null;
  if (Math.floor(Date.now() / 1000) > payload.exp) return null;

  return payload;
}
