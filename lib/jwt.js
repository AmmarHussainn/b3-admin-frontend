import { importSPKI, jwtVerify } from 'jose';
import { JWT } from '@/lib/constants';

// Edge-safe. The app only holds the PUBLIC key: it can verify tokens but never mint them.
let keyPromise;
const getKey = () => (keyPromise ??= importSPKI(process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n'), 'RS256'));

/** Returns the claims, or null when the token is missing, expired, tampered with or for another audience. */
export async function verifyAccessToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, await getKey(), {
      issuer: JWT.issuer,
      audience: JWT.audience,
      algorithms: ['RS256'],
    });
    return payload;
  } catch {
    return null;
  }
}
