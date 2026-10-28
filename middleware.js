// import { NextResponse } from 'next/server';
// import { verifyAccessToken } from '@/lib/jwt';
// import { COOKIES, COOKIE_BASE, API_URL, API_PREFIX, PUBLIC_PATHS, LOGIN_PATH, AFTER_LOGIN_PATH, FORBIDDEN_PATH, ROLE_RULES } from '@/lib/constants';

// // Runs on every request except static assets. DEFAULT DENY: only PUBLIC_PATHS skip the session check.
// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)'],
// };

// /**
//  * Expired access token + valid refresh token: get a new pair from the API.
//  * NOTE: the API rotates refresh tokens. Parallel requests can race, so the API must keep a short
//  * REFRESH_REUSE_GRACE_SECONDS window in which the just-replaced token is still accepted.
//  */
// async function refreshSession(refreshToken) {
//   try {
//     const res = await fetch(`${API_URL}${API_PREFIX}/auth/refresh`, {
//       method: 'POST',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ refreshToken }),
//       cache: 'no-store',
//     });
//     if (!res.ok) return null;
//     const tokens = (await res.json())?.data?.tokens;
//     const claims = tokens ? await verifyAccessToken(tokens.accessToken) : null;
//     return claims ? { tokens, claims } : null;
//   } catch {
//     return null;
//   }
// }

// function cookieHeaderWith(req, tokens) {
//   const jar = new Map(req.cookies.getAll().map((c) => [c.name, c.value]));
//   jar.set(COOKIES.access, tokens.accessToken);
//   jar.set(COOKIES.refresh, tokens.refreshToken);
//   return [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
// }

// function writeCookies(res, tokens) {
//   res.cookies.set(COOKIES.access, tokens.accessToken, { ...COOKIE_BASE, maxAge: tokens.accessExpiresIn });
//   res.cookies.set(COOKIES.refresh, tokens.refreshToken, { ...COOKIE_BASE, maxAge: tokens.refreshExpiresIn });
//   return res;
// }

// function clear(res) {
//   res.cookies.set(COOKIES.access, '', { ...COOKIE_BASE, maxAge: 0 });
//   res.cookies.set(COOKIES.refresh, '', { ...COOKIE_BASE, maxAge: 0 });
//   return res;
// }

// export async function middleware(req) {
//   const { pathname, search } = req.nextUrl;
//   const isApi = pathname.startsWith('/api/');
//   const isPublic = PUBLIC_PATHS.some((re) => re.test(pathname));

//   let claims = await verifyAccessToken(req.cookies.get(COOKIES.access)?.value);
//   let fresh = null;

//   if (!claims) {
//     const rt = req.cookies.get(COOKIES.refresh)?.value;
//     if (rt) {
//       const r = await refreshSession(rt);
//       if (r) { claims = r.claims; fresh = r.tokens; }
//     }
//   }

//   if (isPublic) {
//     // Signed-in users do not need the login page.
//     const res = claims && pathname === LOGIN_PATH && claims.role
//       ? NextResponse.redirect(new URL(AFTER_LOGIN_PATH, req.url))
//       : NextResponse.next();
//     return fresh ? writeCookies(res, fresh) : res;
//   }

//   if (!claims) {
//     if (isApi) return NextResponse.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Sign in required' } }, { status: 401 });
//     const url = new URL(LOGIN_PATH, req.url);
//     url.searchParams.set('next', pathname + search);
//     return clear(NextResponse.redirect(url));
//   }

//   const rule = ROLE_RULES.find((r) => r.match.test(pathname));
//   if (rule && !rule.roles.includes(claims.role)) {
//     if (isApi) return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not allowed' } }, { status: 403 });
//     return NextResponse.redirect(new URL(FORBIDDEN_PATH, req.url));
//   }

//   // Forward verified identity to server components. Strip anything the client tried to send first.
//   const headers = new Headers(req.headers);
//   headers.delete('x-b3-user-id');
//   headers.delete('x-b3-role');
//   headers.set('x-b3-user-id', String(claims.sub));
//   headers.set('x-b3-role', String(claims.role));
//   if (fresh) headers.set('cookie', cookieHeaderWith(req, fresh)); // so this same request already sees the new tokens

//   const res = NextResponse.next({ request: { headers } });
//   return fresh ? writeCookies(res, fresh) : res;
// }




// FRO HEREEEE


// import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// const PUBLIC_PATHS = ['/login', '/forgot-password', '/reset-password', '/set-password', '/link-expired'];
// const ROLE_RULES = {
//   content_admin: ['/dashboard', '/replays', '/training', '/resources', '/clients', '/help'],
//   developer: ['/dashboard', '/provisioning', '/sync-log', '/help'],
//   owner: ['*'], // Full access to structure, team, settings, reports, audit-log
// };

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;

//   if (PUBLIC_PATHS.some((path) => pathname.startsWith(path)) || pathname.startsWith('/api/auth')) {
//     return NextResponse.next();
//   }

//   const token = req.cookies.get('b3_admin_token')?.value;
//   if (!token) {
//     const loginUrl = new URL('/login', req.url);
//     loginUrl.searchParams.set('returnTo', pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   try {
//     const publicKeyPem = process.env.JWT_ADMIN_PUBLIC_KEY;
//     const publicKey = await importJWK(JSON.parse(publicKeyPem), 'RS256');
//     const { payload } = await jwtVerify(token, publicKey, { audience: 'b3-admin' });

//     const role = payload.role;
//     const allowed = ROLE_RULES[role]?.includes('*') || 
//       ROLE_RULES[role]?.some((prefix) => pathname.startsWith(prefix));

//     if (!allowed) {
//       return NextResponse.redirect(new URL('/forbidden', req.url));
//     }

//     const res = NextResponse.next();
//     res.headers.set('x-admin-id', payload.sub);
//     res.headers.set('x-admin-role', payload.role);
//     return res;
//   } catch (err) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// };


import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};