// SERVER-ONLY (server components, route handlers). Calls the Node API with the session's bearer token.
import { redirect } from 'next/navigation';
import { API_URL, API_PREFIX, ACCESS_ENDED_PATH } from '@/lib/constants';
import { getAccessToken } from '@/lib/session';

export class ApiError extends Error {
  constructor(status, error) {
    super(error?.message || 'Request failed');
    this.status = status;
    this.code = error?.code;
    this.details = error?.details;
  }
}

/** apiFetch('/dashboard') -> returns `data`. Redirects on 401 / ACCESS_ENDED so pages stay clean. */
export async function apiFetch(path, { method = 'GET', body, headers = {}, auth = true, revalidate = 0 } = {}) {
  const token = auth ? await getAccessToken() : null;
  const res = await fetch(`${API_URL}${API_PREFIX}${path}`, {
    method,
    headers: {
      accept: 'application/json',
      ...(body ? { 'content-type': 'application/json' } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...(revalidate ? { next: { revalidate } } : { cache: 'no-store' }),
  });

  const json = await res.json().catch(() => null);
  if (res.ok) return json?.data ?? null;

  if (res.status === 401) redirect('/login');
  if (json?.error?.code === 'ACCESS_ENDED') redirect(ACCESS_ENDED_PATH);
  throw new ApiError(res.status, json?.error);
}
