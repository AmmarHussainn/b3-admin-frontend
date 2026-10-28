import { NextResponse } from 'next/server';
import { API_URL, API_PREFIX } from '@/lib/constants';
import { getAccessToken } from '@/lib/session';

// Generic authenticated pass-through: browser -> /api/proxy/<anything> -> Node API /v1/admin/<anything>.
// The browser never sees a token. Only /v1/admin/* can be reached, and the API re-checks role on every call.

async function handler(req, { params }) {
  const { path } = await params;

  // CSRF defense for cookie auth: state-changing requests must come from this same origin.
  if (!['GET', 'HEAD'].includes(req.method)) {
    const origin = req.headers.get('origin');
    if (!origin || new URL(origin).host !== req.headers.get('host')) {
      return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Bad origin' } }, { status: 403 });
    }
  }

  const token = await getAccessToken();
  if (!token) return NextResponse.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Sign in required' } }, { status: 401 });

  const url = `${API_URL}${API_PREFIX}/${path.map(encodeURIComponent).join('/')}${req.nextUrl.search}`;
  const hasBody = !['GET', 'HEAD'].includes(req.method);

  const upstream = await fetch(url, {
    method: req.method,
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json',
      ...(req.headers.get('content-type') ? { 'content-type': req.headers.get('content-type') } : {}),
    },
    body: hasBody ? await req.arrayBuffer() : undefined,
    cache: 'no-store',
  });

  return new NextResponse(upstream.status === 204 ? null : upstream.body, {
    status: upstream.status,
    headers: { 'content-type': upstream.headers.get('content-type') ?? 'application/json' },
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
