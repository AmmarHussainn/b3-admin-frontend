import { forwardAuth } from '@/lib/bff';

export const POST = (req) => forwardAuth(req, '/auth/set-password', { session: true });
