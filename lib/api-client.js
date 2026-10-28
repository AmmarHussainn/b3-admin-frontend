// BROWSER. Talks only to this app's own /api routes (BFF), which attach the httpOnly token server-side.
export class ClientApiError extends Error {
  constructor(status, error) {
    super(error?.message || 'Request failed');
    this.status = status;
    this.code = error?.code;
    this.details = error?.details;
  }
}

export async function api(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    credentials: 'same-origin',
    headers: { ...(body ? { 'content-type': 'application/json' } : {}), ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => null);
  if (res.ok) return json?.data ?? null;
  if (res.status === 401 && typeof window !== 'undefined') window.location.assign('/login');
  throw new ClientApiError(res.status, json?.error);
}
