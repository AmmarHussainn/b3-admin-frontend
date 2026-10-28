export const COOKIES = { access: 'b3_admin_at', refresh: 'b3_admin_rt' };

export const JWT = {
  issuer: process.env.JWT_ISSUER || 'b3-portal-api',
  audience: 'b3-admin', // a token minted for another audience is rejected
};

export const API_URL = process.env.API_URL; // server-side only, e.g. http://localhost:4000
export const API_PREFIX = '/v1/admin';

export const COOKIE_BASE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};

export const LOGIN_PATH = '/login';
export const ACCESS_ENDED_PATH = '/login';
export const AFTER_LOGIN_PATH = '/dashboard';
export const FORBIDDEN_PATH = '/forbidden';

// Role gate. FIRST matching rule wins. Anything not matched needs only a valid admin session.
// Keep in sync with requireRole() in the API: the API is the real enforcement, this is UX + defense in depth.
export const ROLE_RULES = [
  { match: /^\/(structure|team|settings)(\/|$)/, roles: ['owner'] },
  { match: /^\/(provisioning|sync-log)(\/|$)/, roles: ['owner', 'developer'] },
  { match: /^\/audit-log(\/|$)/, roles: ['owner', 'developer'] },
  { match: /^\/(replays|training|resources|reports)(\/|$)/, roles: ['owner', 'content_admin'] },
  { match: /^\/clients(\/|$)/, roles: ['owner', 'content_admin', 'developer'] },
];

// Everything NOT listed here requires a valid session. Default is deny.
export const PUBLIC_PATHS = [
  /^\/login$/,
  /^\/forgot-password$/,
  /^\/reset-password$/,
  /^\/set-password$/,
  /^\/link-expired$/,
  /^\/forbidden$/,
  /^\/api\/auth\/(login|logout|set-password|forgot-password|reset-password)$/,
];
