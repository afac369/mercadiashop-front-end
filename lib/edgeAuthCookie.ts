// lib/edgeAuthCookie.ts
export const ADMIN_COOKIE = 'admin_session';
type Role = 'admin' | 'staff';
export type Payload = { uid: string; role: Role; exp: number };

function b64urlEncode(bytes: Uint8Array): string {
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function b64urlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = str.length % 4 === 0 ? 0 : 4 - (str.length % 4);
  str = str + '='.repeat(pad);
  const bin = atob(str);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export async function verifyEdge(token: string | undefined, secret: string): Promise<Payload | null> {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const ok = await crypto.subtle.verify(
    'HMAC',
    key,
    b64urlDecode(sig),
    new TextEncoder().encode(body)
  );
  if (!ok) return null;

  const json = new TextDecoder().decode(b64urlDecode(body));
  const payload = JSON.parse(json) as Payload;
  if (!payload?.uid || !payload?.role || !payload?.exp) return null;
  if (Math.floor(Date.now() / 1000) > payload.exp) return null;
  return payload;
}
