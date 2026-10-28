import { cookies } from 'next/headers';
import { COOKIES, COOKIE_BASE } from '@/lib/constants';

/** Tokens live ONLY in httpOnly cookies. Browser JavaScript can never read them. */
export function setSessionCookies(res, tokens) {
  res.cookies.set(COOKIES.access, tokens.accessToken, { ...COOKIE_BASE, maxAge: tokens.accessExpiresIn });
  res.cookies.set(COOKIES.refresh, tokens.refreshToken, { ...COOKIE_BASE, maxAge: tokens.refreshExpiresIn });
  return res;
}

export function clearSessionCookies(res) {
  res.cookies.set(COOKIES.access, '', { ...COOKIE_BASE, maxAge: 0 });
  res.cookies.set(COOKIES.refresh, '', { ...COOKIE_BASE, maxAge: 0 });
  return res;
}

export async function getAccessToken() {
  return (await cookies()).get(COOKIES.access)?.value ?? null;
}
export async function getRefreshToken() {
  return (await cookies()).get(COOKIES.refresh)?.value ?? null;
}
