import { NextResponse } from 'next/server';
import { API_URL, API_PREFIX } from '@/lib/constants';
import { setSessionCookies } from '@/lib/session';

/**
 * Forwards a public auth POST (login, set-password, forgot, reset) to the Node API.
 * When session:true the returned tokens are stored as httpOnly cookies and NOT sent to the browser.
 */
export async function forwardAuth(req, apiPath, { session = false } = {}) {
  const body = await req.json().catch(() => ({}));
  const upstream = await fetch(`${API_URL}${API_PREFIX}${apiPath}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': req.headers.get('x-forwarded-for') ?? '',
      'user-agent': req.headers.get('user-agent') ?? '',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const json = await upstream.json().catch(() => ({ success: false, error: { code: 'BAD_UPSTREAM', message: 'Unexpected response' } }));
  if (!upstream.ok) return NextResponse.json(json, { status: upstream.status });

  const res = NextResponse.json({ success: true, data: { user: json.data?.user ?? null } });
  if (session && json.data?.tokens) setSessionCookies(res, json.data.tokens);
  return res;
}
