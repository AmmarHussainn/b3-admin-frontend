import { NextResponse } from 'next/server';
import { API_URL, API_PREFIX } from '@/lib/constants';
import { clearSessionCookies, getRefreshToken } from '@/lib/session';

export async function POST() {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    // Best effort: revoke the refresh token server-side, then clear cookies regardless.
    await fetch(`${API_URL}${API_PREFIX}/auth/logout`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    }).catch(() => {});
  }
  return clearSessionCookies(NextResponse.json({ success: true, data: null }));
}
