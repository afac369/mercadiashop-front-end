// lib/authCookie.ts
import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE = 'admin_session';
type Role = 'admin' | 'staff';
export type Payload = { uid: string; role: Role; exp: number };

function b64(s: Buffer | string) {
  return Buffer.from(s).toString('base64url');
}
function ub64(s: string) {
  return Buffer.from(s, 'base64url').toString('utf8');
}

export function sign(payload: Payload, secret: string) {
  const body = b64(JSON.stringify(payload));
  const sig = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verify(token: string | undefined, secret: string): Payload | null {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;

  const expected = createHmac('sha256', secret).update(body).digest('base64url');
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }

  const payload = JSON.parse(ub64(body)) as Payload;
  if (!payload?.uid || !payload?.role || !payload?.exp) return null;
  if (Math.floor(Date.now() / 1000) > payload.exp) return null;
  return payload;
}
